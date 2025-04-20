import { IOfflineStorage } from '../interfaces/IOfflineStorage';
import { Logger } from '../../utils/Logger';
import { get, set, del, clear, keys } from 'idb-keyval';

/**
 * Storage adapter using IndexedDB (for browser environments)
 */
export class IndexedDBStorage implements IOfflineStorage {
  private _logger: Logger;
  private _prefix: string;
  
  /**
   * Create a new IndexedDB storage adapter
   * @param prefix Optional prefix for all keys
   */
  constructor(prefix: string = 'foodx:') {
    this._logger = new Logger('IndexedDBStorage');
    this._prefix = prefix;
  }
  
  /**
   * Initialize the storage
   */
  public async initialize(): Promise<void> {
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
  public async setItem(key: string, value: any): Promise<void> {
    this._logger.debug(`Setting item: ${key}`);
    
    const prefixedKey = this._prefix + key;
    
    try {
      await set(prefixedKey, value);
    } catch (error) {
      this._logger.error(`Failed to set item: ${key}`, error);
      throw error;
    }
  }
  
  /**
   * Retrieve a value by key
   * @param key The key to retrieve
   */
  public async getItem(key: string): Promise<any> {
    this._logger.debug(`Getting item: ${key}`);
    
    const prefixedKey = this._prefix + key;
    
    try {
      return await get(prefixedKey);
    } catch (error) {
      this._logger.error(`Failed to get item: ${key}`, error);
      throw error;
    }
  }
  
  /**
   * Remove a value by key
   * @param key The key to remove
   */
  public async removeItem(key: string): Promise<void> {
    this._logger.debug(`Removing item: ${key}`);
    
    const prefixedKey = this._prefix + key;
    
    try {
      await del(prefixedKey);
    } catch (error) {
      this._logger.error(`Failed to remove item: ${key}`, error);
      throw error;
    }
  }
  
  /**
   * Get all keys in the storage
   */
  public async getAllKeys(): Promise<string[]> {
    this._logger.debug('Getting all keys');
    
    try {
      const allKeys = await keys();
      
      // Filter keys by prefix and remove the prefix
      return allKeys
        .filter(key => typeof key === 'string' && key.startsWith(this._prefix))
        .map(key => (key as string).substring(this._prefix.length));
    } catch (error) {
      this._logger.error('Failed to get all keys', error);
      throw error;
    }
  }
  
  /**
   * Clear all data from the storage
   */
  public async clear(): Promise<void> {
    this._logger.debug('Clearing all data');
    
    try {
      // Get all keys first
      const allKeys = await keys();
      
      // Delete only keys with our prefix
      const prefixedKeys = allKeys.filter(key => 
        typeof key === 'string' && key.startsWith(this._prefix)
      );
      
      // Delete each key
      for (const key of prefixedKeys) {
        await del(key);
      }
      
      this._logger.debug(`Cleared ${prefixedKeys.length} items`);
    } catch (error) {
      this._logger.error('Failed to clear storage', error);
      throw error;
    }
  }
} 