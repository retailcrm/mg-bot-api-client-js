'use strict';

import v1 from './lib/v1/client'
import Request from './lib/request'

const lastApiVersion = 'v1';

/** Class init bot api client */
export default class RetailcrmBotApiClient {
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
}
