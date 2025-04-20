/**
 * Status of a queued operation
 */
export declare enum QueuedItemStatus {
    PENDING = "pending",
    IN_PROGRESS = "in-progress",
    FAILED = "failed",
    COMPLETED = "completed"
}
/**
 * Represents an operation queued for offline synchronization
 */
export interface QueuedItem {
    /**
     * Unique identifier for this queued item
     */
    id: string;
    /**
     * Type of operation (e.g., 'create', 'update', 'delete')
     */
    operationType: string;
    /**
     * Related resource type (e.g., 'product', 'transaction')
     */
    resourceType: string;
    /**
     * Related resource identifier
     */
    resourceId?: string;
    /**
     * Data associated with the operation
     */
    data: any;
    /**
     * Options for the operation
     */
    options?: Record<string, any>;
    /**
     * Current status of the queued item
     */
    status: QueuedItemStatus;
    /**
     * Timestamp when the operation was queued
     */
    queuedAt: number;
    /**
     * Timestamp when the operation was last attempted
     */
    lastAttemptAt?: number;
    /**
     * Number of sync attempts made
     */
    attempts: number;
    /**
     * Error message from the last attempt
     */
    lastError?: string;
    /**
     * Priority of the operation (higher numbers = higher priority)
     */
    priority: number;
}
