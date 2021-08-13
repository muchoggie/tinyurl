import { URL } from "url";
import { DomainVisits } from "./db/DomainVisits";
import { TinyUrl } from "./db/TinyUrl";
import { generateRandomString } from "./utils/generateRandomString";
import { getYesterday } from "./utils/getYesterday";

const express = require('express');
const router = express();

router.get('/:tinyUrlId', async (request, response) => {
    const { tinyUrlId } = request.params;
    const tinyUrlRecord = await TinyUrl.findOne({ tinyUrlId });
    if (!tinyUrlRecord) {
        response.status(404);
        response.send(null);
        return;
    }

    const { actualUrl, domain } = tinyUrlRecord;

    await DomainVisits.create({
        domain,
        visitedAt: new Date()
    });

    response.writeHead(302, {
        'Location': actualUrl
    });
    response.end();
});

router.post('/api/tinyurls', async (request, response) => {
    try {
        const { url } = request.body;
        const domain = (new URL(url)).hostname;

        const tinyUrlId = generateRandomString(7);

        const newTinbyUrlRecord = new TinyUrl({
            actualUrl: url,
            domain,
            tinyUrlId
        });
        await newTinbyUrlRecord.save();

        response.status(201);
        response.json({
            tinyUrlId
        });
    } catch (error) {
        console.error(error);
        response.status(500);
        response.send(null);
    }
});


const lagOptions = ['1d'];         // lag could be 1d, 3d, 1w etc..
router.get('/api/domains/most_visited', async (request, response) => {
    try {
        const { lag } = request.query;

        if (typeof lag !== 'string' || !lagOptions.includes(lag)) {
            response.status(400);
            response.json('BAD PARAMETERS');
            return;
        }

        let mostVisitedDomainsForTheGivenLag = [];

        if (lag === '1d') {
            const yesterday = getYesterday();
            mostVisitedDomainsForTheGivenLag = await DomainVisits.aggregate([
                { $match: { visitedAt: { $gte: yesterday } } },
                {
                    $group: {
                        _id: '$domain',
                        domain: { $first: "$domain" },
                        count: { $sum: 1 },
                    }
                },
            ]).sort( { count: -1 } );
        }

        response.status(200);
        response.json(mostVisitedDomainsForTheGivenLag.map(({ _id, ...rest }) => rest));
    } catch (error) {
        console.error(error);
        response.status(500);
        response.send(null);
    }
});

export default router;