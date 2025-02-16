# SimpleCRM

## Prerequisites

Node v18+

## Local setup

in the root of the repository, run the following

```sh
npm install
```

Then run database migrations:
```sh
cd code/server
npm run typeorm migration:run -- -d src/data-source.ts
```

Then launch the frontend and backend in separate terminals.

Terminal 1:
```sh
cd code/server
npm run start
```

Terminal 2:
```sh
cd code/client
npm run start
```


### Changes

1. Addressed open issues on repo
    Fixed edit user bug by adding declarative, typesafe request body middleware and using to thread directly through to repositories. Further iteration can make server routes fully declarative, removing space for one-off logic errors.

    All UI additions were made with intent to improve aesthetics while still conforming to precedent - want to make it nicer but not add things that didn't look like they belong, and didn't want to overhaul entire UI outside of scope of issues.

2. Added shared codecs for server and client - this supports client side validation that is guaranteed compatible with server. Type assertions in entities files provides static enforcement that entity based codecs are compatible with database entities.

3. Added some property tests, ended up removing the tested logic. Outside of UI, the aim with this code was to put weight on declarative code, leaving less room for business logic. Further iteration would add some tests. errors.ts#handleServerError could be a good starting point for tests.
