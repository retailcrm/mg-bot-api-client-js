[![Build Status](https://github.com/retailcrm/mg-bot-api-client-js/workflows/ci/badge.svg)](https://github.com/retailcrm/mg-bot-api-client-js/actions)
[![Coverage](https://img.shields.io/codecov/c/gh/retailcrm/mg-bot-api-client-js/master.svg?logo=codecov)](https://codecov.io/gh/retailcrm/mg-bot-api-client-js)
[![Latest stable](https://img.shields.io/npm/v/mg-api-client.svg)](https://npmjs.com/package/mg-api-client)
[![Node version](https://img.shields.io/node/v/mg-api-client.svg)](https://www.npmjs.com/package/mg-api-client)
[![JS Doc](https://img.shields.io/badge/doc-github_pages-green)](https://retailcrm.github.io/mg-bot-api-client-js/)

# Message Gateway Bot API JS client

This is js retailCRM bot API client.

# Installation
```
npm install --save mg-api-client
```
In your file

###### CommonJS
```
var MgBotApiClient = require('mg-api-client');
```
###### es6
```
import MgBotApiClient from 'mg-api-client';
```

# Usage
#### Get users
```javascript
const api = new MgBotApiClient({
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
const api = new MgBotApiClient({
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

const api = new MgBotApiClient({
    host: 'https://api.example.com',
    token: 'your bot token',
    apiVersion: 'v1' // optional
}).client;

const wsData = api.getWebsocketData([MgBotApiClient.types().wsMessageNew]);
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
