var nock = require('nock');
var chai = require('chai');
var RetailcrmBotApiClient = require('../index');

describe('#API client v1', function() {
    beforeEach(function() {
        nock.cleanAll();
    });

    var retailcrm = new RetailcrmBotApiClient({
        host: 'https://api.example.com',
        token: 'test_token'
    }).getClient();

    it('Get bots list', function() {
        nock('https://api.example.com/api/bot/v1').get('/bots').reply(200, [{
            id: 1,
            isActive: true
        }]);

        retailcrm.getBots().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty bots list', function () {
        nock('https://api.example.com/api/bot/v1').get('/bots').reply(200, []);

        retailcrm.getBots().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Get channels list', function () {
        nock('https://api.example.com/api/bot/v1').get('/channels').reply(200, [{
            id: 1
        }]);

        retailcrm.getChannels().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty channels list', function () {
        nock('https://api.example.com/api/bot/v1').get('/channels').reply(200, []);

        retailcrm.getChannels().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Get chats list', function () {
        nock('https://api.example.com/api/bot/v1').get('/chats').reply(200, [{
            author_id: 1,
            id: 1
        }]);

        retailcrm.getChats().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty chats list', function () {
        nock('https://api.example.com/api/bot/v1').get('/chats').reply(200, []);

        retailcrm.getChats().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Get customers list', function () {
        nock('https://api.example.com/api/bot/v1').get('/customers').reply(200, [{
            external_id: 1,
            channel_id: 1,
            id: 1
        }]);

        retailcrm.getCustomers().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty customers list', function () {
        nock('https://api.example.com/api/bot/v1').get('/customers').reply(200, []);

        retailcrm.getCustomers().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Get dialogs list', function () {
        nock('https://api.example.com/api/bot/v1').get('/dialogs').reply(200, [{
            begin_message_id: 1,
            id: 1
        }]);

        retailcrm.getDialogs().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty dialogs list', function () {
        nock('https://api.example.com/api/bot/v1').get('/dialogs').reply(200, []);

        retailcrm.getDialogs().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Get members list', function () {
        nock('https://api.example.com/api/bot/v1').get('/members').reply(200, [{
            id: 1
        }]);

        retailcrm.getMembers().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty members list', function () {
        nock('https://api.example.com/api/bot/v1').get('/members').reply(200, []);

        retailcrm.getMembers().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Assign dialog', function () {
        nock('https://api.example.com/api/bot/v1').patch('/dialogs/1/assign').reply(200, {
            is_reassign: true,
            responsible: {
                id: 1
            }
        });

        retailcrm.assignDialog(1, {
            manager_id: 1
        }).then(function (value) {
            chai.expect(value).to.be.an('object');
        });
    });

    it('Assign dialog incorrect', function () {
        chai.expect(retailcrm.assignDialog.bind(retailcrm)).to.throw('Body is not be empty');
    });

    it('Close dialog', function () {
        nock('https://api.example.com/api/bot/v1').delete('/dialogs/1/close').reply(200, {});

        retailcrm.closeDialog(1).then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Close dialog incorrect', function () {
        chai.expect(retailcrm.closeDialog.bind(retailcrm)).to.throw('dialog_id is required');
    });

    it('Send message', function () {
        nock('https://api.example.com/api/bot/v1').post('/messages', {
            chat_id: 1,
            scope: 'public',
            type: 'text',
            content: 'tests message'
        }).reply(200, {
            message_id: 1
        });

        retailcrm.sendMessage({
            chat_id: 1,
            scope: 'public',
            type: 'text',
            content: 'tests message'
        }).then(function (value) {
            chai.expect(value).to.be.an('object');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Send message incorrect', function () {
        chai.expect(retailcrm.sendMessage.bind(retailcrm)).to.throw('Body is not be empty');
    });

    it('Get messages', function() {
        nock('https://api.example.com/api/bot/v1').get('/messages').reply(200, [{
            id: 1,
            chat_id: 1,
            from: {
                id: 1
            }
        }]);

        retailcrm.getMessages().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty messages', function () {
        nock('https://api.example.com/api/bot/v1').get('/messages').reply(200, []);

        retailcrm.getMessages().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Delete message', function () {
        nock('https://api.example.com/api/bot/v1').delete('/messages/1').reply(200, {});

        retailcrm.deleteMessage(1).then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Delete message incorrect', function () {
        chai.expect(retailcrm.deleteMessage.bind(retailcrm)).to.throw('message_id is required');
    });

    it('Edit message', function () {
        nock('https://api.example.com/api/bot/v1').patch('/messages/1', {
            content: 'tests message'
        }).reply(200, {});

        retailcrm.editMessage(1, {
            content: 'tests message'
        }).then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Edit message incorrect', function () {
        chai.expect(retailcrm.editMessage.bind(retailcrm)).to.throw('Body is not be empty');
    });

    it('Get commands', function () {
        nock('https://api.example.com/api/bot/v1').get('/my/commands').reply(200, [{
            id: 1,
            name: 'Command name'
        }]);

        retailcrm.getCommands().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty commands', function () {
        nock('https://api.example.com/api/bot/v1').get('/my/commands').reply(200, []);

        retailcrm.getCommands().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Edit command', function () {
        nock('https://api.example.com/api/bot/v1').put('/my/commands/command', {
            description: 'Desc',
            name: 'name'
        }).reply(200, {});

        retailcrm.editCommand('command', {
            description: 'Desc',
            name: 'name'
        }).then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Edit command incorrect', function () {
        chai.expect(retailcrm.editCommand.bind(retailcrm, 'command')).to.throw('Body is not be empty');
        chai.expect(retailcrm.editCommand.bind(retailcrm)).to.throw('Parameter command name is required');
    });

    it('Delete command', function () {
        nock('https://api.example.com/api/bot/v1').delete('/my/commands/command').reply(200, {});

        retailcrm.deleteCommand('command').then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Delete command incorrect', function () {
        chai.expect(retailcrm.deleteCommand.bind(retailcrm)).to.throw('command_name is required');
    });

    it('Update bot info', function () {
        nock('https://api.example.com/api/bot/v1').patch('/my/info', {
            avatar_url: 'http://tests.ru/avatar.png',
            name: 'Bot'
        }).reply(200, {});

        retailcrm.info({
            avatar_url: 'http://tests.ru/avatar.png',
            name: 'Bot'
        }).then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Update bot info incorrect', function () {
        chai.expect(retailcrm.info.bind(retailcrm)).to.throw('Body is not be empty');
    });

    it('Get users', function () {
        nock('https://api.example.com/api/bot/v1').get('/users').reply(200, [{
            id: 1,
            name: 'Username'
        }]);

        retailcrm.getUsers().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty users', function () {
        nock('https://api.example.com/api/bot/v1').get('/users').reply(200, []);

        retailcrm.getUsers().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Get websocket url', function () {
        var url = retailcrm.getWebsocketUrl(['message_new', 'message_updated']);
        var expected = 'wss://api.example.com/api/bot/v1/ws?events=message_new,message_updated';

        chai.assert.equal(url, expected);
    });

    it('Get websocket url incorrect', function () {
        chai.expect(retailcrm.getWebsocketUrl.bind(retailcrm)).to.throw('Events is required');
    });
});
