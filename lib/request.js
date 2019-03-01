'use strict';

import url from 'url'
import https from 'https'
import querystring from 'querystring'

export default class Request {
    /**
     * @param {Object} options
     * @constructor
     */
    constructor(options) {
        /**
         * @prop System host
         * @type {string}
         * @private
         */
        this._host = url.parse(options.host).host;

        /**
         * @prop Bot token
         * @type {*|string|string}
         * @private
         */
        this._token = options.token;
    }

    /**
     * Get request path
     * @param {string} endpoint
     * @returns {string}
     * @private
     */
    _getPath(endpoint) {
        return '/api/bot/' + endpoint;
    }

    /**
     * Make request
     * @param {string} endpoint
     * @param {string} method
     * @param {Object} data
     * @returns {Promise}
     * @throws {Error}
     * @private
    */
    _request(endpoint, method, data = {}) {
        let path = this._getPath(endpoint);
        let response = '';

        if (method === 'GET' && data.length > 0) {
            path += '?' + querystring.stringify(data);
        }

        const options = {
            host: this._host,
            method: method,
            path: path,
            headers: {
                'X-Bot-Token': this._token
            }
        };

        return new Promise(function(resolve, reject) {
            const request = https.request(options, function (res) {
                res.on('data', function (chunk) {
                    response += chunk;
                });

                res.on('end', function () {
                    try {
                        const result = JSON.parse(response);

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
    }

    /**
     * Method GET
     * @param {string} endpoint
     * @param {Object} params
     * @returns {Promise}
     */
    get(endpoint, params = {}) {
        return this._request(endpoint, 'GET', params);
    }

    /**
     * Method POST
     * @param {string} endpoint
     * @param {Object} data
     * @returns {Promise}
     * @throws {Error}
     */
    post(endpoint, data) {
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
    patch(endpoint, data) {
        if (!data) {
            throw new Error('Body is not be empty');
        }

        return this._request(endpoint, 'PATCH', data);
    }

    /**
     * Method PUT
     * @param {string} endpoint
     * @param {Object} data
     * @returns {Promise}
     * @throws {Error}
     */
    put(endpoint, data) {
        if (!data) {
            throw new Error('Body is not be empty');
        }

        return this._request(endpoint, 'PUT', data);
    }

    /**
     * Method DELETE
     * @param {string} endpoint
     * @returns {Promise}
     */
    delete(endpoint) {
        return this._request(endpoint, 'DELETE');
    }

    /**
     * Get api host
     * @returns {string | *}
     */
    get host() {
        return this._host;
    }

    /**
     * Get bot token
     * @returns {*|string}
     */
    get token() {
        return this._token;
    }
}
