import { IOfflineService } from './interfaces/IOfflineService';
import { SyncOptions } from './models/SyncOptions';
import { SyncResult } from './models/SyncResult';
import { QueuedItem, QueuedItemStatus } from './models/QueuedItem';
import { OfflineConfig } from './models/OfflineConfig';
import { Logger } from '../utils/Logger';
import { IOfflineStorage } from './interfaces/IOfflineStorage';
import { IQueueManager } from './interfaces/IQueueManager';
import { IndexedDBStorage } from './adapters/IndexedDBStorage';
import { LocalQueueManager } from './adapters/LocalQueueManager';

// Type for event listeners
type EventListener = (data: any) => void;

/**
 * Service for managing offline capabilities
 */
export class OfflineService implements IOfflineService {
  private _logger: Logger;
  private _config: OfflineConfig | undefined;
  private _storage: IOfflineStorage;
  private _queueManager: IQueueManager;
  private _isOnline: boolean = true;
  private _syncInterval: NodeJS.Timeout | undefined;
  private _eventListeners: Map<string, Set<EventListener>>;
  
  /**
   * Create a new offline service
   */
  constructor() {
    this._logger = new Logger('OfflineService');
    this._eventListeners = new Map();
    
    // Initialize storage and queue manager with defaults
    // These will be properly configured during initialization
    this._storage = new IndexedDBStorage();
    this._queueManager = new LocalQueueManager();
    
    // Listen for online/offline events
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnlineStatusChange.bind(this, true));
      window.addEventListener('offline', this.handleOnlineStatusChange.bind(this, false));
    }
  }
  
  /**
   * Initialize the offline service
   */
  public async initialize(config?: OfflineConfig): Promise<void> {
    this._logger.info('Initializing offline service');
    
    // Set default configuration if not provided
    this._config = config || {
      enabled: true,
      syncInterval: 60000, // 1 minute
      maxSyncRetries: 3,
      conflictResolution: 'timestamp-based'
    };
    
    try {
      // Initialize storage
      await this._storage.initialize();
      
      // Initialize queue manager
      await this._queueManager.initialize(this._storage);
      
      // Start automatic sync if enabled
      if (this._config.enabled && this._config.syncInterval) {
        this.startAutoSync(this._config.syncInterval);
      }
      
      this._logger.info('Offline service initialized');
    } catch (error) {
      this._logger.error('Failed to initialize offline service', error);
      throw error;
    }
  }
  
  /**
   * Check if the service is currently online
   */
  public isOnline(): boolean {
    return this._isOnline;
  }
  
  /**
   * Start automatic sync at the specified interval
   * @param interval Sync interval in milliseconds
   */
  private startAutoSync(interval: number): void {
    this._logger.debug(`Starting automatic sync every ${interval}ms`);
    
    // Clear any existing interval
    if (this._syncInterval) {
      clearInterval(this._syncInterval);
    }
    
    // Set up new interval
    this._syncInterval = setInterval(() => {
      if (this._isOnline) {
        this.sync().catch(err => {
          this._logger.error('Auto-sync failed', err);
        });
      }
    }, interval);
  }
  
  /**
   * Handle online/offline status changes
   * @param online Whether the application is online
   */
  private handleOnlineStatusChange(online: boolean): void {
    this._logger.info(`Connection status changed: ${online ? 'online' : 'offline'}`);
    
    const previousStatus = this._isOnline;
    this._isOnline = online;
    
    // Emit event if status changed
    if (previousStatus !== online) {
      this.emitEvent(online ? 'online' : 'offline', { timestamp: Date.now() });
      
      // Trigger sync when coming back online
      if (online && this._config?.enabled) {
        this._logger.info('Back online, triggering sync');
        this.sync().catch(err => {
          this._logger.error('Sync after reconnect failed', err);
        });
      }
    }
  }
  
  /**
   * Manually trigger data synchronization
   * @param options Synchronization options
   */
  public async sync(options?: SyncOptions): Promise<SyncResult> {
    this._logger.info('Starting data synchronization', options);
    
    if (!this._config?.enabled) {
      return {
        success: false,
        error: 'Offline mode is disabled',
        timestamp: Date.now(),
        syncedItemCount: 0,
        conflictCount: 0,
        failedItemCount: 0,
        duration: 0,
        syncedTypes: []
      };
    }
    
    const startTime = Date.now();
    
    // Default result
    const result: SyncResult = {
      success: true,
      timestamp: Date.now(),
      syncedItemCount: 0,
      conflictCount: 0,
      failedItemCount: 0,
      duration: 0,
      syncedTypes: []
    };
    
    try {
      // Check if we're online
      if (!this._isOnline && !(options?.force)) {
        throw new Error('Cannot sync while offline');
      }
      
      // Get pending operations from the queue
      const pendingItems = await this._queueManager.getItems({
        status: QueuedItemStatus.PENDING
      });
      
      this._logger.debug(`Found ${pendingItems.length} pending operations to sync`);
      
      // Process items based on options
      let itemsToProcess = pendingItems;
      
      // Filter by type if specified
      if (options?.types && options.types.length > 0) {
        itemsToProcess = itemsToProcess.filter(item => 
          options.types!.includes(item.resourceType)
        );
      }
      
      // Process in batches if specified
      if (options?.batchSize && options.batchSize > 0) {
        itemsToProcess = itemsToProcess.slice(0, options.batchSize);
      }
      
      // Skip pushing changes if pull-only mode
      if (!options?.pullOnly && itemsToProcess.length > 0) {
        // In a real implementation, we would send pending changes to the server
        // and handle conflicts based on the conflict resolution strategy
        
        // For simplicity, we'll just mark all items as completed
        for (const item of itemsToProcess) {
          // Update the item status
          await this._queueManager.updateItem(item.id, {
            status: QueuedItemStatus.COMPLETED,
            lastAttemptAt: Date.now()
          });
          
          result.syncedItemCount++;
          
          // Add to synced types if not already included
          if (!result.syncedTypes.includes(item.resourceType)) {
            result.syncedTypes.push(item.resourceType);
          }
        }
      }
      
      // Skip pulling changes if push-only mode
      if (!options?.pushOnly) {
        // In a real implementation, we would fetch changes from the server
        // and merge them with local data based on the conflict resolution strategy
        
        // For now, we'll just log that this would happen
        this._logger.debug('Would fetch remote changes here in a real implementation');
      }
      
      // Calculate duration
      result.duration = Date.now() - startTime;
      
      // Emit sync event
      this.emitEvent('sync', result);
      
      this._logger.info('Sync completed successfully', {
        itemsProcessed: result.syncedItemCount,
        duration: result.duration
      });
      
      return result;
    } catch (error) {
      const errorMsg = (error as Error).message;
      this._logger.error('Sync failed', error);
      
      // Update result with error
      result.success = false;
      result.error = errorMsg;
      result.duration = Date.now() - startTime;
      
      return result;
    }
  }
  
  /**
   * Store data locally for offline use
   * @param key Unique identifier for the data
   * @param data Data to store
   * @param options Storage options (expiration, etc.)
   */
  public async storeData(key: string, data: any, options?: Record<string, any>): Promise<void> {
    this._logger.debug(`Storing data with key: ${key}`);
    
    try {
      // Add metadata to the stored data
      const storageData = {
        data,
        metadata: {
          timestamp: Date.now(),
          options
        }
      };
      
      // Store the data
      await this._storage.setItem(key, storageData);
      
      this._logger.debug(`Data stored successfully: ${key}`);
    } catch (error) {
      this._logger.error(`Failed to store data: ${key}`, error);
      throw error;
    }
  }
  
  /**
   * Retrieve data from local storage
   * @param key Unique identifier for the data
   */
  public async getData(key: string): Promise<any> {
    this._logger.debug(`Retrieving data with key: ${key}`);
    
    try {
      // Get the data with its metadata
      const storageData = await this._storage.getItem(key);
      
      // Return null if data doesn't exist
      if (!storageData) {
        return null;
      }
      
      // Check for expired data if expiration is set
      const metadata = storageData.metadata || {};
      if (metadata.options?.expiresIn) {
        const expirationTime = metadata.timestamp + metadata.options.expiresIn;
        
        if (Date.now() > expirationTime) {
          this._logger.debug(`Data expired: ${key}`);
          await this._storage.removeItem(key);
          return null;
        }
      }
      
      this._logger.debug(`Data retrieved successfully: ${key}`);
      return storageData.data;
    } catch (error) {
      this._logger.error(`Failed to retrieve data: ${key}`, error);
      throw error;
    }
  }
  
  /**
   * Add an operation to the offline queue
   * @param operation Operation details
   */
  public async queueOperation(operation: any): Promise<string> {
    this._logger.debug('Queueing operation', { type: operation.type });
    
    try {
      // Create a queue item
      const queueItem: Omit<QueuedItem, 'id'> = {
        operationType: operation.type,
        resourceType: operation.resourceType,
        resourceId: operation.resourceId,
        data: operation.data,
        options: operation.options,
        status: QueuedItemStatus.PENDING,
        queuedAt: Date.now(),
        attempts: 0,
        priority: operation.priority || 0
      };
      
      // Add to queue
      const id = await this._queueManager.addItem(queueItem);
      
      this._logger.debug('Operation queued successfully', { id });
      
      // Trigger sync if online
      if (this._isOnline && this._config?.enabled) {
        this.sync().catch(err => {
          this._logger.error('Auto-sync after queue failed', err);
        });
      }
      
      return id;
    } catch (error) {
      this._logger.error('Failed to queue operation', error);
      throw error;
    }
  }
  
  /**
   * Get all pending operations in the queue
   */
  public async getPendingOperations(): Promise<QueuedItem[]> {
    this._logger.debug('Getting pending operations');
    
    try {
      // Get all pending and in-progress items
      const items = await this._queueManager.getItems({
        status: [QueuedItemStatus.PENDING, QueuedItemStatus.IN_PROGRESS]
      });
      
      this._logger.debug(`Found ${items.length} pending operations`);
      return items;
    } catch (error) {
      this._logger.error('Failed to get pending operations', error);
      throw error;
    }
  }
  
  /**
   * Clear all pending operations from the queue
   */
  public async clearPendingOperations(): Promise<void> {
    this._logger.debug('Clearing pending operations');
    
    try {
      // Get all pending items
      const pendingItems = await this._queueManager.getItems({
        status: QueuedItemStatus.PENDING
      });
      
      // Delete each item
      for (const item of pendingItems) {
        await this._queueManager.removeItem(item.id);
      }
      
      this._logger.debug(`Cleared ${pendingItems.length} pending operations`);
    } catch (error) {
      this._logger.error('Failed to clear pending operations', error);
      throw error;
    }
  }
  
  /**
   * Add an event listener
   * @param event Event name
   * @param listener Callback function
   */
  public on(event: 'online' | 'offline' | 'sync', listener: (data: any) => void): void {
    if (!this._eventListeners.has(event)) {
      this._eventListeners.set(event, new Set());
    }
    
    this._eventListeners.get(event)!.add(listener);
  }
  
  /**
   * Remove an event listener
   * @param event Event name
   * @param listener Callback function
   */
  public off(event: 'online' | 'offline' | 'sync', listener: (data: any) => void): void {
    if (!this._eventListeners.has(event)) {
      return;
    }
    
    this._eventListeners.get(event)!.delete(listener);
  }
  
  /**
   * Emit an event to all registered listeners
   * @param event Event name
   * @param data Event data
   */
  private emitEvent(event: string, data: any): void {
    if (!this._eventListeners.has(event)) {
      return;
    }
    
    for (const listener of this._eventListeners.get(event)!) {
      try {
        listener(data);
      } catch (error) {
        this._logger.error(`Error in ${event} event listener`, error);
      }
    }
  }
  
  /**
   * Clean up resources when service is no longer needed
   */
  public dispose(): void {
    // Clear auto-sync interval
    if (this._syncInterval) {
      clearInterval(this._syncInterval);
    }
    
    // Remove event listeners
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.handleOnlineStatusChange.bind(this, true));
      window.removeEventListener('offline', this.handleOnlineStatusChange.bind(this, false));
    }
    
    // Clear all event listeners
    this._eventListeners.clear();
    
    this._logger.info('Offline service disposed');
  }
} 