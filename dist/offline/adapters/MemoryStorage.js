"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStorage = void 0;
const Logger_1 = require("../../utils/Logger");
/**
 * Simple in-memory storage for testing in Node.js environments
 */
class MemoryStorage {
    /**
     * Create a new memory storage adapter
     */
    constructor() {
        this._logger = new Logger_1.Logger('MemoryStorage');
        this._storage = new Map();
    }
    /**
     * Initialize the storage
     */
    async initialize() {
        this._logger.info('Initializing memory storage');
        // Nothing special to initialize for in-memory storage
    }
    /**
     * Store a value with the given key
     * @param key The key to store the value under
     * @param value The value to store
     */
    async setItem(key, value) {
        this._logger.debug(`Setting item: ${key}`);
        this._storage.set(key, JSON.parse(JSON.stringify(value))); // Deep copy
    }
    /**
     * Retrieve a value by key
     * @param key The key to retrieve
     */
    async getItem(key) {
        this._logger.debug(`Getting item: ${key}`);
        const value = this._storage.get(key);
        return value ? JSON.parse(JSON.stringify(value)) : null; // Deep copy
    }
    /**
     * Remove a value by key
     * @param key The key to remove
     */
    async removeItem(key) {
        this._logger.debug(`Removing item: ${key}`);
        this._storage.delete(key);
    }
    /**
     * Get all keys in the storage
     */
    async getAllKeys() {
        this._logger.debug('Getting all keys');
        return Array.from(this._storage.keys());
    }
    /**
     * Clear all data from the storage
     */
    async clear() {
        this._logger.debug('Clearing all data');
        this._storage.clear();
    }
}
exports.MemoryStorage = MemoryStorage;
