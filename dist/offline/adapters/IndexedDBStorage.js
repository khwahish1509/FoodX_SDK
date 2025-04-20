"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexedDBStorage = void 0;
const Logger_1 = require("../../utils/Logger");
const idb_keyval_1 = require("idb-keyval");
/**
 * Storage adapter using IndexedDB (for browser environments)
 */
class IndexedDBStorage {
    /**
     * Create a new IndexedDB storage adapter
     * @param prefix Optional prefix for all keys
     */
    constructor(prefix = 'foodx:') {
        this._logger = new Logger_1.Logger('IndexedDBStorage');
        this._prefix = prefix;
    }
    /**
     * Initialize the storage
     */
    async initialize() {
        this._logger.info('Initializing IndexedDB storage');
        // Check if we're in a browser environment
        if (typeof window === 'undefined' || !window.indexedDB) {
            throw new Error('IndexedDB is not available in this environment');
        }
        // No additional initialization needed for idb-keyval
    }
    /**
     * Store a value with the given key
     * @param key The key to store the value under
     * @param value The value to store
     */
    async setItem(key, value) {
        this._logger.debug(`Setting item: ${key}`);
        const prefixedKey = this._prefix + key;
        try {
            await (0, idb_keyval_1.set)(prefixedKey, value);
        }
        catch (error) {
            this._logger.error(`Failed to set item: ${key}`, error);
            throw error;
        }
    }
    /**
     * Retrieve a value by key
     * @param key The key to retrieve
     */
    async getItem(key) {
        this._logger.debug(`Getting item: ${key}`);
        const prefixedKey = this._prefix + key;
        try {
            return await (0, idb_keyval_1.get)(prefixedKey);
        }
        catch (error) {
            this._logger.error(`Failed to get item: ${key}`, error);
            throw error;
        }
    }
    /**
     * Remove a value by key
     * @param key The key to remove
     */
    async removeItem(key) {
        this._logger.debug(`Removing item: ${key}`);
        const prefixedKey = this._prefix + key;
        try {
            await (0, idb_keyval_1.del)(prefixedKey);
        }
        catch (error) {
            this._logger.error(`Failed to remove item: ${key}`, error);
            throw error;
        }
    }
    /**
     * Get all keys in the storage
     */
    async getAllKeys() {
        this._logger.debug('Getting all keys');
        try {
            const allKeys = await (0, idb_keyval_1.keys)();
            // Filter keys by prefix and remove the prefix
            return allKeys
                .filter(key => typeof key === 'string' && key.startsWith(this._prefix))
                .map(key => key.substring(this._prefix.length));
        }
        catch (error) {
            this._logger.error('Failed to get all keys', error);
            throw error;
        }
    }
    /**
     * Clear all data from the storage
     */
    async clear() {
        this._logger.debug('Clearing all data');
        try {
            // Get all keys first
            const allKeys = await (0, idb_keyval_1.keys)();
            // Delete only keys with our prefix
            const prefixedKeys = allKeys.filter(key => typeof key === 'string' && key.startsWith(this._prefix));
            // Delete each key
            for (const key of prefixedKeys) {
                await (0, idb_keyval_1.del)(key);
            }
            this._logger.debug(`Cleared ${prefixedKeys.length} items`);
        }
        catch (error) {
            this._logger.error('Failed to clear storage', error);
            throw error;
        }
    }
}
exports.IndexedDBStorage = IndexedDBStorage;
