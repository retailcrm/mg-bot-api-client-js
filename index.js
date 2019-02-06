'use strict';

var https = require('https');
var querystring = require('querystring');
var url = require('url');
var lastApiVersion = 'v1';

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

    this._setDefaultOptions(options)
}

/**
 * @param {Object} options
 * @private
 */
RetailcrmBotApiClient.prototype._setDefaultOptions = function (options) {
    if (!options.apiVersion) {
        this.apiVersion = lastApiVersion;
    } else {
        this.apiVersion = options.apiVersion;
    }

    this.host = url.parse(options.host).host;
    this.token = options.token;
};

/**
 * Get request path
 * @param {string} endpoint
 * @returns {string}
 * @private
 */
RetailcrmBotApiClient.prototype._getPath = function (endpoint) {
    return '/api/bot/' + this.apiVersion + endpoint;
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
RetailcrmBotApiClient.prototype._request = function (endpoint, method, data) {
    var path= this._getPath(endpoint);
    var response = '';

    if (method === 'GET' && data.length > 0) {
        path += '?' + querystring.stringify(data);
    }

    var options = {
        host: this.host,
        method: method,
        path: path,
        headers: {
            'x-bot-token': this.token
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
 * @private
 */
RetailcrmBotApiClient.prototype._get = function (endpoint, params) {
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
 * @private
 */
RetailcrmBotApiClient.prototype._post = function (endpoint, data) {
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
 * @private
 */
RetailcrmBotApiClient.prototype._patch = function (endpoint, data) {
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
 * @private
 */
RetailcrmBotApiClient.prototype._put = function (endpoint, data) {
    if (!data) {
        throw new Error('Body is not be empty');
    }

    return this._request(endpoint, 'PUT', data);
};

/**
 * Method DELETE
 * @param {string} endpoint
 * @returns {Promise}
 * @private
 */
RetailcrmBotApiClient.prototype._delete = function (endpoint) {
    return this._request(endpoint, 'DELETE', {});
};

/**
 * Set API version
 * @param {string} api_version
 */
RetailcrmBotApiClient.prototype.setApiVersion = function (api_version) {
    this.apiVersion = api_version;
};

/**
 * Get bot token
 * @returns {*|string}
 */
RetailcrmBotApiClient.prototype.getToken = function () {
    return this.token;
};

/**
 * Get bots
 * @param {string} params
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.getBots = function (params) {
    return this._get('/bots', params);
};

/**
 * Get channels
 * @param {string} params
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.getChannels = function (params) {
    return this._get('/channels', params);
};

/**
 * Get chats
 * @param {string} params
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.getChats = function (params) {
    return this._get('/chats', params);
};

/**
 * Get customers
 * @param {string} params
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.getCustomers = function (params) {
    return this._get('/customers', params);
};

/**
 * Get dialogs
 * @param {string} params
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.getDialogs = function (params) {
    return this._get('/dialogs', params);
};

/**
 * Get members
 * @param {string} params
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.getMembers = function (params) {
    return this._get('/members', params);
};

/**
 * Assign dialog
 * @param {Number} dialog_id
 * @param {Object} dialog
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.assignDialog = function (dialog_id, dialog) {
    return this._patch('/dialogs/'+ dialog_id + '/assign', dialog);
};

/**
 * Close dialog
 * @param {Number} dialog_id
 * @returns {Promise}
 * @throws {Error}
 */
RetailcrmBotApiClient.prototype.closeDialog = function (dialog_id) {
    if (!dialog_id) {
        throw new Error('dialog_id is required');
    }

    return this._delete('/dialogs/'+ dialog_id + '/close');
};

/**
 * Send message
 * @param {Object} data
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.sendMessage = function (data) {
    return this._post('/messages', data);
};

/**
 * Get messages
 * @param {Object} params
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.getMessages = function (params) {
    return this._get('/messages', params);
};

/**
 * Delete message
 * @param {Number} message_id
 * @returns {Promise}
 * @throws {Error}
 */
RetailcrmBotApiClient.prototype.deleteMessage = function (message_id) {
    if (!message_id) {
        throw new Error('message_id is required');
    }

    return this._delete('/messages/' + message_id);
};

/**
 * Edit message
 * @param {Number} message_id
 * @param {Object} message
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.editMessage = function (message_id, message) {
    return this._patch('/messages/' + message_id, message);
};

/**
 * Get bot commands
 * @param {Object} params
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.getCommands = function (params) {
    return this._get('/my/commands', params);
};

/**
 * Edit bot command
 * @param {string} command_name
 * @param {Object} data
 * @returns {Promise}
 * @throws {Error}
 */
RetailcrmBotApiClient.prototype.editCommand = function (command_name, data) {
    if (!command_name) {
        throw new Error('Parameter command name is required');
    }

    return this._put('/my/commands/' + command_name, data);
};

/**
 * Delete bot command
 * @param {string} command_name
 * @returns {Promise}
 * @throws {Error}
 */
RetailcrmBotApiClient.prototype.deleteCommand = function (command_name) {
    if (!command_name) {
        throw new Error('command_name is required');
    }

    return this._delete('/my/commands/' + command_name);
};

/**
 * Bot information update
 * @param {Object} data
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.info = function (data) {
    return this._patch('/my/info', data);
};

/**
 * Get users
 * @param {Object} params
 * @returns {Promise}
 */
RetailcrmBotApiClient.prototype.getUsers = function (params) {
    return this._get('/users', params);
};

/**
 * Get websocket url
 * @param {array<string>} events
 * @returns {string}
 * @throws {Error}
 */
RetailcrmBotApiClient.prototype.getWebsocketUrl = function (events) {
    if (!events) {
        throw new Error('Events is required');
    }

    var url = 'wss://' + this.host + '/api/bot/' + this.apiVersion + '/ws?events=';

    events.forEach(function (event) {
        url += event + ',';
    });

    url = url.slice(0, -1);

    return url;
};
