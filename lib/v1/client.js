'use strict';

/** @class Client */
export default class Client {
    constructor(request) {
        this._version = 'v1';
        this._request = request;
    }

    /**
     * Get bots
     * @param {Object} params - Filter's object for bots
     * @returns {Promise}
     * @memberOf Client
     */
    getBots(params = {}) {
        return this._request.get(this._version + '/bots', params);
    };

    /**
     * Get channels
     * @param {Object} params - Filter's object for channels
     * @returns {Promise}
     * @memberOf Client
     */
    getChannels(params = {}) {
        return this._request.get(this._version + '/channels', params);
    };

    /**
     * Get chats
     * @param {Object} params - Filter's object for chats
     * @returns {Promise}
     * @memberOf Client
     */
    getChats(params = {}) {
        return this._request.get(this._version + '/chats', params);
    };

    /**
     * Get customers
     * @param {Object} params - Filter's object for customers
     * @returns {Promise}
     * @memberOf Client
     */
    getCustomers(params = {}) {
        return this._request.get(this._version + '/customers', params);
    };

    /**
     * Get dialogs
     * @param {Object} params - Filter's object for dialogs
     * @returns {Promise}
     * @memberOf Client
     */
    getDialogs(params = {}) {
        return this._request.get(this._version + '/dialogs', params);
    };

    /**
     * Get members
     * @param {Object} params - Filter's object for members
     * @returns {Promise}
     * @memberOf Client
     */
    getMembers(params = {}) {
        return this._request.get(this._version + '/members', params);
    };

    /**
     * Assign dialog
     * @param {Number} dialog_id - Dialog id
     * @param {Object} dialog - Dialog object
     * @returns {Promise}
     * @throws {Error}
     * @memberOf Client
     */
    assignDialog(dialog_id, dialog) {
        if (!dialog_id) {
            throw new Error('Parameter `dialog_id` is required');
        }

        return this._request.patch(this._version + '/dialogs/'+ dialog_id + '/assign', dialog);
    };

    /**
     * Unassign dialog
     * @param {Number} dialog_id - Dialog id
     * @returns {Promise}
     * @throws {Error}
     * @memberOf Client
     */
    unassignDialog(dialog_id) {
        if (!dialog_id) {
            throw new Error('Parameter `dialog_id` is required');
        }

        return this._request.patch(this._version + '/dialogs/'+ dialog_id + '/unassign', {});
    }

    /**
     * Close dialog
     * @param {Number} dialog_id - Dialog id
     * @returns {Promise}
     * @throws {Error}
     * @memberOf Client
     */
    closeDialog(dialog_id) {
        if (!dialog_id) {
            throw new Error('Parameter `dialog_id` is required');
        }

        return this._request.delete(this._version + '/dialogs/'+ dialog_id + '/close');
    };

    /**
     * Send message
     * @param {Object} message - Message object
     * @returns {Promise}
     * @memberOf Client
     */
    sendMessage(message) {
        return this._request.post(this._version + '/messages', message);
    };

    /**
     * Get messages
     * @param {Object} params - Filter's object for messages
     * @returns {Promise}
     * @memberOf Client
     */
    getMessages(params = {}) {
        return this._request.get(this._version + '/messages', params);
    };

    /**
     * Delete message
     * @param {Number} message_id - Message id
     * @returns {Promise}
     * @throws {Error}
     * @memberOf Client
     */
    deleteMessage(message_id) {
        if (!message_id) {
            throw new Error('Parameter `message_id` is required');
        }

        return this._request.delete(this._version + '/messages/' + message_id);
    };

    /**
     * Edit message
     * @param {Number} message_id - Message id
     * @param {Object} message - Message object
     * @returns {Promise}
     * @throws {Error}
     * @memberOf Client
     */
    editMessage(message_id, message) {
        if (!message_id) {
            throw new Error('Parameter `message_id` is required');
        }

        return this._request.patch(this._version + '/messages/' + message_id, message);
    };

    /**
     * Get bot commands
     * @param {Object} params - Filter's object for commands
     * @returns {Promise}
     * @memberOf Client
     */
    getCommands(params = {}) {
        return this._request.get(this._version + '/my/commands', params);
    };

    /**
     * Edit bot command
     * @param {string} command_name - Command name
     * @param {Object} command - Command object
     * @returns {Promise}
     * @throws {Error}
     * @memberOf Client
     */
    editCommand(command_name, command) {
        if (!command_name) {
            throw new Error('Parameter `command_name` is required');
        }

        return this._request.put(this._version + '/my/commands/' + command_name, command);
    };

    /**
     * Delete bot command
     * @param {string} command_name - Command name
     * @returns {Promise}
     * @throws {Error}
     * @memberOf Client
     */
    deleteCommand(command_name) {
        if (!command_name) {
            throw new Error('Parameter `command_name` is required');
        }

        return this._request.delete(this._version + '/my/commands/' + command_name);
    };

    /**
     * Bot information update
     * @param {Object} data - Bot data
     * @returns {Promise}
     * @memberOf Client
     */
    info(data) {
        return this._request.patch(this._version + '/my/info', data);
    };

    /**
     * Get users
     * @param {Object} params - Filter's object for users
     * @returns {Promise}
     * @memberOf Client
     */
    getUsers(params = {}) {
        return this._request.get(this._version + '/users', params);
    };

    /**
     * Get file information
     * @param {string} file_id - File identifier
     * @returns {Promise}
     * @throws {Error}
     * @memberOf Client
     */
    getFile(file_id) {
        if (!file_id) {
            throw new Error('Parameter `file_id` is required');
        }

        return this._request.get(this._version + '/files/' + file_id)
    }

    /**
     * Upload file
     *
     * @param {string} data - Binary data
     * @returns {Promise}
     * @throws {Error}
     * @memberOf Client
     */
    filesUpload(data) {
        return this._request.post(this._version + '/files/upload', data, false);
    }

    /**
     * Upload file by url
     *
     * @param {string} url - File url address
     * @returns {Promise}
     * @throws {Error}
     * @memberOf Client
     */
    filesUploadByUrl(url) {
        if (!url) {
            throw new Error('Parameter `url` is required');
        }

        return this._request.post(this._version + '/files/upload_by_url', {url})
    }

    /**
     * Get websocket url
     * @param {array<string>} events - Array of strings with websocket events
     * @returns {Map}
     * @throws {Error}
     * @memberOf Client
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
