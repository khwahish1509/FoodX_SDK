/**
 * Results of data synchronization
 */
export interface SyncResult {
    /**
     * Whether the sync was successful
     */
    success: boolean;
    /**
     * Error message if sync failed
     */
    error?: string;
    /**
     * Timestamp when sync completed
     */
    timestamp: number;
    /**
     * Number of items synced
     */
    syncedItemCount: number;
    /**
     * Number of conflicts encountered
     */
    conflictCount: number;
    /**
     * Number of items that failed to sync
     */
    failedItemCount: number;
    /**
     * Duration of the sync operation in milliseconds
     */
    duration: number;
    /**
     * Types of data that were synced
     */
    syncedTypes: string[];
    /**
     * Details of conflicts that were resolved
     */
    resolvedConflicts?: Array<{
        id: string;
        type: string;
        resolution: 'client-wins' | 'server-wins' | 'merged' | 'manual';
    }>;
}
