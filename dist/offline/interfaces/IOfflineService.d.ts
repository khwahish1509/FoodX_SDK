import { SyncOptions } from '../models/SyncOptions';
import { SyncResult } from '../models/SyncResult';
import { QueuedItem } from '../models/QueuedItem';
/**
 * Interface for offline-first capabilities
 */
export interface IOfflineService {
    /**
     * Initialize the offline service
     */
    initialize(): Promise<void>;
    /**
     * Check if the service is currently online
     */
    isOnline(): boolean;
    /**
     * Manually trigger data synchronization
     * @param options Synchronization options
     */
    sync(options?: SyncOptions): Promise<SyncResult>;
    /**
     * Store data locally for offline use
     * @param key Unique identifier for the data
     * @param data Data to store
     * @param options Storage options (expiration, etc.)
     */
    storeData(key: string, data: any, options?: Record<string, any>): Promise<void>;
    /**
     * Retrieve data from local storage
     * @param key Unique identifier for the data
     */
    getData(key: string): Promise<any>;
    /**
     * Add an operation to the offline queue
     * @param operation Operation details
     */
    queueOperation(operation: any): Promise<string>;
    /**
     * Get all pending operations in the queue
     */
    getPendingOperations(): Promise<QueuedItem[]>;
    /**
     * Clear all pending operations from the queue
     */
    clearPendingOperations(): Promise<void>;
    /**
     * Add an event listener for offline/online status changes
     * @param event Event name
     * @param listener Callback function
     */
    on(event: 'online' | 'offline' | 'sync', listener: (data: any) => void): void;
    /**
     * Remove an event listener
     * @param event Event name
     * @param listener Callback function
     */
    off(event: 'online' | 'offline' | 'sync', listener: (data: any) => void): void;
}
