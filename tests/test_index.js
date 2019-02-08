var nock = require('nock');
var chai = require('chai');
var RetailcrmBotApiClient = require('../index');

describe('#Constructor', function () {
    it('Empty url', function () {
        chai.expect(function() {
            new RetailcrmBotApiClient({token: 'test_token'});
        }).to.throw('Url is required');
    });

    it('Incorrect url', function () {
        chai.expect(function() {
            new RetailcrmBotApiClient({
                host: 'http://api.example.com',
                token: 'test_token'
            });
        }).to.throw('HTTPS required');
    });

    it('Empty token', function () {
        chai.expect(function() {
            new RetailcrmBotApiClient({host: 'https://api.example.com'});
        }).to.throw('Token is required');
    });
});
