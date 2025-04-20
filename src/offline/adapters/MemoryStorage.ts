import { IOfflineStorage } from '../interfaces/IOfflineStorage';
import { Logger } from '../../utils/Logger';

/**
 * Simple in-memory storage for testing in Node.js environments
 */
export class MemoryStorage implements IOfflineStorage {
  private _logger: Logger;
  private _storage: Map<string, any>;
  
  /**
   * Create a new memory storage adapter
   */
  constructor() {
    this._logger = new Logger('MemoryStorage');
    this._storage = new Map<string, any>();
  }
  
  /**
   * Initialize the storage
   */
  public async initialize(): Promise<void> {
    this._logger.info('Initializing memory storage');
    // Nothing special to initialize for in-memory storage
  }
  
  /**
   * Store a value with the given key
   * @param key The key to store the value under
   * @param value The value to store
   */
  public async setItem(key: string, value: any): Promise<void> {
    this._logger.debug(`Setting item: ${key}`);
    this._storage.set(key, JSON.parse(JSON.stringify(value))); // Deep copy
  }
  
  /**
   * Retrieve a value by key
   * @param key The key to retrieve
   */
  public async getItem(key: string): Promise<any> {
    this._logger.debug(`Getting item: ${key}`);
    const value = this._storage.get(key);
    return value ? JSON.parse(JSON.stringify(value)) : null; // Deep copy
  }
  
  /**
   * Remove a value by key
   * @param key The key to remove
   */
  public async removeItem(key: string): Promise<void> {
    this._logger.debug(`Removing item: ${key}`);
    this._storage.delete(key);
  }
  
  /**
   * Get all keys in the storage
   */
  public async getAllKeys(): Promise<string[]> {
    this._logger.debug('Getting all keys');
    return Array.from(this._storage.keys());
  }
  
  /**
   * Clear all data from the storage
   */
  public async clear(): Promise<void> {
    this._logger.debug('Clearing all data');
    this._storage.clear();
  }
} 