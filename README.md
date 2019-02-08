[![Build Status](https://img.shields.io/travis/retailcrm/mg-bot-api-client-js/master.svg?logo=travis&style=flat-square)](https://travis-ci.org/retailcrm/mg-bot-api-client-js)
[![GitHub release](https://img.shields.io/github/release/retailcrm/mg-bot-api-client-js.svg?style=flat-square)](https://github.com/retailcrm/mg-bot-api-client-js/releases)
[![Node version](https://img.shields.io/node/v/mg-api-client.svg?style=flat-square)](https://www.npmjs.com/package/mg-api-client)


# retailCRM Message Gateway Bot API JS client

This is js retailCRM bot API client.

# Installation
```
npm install --save mg-api-client
```
In your file
```
var RetailcrmBotApiClient = require('mg-api-client');
```
# Usage
#### Get users
```javascript
var api = new RetailcrmBotApiClient({
    host: 'https://api.example.com',
    token: 'your bot token',
    apiVersion: 'v1' // optional
}).getClient();

api.getUsers()
    .then(function (users) {
        console.log(users);
    })
    .catch(function (e) {
        console.log(e);
    });
```

#### Send message
```javascript
var api = new RetailcrmBotApiClient({
    host: 'https://api.example.com',
    token: 'your bot token',
    apiVersion: 'v1' // optional
}).getClient();

var message = {
    chat_id: 1,
    content: 'Text message',
    scope: 'public',
    type: 'text'
};

api.sendMessage(message)
    .then(function (result) {
        console.log(result);
    })
    .catch(function (e) {
        console.log(e);
    });
```
