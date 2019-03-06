import chai from 'chai'
import MgBotApiClient from '../index'

describe('#Constructor', function () {
    it('Empty url', function () {
        chai.expect(function() {
            new MgBotApiClient({token: 'test_token'});
        }).to.throw('Url is required');
    });

    it('Incorrect url', function () {
        chai.expect(function() {
            new MgBotApiClient({
                host: 'http://api.example.com',
                token: 'test_token'
            });
        }).to.throw('HTTPS required');
    });

    it('Empty token', function () {
        chai.expect(function() {
            new MgBotApiClient({host: 'https://api.example.com'});
        }).to.throw('Token is required');
    });
});
