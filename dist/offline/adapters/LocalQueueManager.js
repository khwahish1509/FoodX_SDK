"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalQueueManager = void 0;
const Logger_1 = require("../../utils/Logger");
const uuid_1 = require("uuid");
/**
 * Queue manager implementation using local storage
 */
class LocalQueueManager {
    /**
     * Create a new local queue manager
     * @param queueKeyPrefix Prefix for queue item keys in storage
     */
    constructor(queueKeyPrefix = 'queue:') {
        this._logger = new Logger_1.Logger('LocalQueueManager');
        this._queueKeyPrefix = queueKeyPrefix;
    }
    /**
     * Initialize the queue manager
     * @param storage Storage to use for persistence
     */
    async initialize(storage) {
        this._logger.info('Initializing local queue manager');
        this._storage = storage;
    }
    /**
     * Add an item to the queue
     * @param item Item to add
     * @returns Unique ID of the added item
     */
    async addItem(item) {
        this._logger.debug('Adding item to queue', { resourceType: item.resourceType });
        this.ensureInitialized();
        // Generate a unique ID for the item
        const id = (0, uuid_1.v4)();
        // Save the item with the ID
        const queuedItem = {
            ...item,
            id
        };
        await this._storage.setItem(this.getItemKey(id), queuedItem);
        this._logger.debug('Item added to queue', { id });
        return id;
    }
    /**
     * Update an existing item
     * @param id Item ID
     * @param updates Partial updates to apply
     */
    async updateItem(id, updates) {
        this._logger.debug(`Updating item: ${id}`);
        this.ensureInitialized();
        // Get the existing item
        const item = await this.getItem(id);
        if (!item) {
            throw new Error(`Queue item not found: ${id}`);
        }
        // Apply updates
        const updatedItem = {
            ...item,
            ...updates
        };
        // Save the updated item
        await this._storage.setItem(this.getItemKey(id), updatedItem);
        this._logger.debug(`Item updated: ${id}`);
    }
    /**
     * Get an item by ID
     * @param id Item ID
     */
    async getItem(id) {
        this._logger.debug(`Getting item: ${id}`);
        this.ensureInitialized();
        // Retrieve the item
        const item = await this._storage.getItem(this.getItemKey(id));
        return item || null;
    }
    /**
     * Get items matching the filter
     * @param filter Filter options
     */
    async getItems(filter) {
        this._logger.debug('Getting items with filter', filter);
        this.ensureInitialized();
        // Get all queue item keys
        const allKeys = await this._storage.getAllKeys();
        const queueItemKeys = allKeys.filter(key => key.startsWith(this._queueKeyPrefix));
        // Get all queue items
        const items = [];
        for (const key of queueItemKeys) {
            const item = await this._storage.getItem(key);
            if (item) {
                items.push(item);
            }
        }
        // Apply filters
        let filteredItems = items;
        if (filter) {
            if (filter.status) {
                // Handle both single status and array of statuses
                const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
                filteredItems = filteredItems.filter(item => statuses.includes(item.status));
            }
            if (filter.resourceType) {
                filteredItems = filteredItems.filter(item => item.resourceType === filter.resourceType);
            }
            if (filter.resourceId) {
                filteredItems = filteredItems.filter(item => item.resourceId === filter.resourceId);
            }
            if (filter.operationType) {
                filteredItems = filteredItems.filter(item => item.operationType === filter.operationType);
            }
            // Apply sorting
            if (filter.sortBy) {
                const sortDirection = filter.sortDirection === 'desc' ? -1 : 1;
                filteredItems.sort((a, b) => {
                    if (filter.sortBy === 'queuedAt') {
                        return sortDirection * (a.queuedAt - b.queuedAt);
                    }
                    else if (filter.sortBy === 'priority') {
                        return sortDirection * (a.priority - b.priority);
                    }
                    else if (filter.sortBy === 'attempts') {
                        return sortDirection * (a.attempts - b.attempts);
                    }
                    return 0;
                });
            }
            // Apply limit
            if (filter.limit && filter.limit > 0) {
                filteredItems = filteredItems.slice(0, filter.limit);
            }
        }
        this._logger.debug(`Found ${filteredItems.length} items`);
        return filteredItems;
    }
    /**
     * Remove an item from the queue
     * @param id Item ID
     */
    async removeItem(id) {
        this._logger.debug(`Removing item: ${id}`);
        this.ensureInitialized();
        // Remove the item
        await this._storage.removeItem(this.getItemKey(id));
        this._logger.debug(`Item removed: ${id}`);
    }
    /**
     * Clear all items from the queue
     */
    async clearAll() {
        this._logger.debug('Clearing all queue items');
        this.ensureInitialized();
        // Get all queue item keys
        const allKeys = await this._storage.getAllKeys();
        const queueItemKeys = allKeys.filter(key => key.startsWith(this._queueKeyPrefix));
        // Remove all queue items
        for (const key of queueItemKeys) {
            await this._storage.removeItem(key);
        }
        this._logger.debug(`Cleared ${queueItemKeys.length} queue items`);
    }
    /**
     * Get the storage key for a queue item
     * @param id Item ID
     */
    getItemKey(id) {
        return `${this._queueKeyPrefix}${id}`;
    }
    /**
     * Ensure the queue manager is initialized
     */
    ensureInitialized() {
        if (!this._storage) {
            throw new Error('Queue manager not initialized. Call initialize() first.');
        }
    }
}
exports.LocalQueueManager = LocalQueueManager;
