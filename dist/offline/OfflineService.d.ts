import { IOfflineService } from './interfaces/IOfflineService';
import { SyncOptions } from './models/SyncOptions';
import { SyncResult } from './models/SyncResult';
import { QueuedItem } from './models/QueuedItem';
import { OfflineConfig } from './models/OfflineConfig';
/**
 * Service for managing offline capabilities
 */
export declare class OfflineService implements IOfflineService {
    private _logger;
    private _config;
    private _storage;
    private _queueManager;
    private _isOnline;
    private _syncInterval;
    private _eventListeners;
    /**
     * Create a new offline service
     */
    constructor();
    /**
     * Initialize the offline service
     */
    initialize(config?: OfflineConfig): Promise<void>;
    /**
     * Check if the service is currently online
     */
    isOnline(): boolean;
    /**
     * Start automatic sync at the specified interval
     * @param interval Sync interval in milliseconds
     */
    private startAutoSync;
    /**
     * Handle online/offline status changes
     * @param online Whether the application is online
     */
    private handleOnlineStatusChange;
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
     * Add an event listener
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
    /**
     * Emit an event to all registered listeners
     * @param event Event name
     * @param data Event data
     */
    private emitEvent;
    /**
     * Clean up resources when service is no longer needed
     */
    dispose(): void;
}
