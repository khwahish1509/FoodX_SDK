import { IQueueManager, QueueItemFilter } from '../interfaces/IQueueManager';
import { QueuedItem, QueuedItemStatus } from '../models/QueuedItem';
import { IOfflineStorage } from '../interfaces/IOfflineStorage';
import { Logger } from '../../utils/Logger';
import { v4 as uuidv4 } from 'uuid';

/**
 * Manages operation queues in the offline storage
 */
export class LocalQueueManager implements IQueueManager {
  private _logger: Logger;
  private _storage: IOfflineStorage | undefined;
  private _queueKeyPrefix: string;
  
  /**
   * Create a new queue manager
   * @param queueKeyPrefix Key prefix for queue items in storage
   */
  constructor(queueKeyPrefix: string = 'queue:') {
    this._logger = new Logger('LocalQueueManager');
    this._queueKeyPrefix = queueKeyPrefix;
  }
  
  /**
   * Initialize the queue manager
   * @param storage Storage to use for persistence
   */
  public async initialize(storage: IOfflineStorage): Promise<void> {
    this._logger.info('Initializing queue manager');
    this._storage = storage;
  }
  
  /**
   * Add an item to the queue
   * @param item Item to add
   * @returns Unique ID of the added item
   */
  public async addItem(item: Omit<QueuedItem, 'id'>): Promise<string> {
    this.ensureInitialized();
    this._logger.debug('Adding item to queue', { type: item.operationType });
    
    // Generate a unique ID
    const id = uuidv4();
    
    // Create full item with ID
    const queuedItem: QueuedItem = {
      id,
      ...item
    };
    
    // Store in the offline storage
    await this._storage!.setItem(this.getItemKey(id), queuedItem);
    
    this._logger.debug(`Item added to queue with ID: ${id}`);
    return id;
  }
  
  /**
   * Update an existing item
   * @param id Item ID
   * @param updates Partial updates to apply
   */
  public async updateItem(id: string, updates: Partial<QueuedItem>): Promise<void> {
    this.ensureInitialized();
    this._logger.debug(`Updating queue item: ${id}`);
    
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
    
    // Save back to storage
    await this._storage!.setItem(this.getItemKey(id), updatedItem);
    
    this._logger.debug(`Queue item updated: ${id}`);
  }
  
  /**
   * Get an item by ID
   * @param id Item ID
   */
  public async getItem(id: string): Promise<QueuedItem | null> {
    this.ensureInitialized();
    this._logger.debug(`Getting queue item: ${id}`);
    
    // Retrieve from storage
    const item = await this._storage!.getItem(this.getItemKey(id));
    
    return item || null;
  }
  
  /**
   * Get items matching the filter
   * @param filter Filter options
   */
  public async getItems(filter?: QueueItemFilter): Promise<QueuedItem[]> {
    this.ensureInitialized();
    this._logger.debug('Getting queue items with filter', filter);
    
    // Get all keys that match our prefix
    const allKeys = await this._storage!.getAllKeys();
    const queueKeys = allKeys.filter(key => key.startsWith(this._queueKeyPrefix));
    
    // Get all items
    const items: QueuedItem[] = [];
    for (const key of queueKeys) {
      const item = await this._storage!.getItem(key);
      if (item) {
        items.push(item);
      }
    }
    
    // Apply filters if provided
    let filteredItems = items;
    
    if (filter) {
      filteredItems = items.filter(item => {
        // Filter by status
        if (filter.status) {
          if (Array.isArray(filter.status)) {
            if (!filter.status.includes(item.status)) {
              return false;
            }
          } else if (item.status !== filter.status) {
            return false;
          }
        }
        
        // Filter by resource type
        if (filter.resourceType && item.resourceType !== filter.resourceType) {
          return false;
        }
        
        // Filter by resource ID
        if (filter.resourceId && item.resourceId !== filter.resourceId) {
          return false;
        }
        
        // Filter by operation type
        if (filter.operationType && item.operationType !== filter.operationType) {
          return false;
        }
        
        return true;
      });
      
      // Apply sorting
      if (filter.sortBy) {
        filteredItems.sort((a, b) => {
          const sortField = filter.sortBy!;
          const aValue = a[sortField];
          const bValue = b[sortField];
          
          if (filter.sortDirection === 'desc') {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          } else {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          }
        });
      }
      
      // Apply limit
      if (filter.limit && filter.limit > 0) {
        filteredItems = filteredItems.slice(0, filter.limit);
      }
    }
    
    return filteredItems;
  }
  
  /**
   * Remove an item from the queue
   * @param id Item ID
   */
  public async removeItem(id: string): Promise<void> {
    this.ensureInitialized();
    this._logger.debug(`Removing queue item: ${id}`);
    
    // Remove from storage
    await this._storage!.removeItem(this.getItemKey(id));
  }
  
  /**
   * Clear all items from the queue
   */
  public async clearAll(): Promise<void> {
    this.ensureInitialized();
    this._logger.debug('Clearing all queue items');
    
    // Get all keys that match our prefix
    const allKeys = await this._storage!.getAllKeys();
    const queueKeys = allKeys.filter(key => key.startsWith(this._queueKeyPrefix));
    
    // Remove each item
    for (const key of queueKeys) {
      await this._storage!.removeItem(key);
    }
    
    this._logger.debug(`Cleared ${queueKeys.length} queue items`);
  }
  
  /**
   * Get the storage key for an item
   * @param id Item ID
   */
  private getItemKey(id: string): string {
    return `${this._queueKeyPrefix}${id}`;
  }
  
  /**
   * Ensure the manager is initialized
   */
  private ensureInitialized(): void {
    if (!this._storage) {
      throw new Error('Queue manager not initialized. Call initialize() first.');
    }
  }
} 