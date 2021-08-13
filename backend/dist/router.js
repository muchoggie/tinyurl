"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const url_1 = require("url");
const DomainVisits_1 = require("./db/DomainVisits");
const TinyUrl_1 = require("./db/TinyUrl");
const generateRandomString_1 = require("./utils/generateRandomString");
const getYesterday_1 = require("./utils/getYesterday");
const express = require('express');
const router = express();
router.get('/:tinyUrlId', async (request, response) => {
    const { tinyUrlId } = request.params;
    const tinyUrlRecord = await TinyUrl_1.TinyUrl.findOne({ tinyUrlId });
    if (!tinyUrlRecord) {
        response.status(404);
        response.send(null);
        return;
    }
    const { actualUrl, domain } = tinyUrlRecord;
    await DomainVisits_1.DomainVisits.create({
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
        const domain = (new url_1.URL(url)).hostname;
        const tinyUrlId = generateRandomString_1.generateRandomString(7);
        const newTinbyUrlRecord = new TinyUrl_1.TinyUrl({
            actualUrl: url,
            domain,
            tinyUrlId
        });
        await newTinbyUrlRecord.save();
        response.status(201);
        response.json({
            tinyUrlId
        });
    }
    catch (error) {
        console.error(error);
        response.status(500);
        response.send(null);
    }
});
const lagOptions = ['1d']; // lag could be 1d, 2d, etc..
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
            const yesterday = getYesterday_1.getYesterday();
            mostVisitedDomainsForTheGivenLag = await DomainVisits_1.DomainVisits.aggregate([
                { $match: { visitedAt: { $gte: yesterday } } },
                {
                    $group: {
                        _id: '$domain',
                        domain: { $first: "$domain" },
                        count: { $sum: 1 },
                    }
                },
            ]).sort({ count: -1 });
        }
        response.status(200);
        response.json(mostVisitedDomainsForTheGivenLag.map((_a) => {
            var { _id } = _a, rest = tslib_1.__rest(_a, ["_id"]);
            return rest;
        }));
    }
    catch (error) {
        console.error(error);
        response.status(500);
        response.send(null);
    }
});
exports.default = router;
//# sourceMappingURL=router.js.map