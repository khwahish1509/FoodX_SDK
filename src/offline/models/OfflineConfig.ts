/**
 * Configuration for offline capabilities
 */
export interface OfflineConfig {
  /**
   * Whether offline capabilities are enabled
   */
  enabled: boolean;
  
  /**
   * Interval in milliseconds for automatic synchronization
   */
  syncInterval?: number;
  
  /**
   * Maximum number of sync retries
   */
  maxSyncRetries?: number;
  
  /**
   * Conflict resolution strategy
   */
  conflictResolution?: 'client-wins' | 'server-wins' | 'timestamp-based' | 'custom';
  
  /**
   * Custom conflict resolution handler
   */
  conflictResolver?: (clientData: any, serverData: any) => any;
  
  /**
   * Maximum size in bytes for the offline storage
   */
  maxStorageSize?: number;
  
  /**
   * Data retention policy in days
   */
  dataRetention?: number;
  
  /**
   * Whether to persist sensitive data offline
   */
  persistSensitiveData?: boolean;
  
  /**
   * Custom encryption key for offline data
   */
  encryptionKey?: string;
} 