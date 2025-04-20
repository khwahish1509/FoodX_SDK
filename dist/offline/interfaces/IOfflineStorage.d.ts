/**
 * Interface for storage providers used in offline mode
 */
export interface IOfflineStorage {
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
     * @returns The stored value, or null if not found
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
