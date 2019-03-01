'use strict';

/**
 * @classdesc Bot API v1 methods
 * @namespace ClientV1
 * @readonly
 */
export default class Client {
    /**
     * @param {Request} request
     * @constructor
     */
    constructor(request) {
        /**
         * @prop API version
         * @type {string}
         * @private
         */
        this._version = 'v1';

        /**
         * @prop Request object
         * @type {Request}
         * @private
         */
        this._request = request;
    }

    /**
     * Get bots
     * @param {Object} params
     * @since 1.0.0
     * @returns {Promise}
     */
    getBots(params = {}) {
        return this._request.get(this._version + '/bots', params);
    };

    /**
     * Get channels
     * @param {Object} params
     * @returns {Promise}
     */
    getChannels(params = {}) {
        return this._request.get(this._version + '/channels', params);
    };

    /**
     * Get chats
     * @param {Object} params
     * @returns {Promise}
     */
    getChats(params = {}) {
        return this._request.get(this._version + '/chats', params);
    };

    /**
     * Get customers
     * @param {Object} params
     * @returns {Promise}
     */
    getCustomers(params = {}) {
        return this._request.get(this._version + '/customers', params);
    };

    /**
     * Get dialogs
     * @param {Object} params
     * @returns {Promise}
     */
    getDialogs(params = {}) {
        return this._request.get(this._version + '/dialogs', params);
    };

    /**
     * Get members
     * @param {Object} params
     * @returns {Promise}
     */
    getMembers(params = {}) {
        return this._request.get(this._version + '/members', params);
    };

    /**
     * Assign dialog
     * @param {Number} dialog_id - Dialog identificator
     * @param {Object} dialog - Dialog object
     * @returns {Promise}
     * @throws {Error}
     */
    assignDialog(dialog_id, dialog) {
        if (!dialog_id) {
            throw new Error('Parameter `dialog_id` is required');
        }

        return this._request.patch(this._version + '/dialogs/'+ dialog_id + '/assign', dialog);
    };

    /**
     * Close dialog
     * @param {Number} dialog_id
     * @returns {Promise}
     * @throws {Error}
     */
    closeDialog(dialog_id) {
        if (!dialog_id) {
            throw new Error('Parameter `dialog_id` is required');
        }

        return this._request.delete(this._version + '/dialogs/'+ dialog_id + '/close');
    };

    /**
     * Send message
     * @param {Object} data
     * @returns {Promise}
     */
    sendMessage(data) {
        return this._request.post(this._version + '/messages', data);
    };

    /**
     * Get messages
     * @param {Object} params
     * @returns {Promise}
     */
    getMessages(params = {}) {
        return this._request.get(this._version + '/messages', params);
    };

    /**
     * Delete message
     * @param {Number} message_id
     * @returns {Promise}
     * @throws {Error}
     */
    deleteMessage(message_id) {
        if (!message_id) {
            throw new Error('Parameter `message_id` is required');
        }

        return this._request.delete(this._version + '/messages/' + message_id);
    };

    /**
     * Edit message
     * @param {Number} message_id
     * @param {Object} message
     * @returns {Promise}
     * @throws {Error}
     */
    editMessage(message_id, message) {
        if (!message_id) {
            throw new Error('Parameter `message_id` is required');
        }

        return this._request.patch(this._version + '/messages/' + message_id, message);
    };

    /**
     * Get bot commands
     * @param {Object} params
     * @returns {Promise}
     */
    getCommands(params = {}) {
        return this._request.get(this._version + '/my/commands', params);
    };

    /**
     * Edit bot command
     * @param {string} command_name
     * @param {Object} data
     * @returns {Promise}
     * @throws {Error}
     */
    editCommand(command_name, data) {
        if (!command_name) {
            throw new Error('Parameter `command_name` is required');
        }

        return this._request.put(this._version + '/my/commands/' + command_name, data);
    };

    /**
     * Delete bot command
     * @param {string} command_name
     * @returns {Promise}
     * @throws {Error}
     */
    deleteCommand(command_name) {
        if (!command_name) {
            throw new Error('Parameter `command_name` is required');
        }

        return this._request.delete(this._version + '/my/commands/' + command_name);
    };

    /**
     * Bot information update
     * @param {Object} data
     * @returns {Promise}
     */
    info(data) {
        return this._request.patch(this._version + '/my/info', data);
    };

    /**
     * Get users
     * @param {Object} params
     * @returns {Promise}
     */
    getUsers(params = {}) {
        return this._request.get(this._version + '/users', params);
    };

    /**
     * Get websocket url
     * @param {array<string>} events
     * @returns {Map}
     * @throws {Error}
     */
    getWebsocketData(events) {
        if (!events) {
            throw new Error('Events is required');
        }

        let map = new Map();
        let url = 'wss://' + this._request.host + '/api/bot/' + this._version + '/ws?events=';

        events.forEach(function (event) {
            url += event + ',';
        });

        url = url.slice(0, -1);

        map.set('url', url);
        map.set('headers', {
            'X-Bot-Token': this._request.token
        });

        return map;
    };
}
