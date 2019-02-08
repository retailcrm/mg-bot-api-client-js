'use strict';

var url = require('url');
var https = require('https');
var querystring = require('querystring');

exports.Request = Request;

/**
 * @param {Object} options
 * @constructor
 */
function Request(options) {
    this._host = url.parse(options.host).host;
    this._token = options.token;
}

/**
 * Get request path
 * @param {string} endpoint
 * @returns {string}
 * @private
 */
Request.prototype._getPath = function (endpoint) {
    return '/api/bot/' + endpoint;
};

/**
 * Make request
 * @param {string} endpoint
 * @param {string} method
 * @param {Object} data
 * @returns {Promise}
 * @throws {Error}
 * @private
 */
Request.prototype._request = function (endpoint, method, data) {
    var path = this._getPath(endpoint);
    var response = '';

    if (method === 'GET' && data.length > 0) {
        path += '?' + querystring.stringify(data);
    }

    var options = {
        host: this._host,
        method: method,
        path: path,
        headers: {
            'x-bot-token': this._token
        }
    };

    return new Promise(function(resolve, reject) {
        var request = https.request(options, function (res) {
            res.on('data', function (chunk) {
                response += chunk;
            });

            res.on('end', function () {
                try {
                    var result = JSON.parse(response);

                    if (res.statusCode < 400) {
                        resolve(result);
                    } else {
                        reject(new Error(result.errors.join(',')));
                    }
                } catch (e) {
                    reject(e);
                }
            });

            res.on('error', function (e) {
                reject(e);
            })
        });

        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            request.write(JSON.stringify(data));
        }

        request.end();

        request.on('error', function(e) {
            reject(e);
        });
    });
};

/**
 * Method GET
 * @param {string} endpoint
 * @param {Object} params
 * @returns {Promise}
 */
Request.prototype.get = function (endpoint, params) {
    if (params === undefined) {
        params = {};
    }

    return this._request(endpoint, 'GET', params);
};

/**
 * Method POST
 * @param {string} endpoint
 * @param {Object} data
 * @returns {Promise}
 * @throws {Error}
 */
Request.prototype.post = function (endpoint, data) {
    if (!data) {
        throw new Error('Body is not be empty');
    }

    return this._request(endpoint, 'POST', data);
};

/**
 * Method PATCH
 * @param {string} endpoint
 * @param {Object} data
 * @returns {Promise}
 * @throws {Error}
 */
Request.prototype.patch = function (endpoint, data) {
    if (!data) {
        throw new Error('Body is not be empty');
    }

    return this._request(endpoint, 'PATCH', data);
};

/**
 * Method PUT
 * @param {string} endpoint
 * @param {Object} data
 * @returns {Promise}
 * @throws {Error}
 */
Request.prototype.put = function (endpoint, data) {
    if (!data) {
        throw new Error('Body is not be empty');
    }

    return this._request(endpoint, 'PUT', data);
};

/**
 * Method DELETE
 * @param {string} endpoint
 * @returns {Promise}
 */
Request.prototype.delete = function (endpoint) {
    return this._request(endpoint, 'DELETE', {});
};

Request.prototype.getHost = function () {
    return this._host;
};
