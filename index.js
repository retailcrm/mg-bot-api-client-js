'use strict';

var v1 = require('./lib/v1/client');
var request = require('./lib/request');

module.exports = RetailcrmBotApiClient;

/**
 * @param {Object} options
 * @throws {Error}
 * @constructor
 */
function RetailcrmBotApiClient(options) {
    if (!options.host) {
        throw new Error('Url is required');
    }

    if (options.host.indexOf('https') !== 0) {
        throw new Error('HTTPS required');
    }

    if (!(options.token)) {
        throw new Error('Token is required');
    }

    var currentVersion;
    var lastApiVersion = 'v1';

    var clients  = {
        'v1': v1.Client
    };

    if (options.apiVersion) {
        currentVersion = options.apiVersion;
    } else {
        currentVersion = lastApiVersion;
    }

    this._client = new clients[currentVersion](new request.Request(options));
}

/**
 * Get API client
 * @returns {Client}
 */
RetailcrmBotApiClient.prototype.getClient = function () {
    return this._client;
};
