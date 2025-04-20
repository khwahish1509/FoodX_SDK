import { IOfflineStorage } from '../interfaces/IOfflineStorage';
/**
 * Storage adapter using IndexedDB (for browser environments)
 */
export declare class IndexedDBStorage implements IOfflineStorage {
    private _logger;
    private _prefix;
    /**
     * Create a new IndexedDB storage adapter
     * @param prefix Optional prefix for all keys
     */
    constructor(prefix?: string);
    /**
     * Initialize the storage
     */
    initialize(): Promise<void>;
    /**
     * Store a value with the given key
     * @param key The key to store the value under
     * @param value The value to store
     */
    setItem(key: string, value: any): Promise<void>;
    /**
     * Retrieve a value by key
     * @param key The key to retrieve
     */
    getItem(key: string): Promise<any>;
    /**
     * Remove a value by key
     * @param key The key to remove
     */
    removeItem(key: string): Promise<void>;
    /**
     * Get all keys in the storage
     */
    getAllKeys(): Promise<string[]>;
    /**
     * Clear all data from the storage
     */
    clear(): Promise<void>;
}
