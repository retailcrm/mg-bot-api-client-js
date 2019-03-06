import nock from 'nock'
import chai from 'chai'
import MgBotApiClient from '../index'

describe('#API client v1', function() {
    beforeEach(function() {
        nock.cleanAll();
    });

    const api = new MgBotApiClient({
        host: 'https://api.example.com',
        token: 'test_token'
    }).client;

    it('Get bots list', function() {
        nock('https://api.example.com/api/bot/v1').get('/bots').reply(200, [{
            id: 1,
            isActive: true
        }]);

        api.getBots().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty bots list', function () {
        nock('https://api.example.com/api/bot/v1').get('/bots').reply(200, []);

        api.getBots().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Get channels list', function () {
        nock('https://api.example.com/api/bot/v1').get('/channels').reply(200, [{
            id: 1
        }]);

        api.getChannels().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty channels list', function () {
        nock('https://api.example.com/api/bot/v1').get('/channels').reply(200, []);

        api.getChannels().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Get chats list', function () {
        nock('https://api.example.com/api/bot/v1').get('/chats').reply(200, [{
            author_id: 1,
            id: 1
        }]);

        api.getChats().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty chats list', function () {
        nock('https://api.example.com/api/bot/v1').get('/chats').reply(200, []);

        api.getChats().then(function (value) {
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

        api.getCustomers().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty customers list', function () {
        nock('https://api.example.com/api/bot/v1').get('/customers').reply(200, []);

        api.getCustomers().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Get dialogs list', function () {
        nock('https://api.example.com/api/bot/v1').get('/dialogs').reply(200, [{
            begin_message_id: 1,
            id: 1
        }]);

        api.getDialogs().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty dialogs list', function () {
        nock('https://api.example.com/api/bot/v1').get('/dialogs').reply(200, []);

        api.getDialogs().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Get members list', function () {
        nock('https://api.example.com/api/bot/v1').get('/members').reply(200, [{
            id: 1
        }]);

        api.getMembers().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty members list', function () {
        nock('https://api.example.com/api/bot/v1').get('/members').reply(200, []);

        api.getMembers().then(function (value) {
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

        api.assignDialog(1, {
            manager_id: 1
        }).then(function (value) {
            chai.expect(value).to.be.an('object');
        });
    });

    it('Assign dialog incorrect', function () {
        chai.expect(api.assignDialog.bind(api)).to.throw('Parameter `dialog_id` is required');
    });

    it('Close dialog', function () {
        nock('https://api.example.com/api/bot/v1').delete('/dialogs/1/close').reply(200, {});

        api.closeDialog(1).then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Close dialog incorrect', function () {
        chai.expect(api.closeDialog.bind(api)).to.throw('Parameter `dialog_id` is required');
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

        api.sendMessage({
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
        chai.expect(api.sendMessage.bind(api)).to.throw('Body is not be empty');
    });

    it('Get messages', function() {
        nock('https://api.example.com/api/bot/v1').get('/messages').reply(200, [{
            id: 1,
            chat_id: 1,
            from: {
                id: 1
            }
        }]);

        api.getMessages().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty messages', function () {
        nock('https://api.example.com/api/bot/v1').get('/messages').reply(200, []);

        api.getMessages().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Delete message', function () {
        nock('https://api.example.com/api/bot/v1').delete('/messages/1').reply(200, {});

        api.deleteMessage(1).then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Delete message incorrect', function () {
        chai.expect(api.deleteMessage.bind(api)).to.throw('Parameter `message_id` is required');
    });

    it('Edit message', function () {
        nock('https://api.example.com/api/bot/v1').patch('/messages/1', {
            content: 'tests message'
        }).reply(200, {});

        api.editMessage(1, {
            content: 'tests message'
        }).then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Edit message incorrect', function () {
        chai.expect(api.editMessage.bind(api)).to.throw('Parameter `message_id` is required');
    });

    it('Get commands', function () {
        nock('https://api.example.com/api/bot/v1').get('/my/commands').reply(200, [{
            id: 1,
            name: 'Command name'
        }]);

        api.getCommands().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty commands', function () {
        nock('https://api.example.com/api/bot/v1').get('/my/commands').reply(200, []);

        api.getCommands().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Edit command', function () {
        nock('https://api.example.com/api/bot/v1').put('/my/commands/command', {
            description: 'Desc',
            name: 'name'
        }).reply(200, {});

        api.editCommand('command', {
            description: 'Desc',
            name: 'name'
        }).then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Edit command incorrect', function () {
        chai.expect(api.editCommand.bind(api, 'command')).to.throw('Body is not be empty');
        chai.expect(api.editCommand.bind(api)).to.throw('Parameter `command_name` is required');
    });

    it('Delete command', function () {
        nock('https://api.example.com/api/bot/v1').delete('/my/commands/command').reply(200, {});

        api.deleteCommand('command').then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Delete command incorrect', function () {
        chai.expect(api.deleteCommand.bind(api)).to.throw('Parameter `command_name` is required');
    });

    it('Update bot info', function () {
        nock('https://api.example.com/api/bot/v1').patch('/my/info', {
            avatar_url: 'http://tests.ru/avatar.png',
            name: 'Bot'
        }).reply(200, {});

        api.info({
            avatar_url: 'http://tests.ru/avatar.png',
            name: 'Bot'
        }).then(function (value) {
            chai.expect(value).to.be.empty;
        });
    });

    it('Update bot info incorrect', function () {
        chai.expect(api.info.bind(api)).to.throw('Body is not be empty');
    });

    it('Get users', function () {
        nock('https://api.example.com/api/bot/v1').get('/users').reply(200, [{
            id: 1,
            name: 'Username'
        }]);

        api.getUsers().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.not.empty;
        });
    });

    it('Get empty users', function () {
        nock('https://api.example.com/api/bot/v1').get('/users').reply(200, []);

        api.getUsers().then(function (value) {
            chai.expect(value).to.be.an('array');
            chai.expect(value).to.be.empty;
        });
    });

    it('Get websocket data', function () {
        const wsData = api.getWebsocketData([MgBotApiClient.types().wsMessageNew, MgBotApiClient.types().wsMessageUpdated]);
        const expectedUrl = 'wss://api.example.com/api/bot/v1/ws?events=message_new,message_updated';
        const expectedHeaders = {'X-Bot-Token': 'test_token'};

        chai.assert.equal(wsData.get('url'), expectedUrl);
        chai.assert.equal(wsData.get('headers')["X-Bot-Token"], expectedHeaders["X-Bot-Token"]);
    });

    it('Get websocket url incorrect', function () {
        chai.expect(api.getWebsocketData.bind(api)).to.throw('Events is required');
    });
});
