# retailCRM Message Gateway Bot API JS client

This is js retailCRM bot API client.

# Installation
```
npm install --save mg-bot-api-client-js
```
In your file
```
var RetailcrmBotApiClient = require('mg-bot-api-client-js');
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
