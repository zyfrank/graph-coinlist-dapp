## Introduction

This App provide a basic UI interface to Bountiesnetwork. It will display TOP10 (Currently according to bounties number they contributed) Contributors (Who pride bounty fund), TOP10 Issuers(who issue bounty in Bounties Network constract, of course most of them are contributors), TOP10 fulfillers (Bounty hunters). Also you can search basic information of a bounty by bounty number. And This app privide overview of last 50 bounties also.

### Connect this App to the hosting subgraph

1. Write the the GraphQL endpoint of Bountiesnetwork subgraph to `.env` file of this directory:
   ```sh
   echo "REACT_APP_GRAPHQL_ENDPOINT=https://api.thegraph.com/subgraphs/name/zyfrank/bountiesnetwork" > .env
   ```
2. Then, start this app:
   ```sh
   yarn install
   yarn start
   ```
3. Navigate to localhost:3000
