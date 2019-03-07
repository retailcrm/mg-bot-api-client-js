'use strict';

import v1 from './lib/v1/client'
import Request from './lib/request'
import * as consts from './lib/consts'

const lastApiVersion = 'v1';

export default class MgBotApiClient {
    /**
     * @param {Object} options
     * @throws {Error}
     */
    constructor(options) {
        if (!options.host) {
            throw new Error('Url is required');
        }

        if (options.host.indexOf('https') !== 0) {
            throw new Error('HTTPS required');
        }

        if (!(options.token)) {
            throw new Error('Token is required');
        }

        let currentVersion;

        const clients  = {
            'v1': v1
        };

        if (options.apiVersion) {
            currentVersion = options.apiVersion;
        } else {
            currentVersion = lastApiVersion;
        }

        this._client = new clients[currentVersion](new Request(options));
    }

    /**
     * Get API client
     * @returns {Client}
     */
    get client() {
        return this._client;
    };

    /**
     * Get types
     * @returns {{msgTypeOrder?: string, wsUserJoinedChat?: string, msgTypeImage?: string, wsDialogAssign?: string, msgTypeText?: string, messageScopePublic?: string, wsMessageDeleted?: string, msgTypeCommand?: string, msgTypeFile?: string, msgTypeSystem?: string, wsBotUpdated?: string, msgTypeProduct?: string, wsDialogClosed?: string, wsMessageNew?: string, wsMessageUpdated?: string, wsSettingsUpdated?: string, wsUserUpdated?: string, wsCustomerUpdated?: string, wsChatCreated?: string, wsUserLeftChat?: string, wsChannelUpdated?: string, wsDialogOpened?: string, messageScopePrivate?: string, wsUserOnlineUpdated?: string, wsChatUnreadUpdated?: string, wsChatUpdated?: string}}
     */
    static types() {
        return consts;
    }
}
