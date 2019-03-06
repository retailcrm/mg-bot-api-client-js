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

###### CommonJS
```
var RetailcrmBotApiClient = require('mg-api-client');
```
###### es6
```
import RetailcrmBotApiClient from 'mg-api-client';
```

# Usage
#### Get users
```javascript
const api = new RetailcrmBotApiClient({
    host: 'https://api.example.com',
    token: 'your bot token',
    apiVersion: 'v1' // optional
}).client;

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
const api = new RetailcrmBotApiClient({
    host: 'https://api.example.com',
    token: 'your bot token',
    apiVersion: 'v1' // optional
}).client;

let message = {
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
#### Websocket Example
```javascript
const WebSocket = require('ws');

const api = new RetailcrmBotApiClient({
    host: 'https://api.example.com',
    token: 'your bot token',
    apiVersion: 'v1' // optional
}).client;

const wsData = api.getWebsocketData([RetailcrmBotApiClient.types().wsMessageNew]);
const ws = new WebSocket(wsData.get('url'), {
    headers: wsData.get('headers')
});

ws.on('message', function (content) {
    let event = JSON.parse(content);
    let data = event.data;

    if (event.type === 'message_new' && data.message.from.type !== 'bot') {
        let message = {
            chat_id: data.message.chat_id,
            content: 'Bonjour!',
            scope: 'public',
            type: 'text'
        };

        api.sendMessage(message).then(function (res) {
            console.log(res);
        }).catch(function (e) {
            console.log(e);
        })
    }
});
```
