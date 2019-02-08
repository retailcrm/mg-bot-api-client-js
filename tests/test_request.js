var chai = require('chai');
var request = require('../lib/request');

describe('#Request', function () {
    var req = new request.Request({
        host: 'http://api.example.com',
        token: 'test_token'
    });

    it('Request parameters', function () {
        chai.expect(req._host).to.equal('api.example.com');
        chai.expect(req._token).to.equal('test_token');
    })
});
