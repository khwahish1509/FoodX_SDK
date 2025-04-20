import { IQueueManager, QueueItemFilter } from '../interfaces/IQueueManager';
import { QueuedItem } from '../models/QueuedItem';
import { IOfflineStorage } from '../interfaces/IOfflineStorage';
/**
 * Manages operation queues in the offline storage
 */
export declare class LocalQueueManager implements IQueueManager {
    private _logger;
    private _storage;
    private _queueKeyPrefix;
    /**
     * Create a new queue manager
     * @param queueKeyPrefix Key prefix for queue items in storage
     */
    constructor(queueKeyPrefix?: string);
    /**
     * Initialize the queue manager
     * @param storage Storage to use for persistence
     */
    initialize(storage: IOfflineStorage): Promise<void>;
    /**
     * Add an item to the queue
     * @param item Item to add
     * @returns Unique ID of the added item
     */
    addItem(item: Omit<QueuedItem, 'id'>): Promise<string>;
    /**
     * Update an existing item
     * @param id Item ID
     * @param updates Partial updates to apply
     */
    updateItem(id: string, updates: Partial<QueuedItem>): Promise<void>;
    /**
     * Get an item by ID
     * @param id Item ID
     */
    getItem(id: string): Promise<QueuedItem | null>;
    /**
     * Get items matching the filter
     * @param filter Filter options
     */
    getItems(filter?: QueueItemFilter): Promise<QueuedItem[]>;
    /**
     * Remove an item from the queue
     * @param id Item ID
     */
    removeItem(id: string): Promise<void>;
    /**
     * Clear all items from the queue
     */
    clearAll(): Promise<void>;
    /**
     * Get the storage key for an item
     * @param id Item ID
     */
    private getItemKey;
    /**
     * Ensure the manager is initialized
     */
    private ensureInitialized;
}
