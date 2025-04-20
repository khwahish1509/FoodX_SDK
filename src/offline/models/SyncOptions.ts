/**
 * Options for data synchronization
 */
export interface SyncOptions {
  /**
   * Types of data to sync (e.g., 'transactions', 'products', 'users')
   */
  types?: string[];
  
  /**
   * Maximum number of items to sync per request
   */
  batchSize?: number;
  
  /**
   * Whether to force sync even if there are conflicts
   */
  force?: boolean;
  
  /**
   * Timeout for sync operations in milliseconds
   */
  timeout?: number;
  
  /**
   * Conflict resolution strategy to use for this sync
   * (overrides the default strategy from OfflineConfig)
   */
  conflictResolution?: 'client-wins' | 'server-wins' | 'timestamp-based' | 'custom';
  
  /**
   * Whether to sync only pending changes (not fetch server changes)
   */
  pushOnly?: boolean;
  
  /**
   * Whether to fetch only server changes (not push pending changes)
   */
  pullOnly?: boolean;
} 