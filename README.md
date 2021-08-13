# About the problem

A URL shortening system is a system or an app that generates a new url given an original url. When a user goes to a new URL, it will eventually redirect them to the original one. The new URL is substantially shorter than the original one and can be used for tracking user behaviour or redirecting to some other domain before reaching the final destination, which is the original URL.

# About the solution

There is an endpoint (`POST localhost:8000/api/tinyurls`) that accepts these body parameters:
```
url (the original url)
```
When the endpoint is called, a random string is generated and it represents `tinyUrlId`, then an entry in the database, in the TinyUrl schema is created, which looks like this:
```
tinyUrlId: Type.string({ required: true }),
actualUrl: Type.string({ required: true }),
domain: Type.string({ required: true })
```

When a user goes to the URL (that is built this way `{{domain of the server}} + / + {{tinyUrlId}}`), he is redirected to the original URL, retrieved from the database. A side effect is that an entry is created in the DomainVisits schema, that we can later use for our analytics.

In the backoffice, a list of the most viewed domains of the original URLs is displayed along with the number of occurrences for each of them, in a sorted fashion.

# Room for advanced features

For instance, a mechanism can be built for redirecting users to a page with paid ads and a referral system can be implemented.
Another idea would be to track information about the origin of the caller and aggregate it later on.

# Setup

The backend is written in node js express, the database in mongodb and webapp and the backoffice in react.
To run the apps:
- Start the mongo db (there is a docker-compose file that you can use to start it)
- run `npm install` in all 3 subdirectories of the repository
- You can now run the 3 services in no particular order

The backend uses port 8000 and the webapp and backoffice both default to port 3000.
