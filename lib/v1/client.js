'use strict';

exports.Client = Client;

/**
 * @param {Request} request
 * @constructor
 */
function Client(request) {
    this._version = 'v1';
    this._request = request;
}

/**
 * Get bots
 * @param {string} params
 * @returns {Promise}
 */
Client.prototype.getBots = function (params) {
    return this._request.get(this._version + '/bots', params);
};

/**
 * Get channels
 * @param {string} params
 * @returns {Promise}
 */
Client.prototype.getChannels = function (params) {
    return this._request.get(this._version + '/channels', params);
};

/**
 * Get chats
 * @param {string} params
 * @returns {Promise}
 */
Client.prototype.getChats = function (params) {
    return this._request.get(this._version + '/chats', params);
};

/**
 * Get customers
 * @param {string} params
 * @returns {Promise}
 */
Client.prototype.getCustomers = function (params) {
    return this._request.get(this._version + '/customers', params);
};

/**
 * Get dialogs
 * @param {string} params
 * @returns {Promise}
 */
Client.prototype.getDialogs = function (params) {
    return this._request.get(this._version + '/dialogs', params);
};

/**
 * Get members
 * @param {string} params
 * @returns {Promise}
 */
Client.prototype.getMembers = function (params) {
    return this._request.get(this._version + '/members', params);
};

/**
 * Assign dialog
 * @param {Number} dialog_id
 * @param {Object} dialog
 * @returns {Promise}
 */
Client.prototype.assignDialog = function (dialog_id, dialog) {
    return this._request.patch(this._version + '/dialogs/'+ dialog_id + '/assign', dialog);
};

/**
 * Close dialog
 * @param {Number} dialog_id
 * @returns {Promise}
 * @throws {Error}
 */
Client.prototype.closeDialog = function (dialog_id) {
    if (!dialog_id) {
        throw new Error('dialog_id is required');
    }

    return this._request.delete(this._version + '/dialogs/'+ dialog_id + '/close');
};

/**
 * Send message
 * @param {Object} data
 * @returns {Promise}
 */
Client.prototype.sendMessage = function (data) {
    return this._request.post(this._version + '/messages', data);
};

/**
 * Get messages
 * @param {Object} params
 * @returns {Promise}
 */
Client.prototype.getMessages = function (params) {
    return this._request.get(this._version + '/messages', params);
};

/**
 * Delete message
 * @param {Number} message_id
 * @returns {Promise}
 * @throws {Error}
 */
Client.prototype.deleteMessage = function (message_id) {
    if (!message_id) {
        throw new Error('message_id is required');
    }

    return this._request.delete(this._version + '/messages/' + message_id);
};

/**
 * Edit message
 * @param {Number} message_id
 * @param {Object} message
 * @returns {Promise}
 */
Client.prototype.editMessage = function (message_id, message) {
    return this._request.patch(this._version + '/messages/' + message_id, message);
};

/**
 * Get bot commands
 * @param {Object} params
 * @returns {Promise}
 */
Client.prototype.getCommands = function (params) {
    return this._request.get(this._version + '/my/commands', params);
};

/**
 * Edit bot command
 * @param {string} command_name
 * @param {Object} data
 * @returns {Promise}
 * @throws {Error}
 */
Client.prototype.editCommand = function (command_name, data) {
    if (!command_name) {
        throw new Error('Parameter command name is required');
    }

    return this._request.put(this._version + '/my/commands/' + command_name, data);
};

/**
 * Delete bot command
 * @param {string} command_name
 * @returns {Promise}
 * @throws {Error}
 */
Client.prototype.deleteCommand = function (command_name) {
    if (!command_name) {
        throw new Error('command_name is required');
    }

    return this._request.delete(this._version + '/my/commands/' + command_name);
};

/**
 * Bot information update
 * @param {Object} data
 * @returns {Promise}
 */
Client.prototype.info = function (data) {
    return this._request.patch(this._version + '/my/info', data);
};

/**
 * Get users
 * @param {Object} params
 * @returns {Promise}
 */
Client.prototype.getUsers = function (params) {
    return this._request.get(this._version + '/users', params);
};

/**
 * Get websocket url
 * @param {array<string>} events
 * @returns {string}
 * @throws {Error}
 */
Client.prototype.getWebsocketUrl = function (events) {
    if (!events) {
        throw new Error('Events is required');
    }

    var url = 'wss://' + this._request.getHost() + '/api/bot/' + this._version + '/ws?events=';

    events.forEach(function (event) {
        url += event + ',';
    });

    url = url.slice(0, -1);

    return url;
};
