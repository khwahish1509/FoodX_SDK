import { QueuedItem, QueuedItemStatus } from '../models/QueuedItem';
import { IOfflineStorage } from './IOfflineStorage';
/**
 * Filter options for getting queue items
 */
export interface QueueItemFilter {
    /**
     * Filter by status (single status or array of statuses)
     */
    status?: QueuedItemStatus | QueuedItemStatus[];
    /**
     * Filter by resource type
     */
    resourceType?: string;
    /**
     * Filter by resource ID
     */
    resourceId?: string;
    /**
     * Filter by operation type
     */
    operationType?: string;
    /**
     * Maximum number of items to return
     */
    limit?: number;
    /**
     * Sort direction
     */
    sortDirection?: 'asc' | 'desc';
    /**
     * Sort by field
     */
    sortBy?: 'queuedAt' | 'priority' | 'attempts';
}
/**
 * Interface for managing queued operations
 */
export interface IQueueManager {
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
}
