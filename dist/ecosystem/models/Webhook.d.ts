/**
 * Status of a webhook
 */
export declare enum WebhookStatus {
    ACTIVE = "active",
    PAUSED = "paused",
    ERROR = "error"
}
/**
 * Event types that can trigger webhooks
 */
export declare enum WebhookEventType {
    PRODUCT_CREATED = "product.created",
    PRODUCT_UPDATED = "product.updated",
    TRANSACTION_CREATED = "transaction.created",
    TRANSACTION_CONFIRMED = "transaction.confirmed",
    TRANSACTION_FAILED = "transaction.failed",
    USER_CREATED = "user.created",
    USER_UPDATED = "user.updated",
    API_KEY_CREATED = "api-key.created",
    API_KEY_REVOKED = "api-key.revoked",
    DATA_SYNCHRONIZED = "data.synchronized",
    COMPLIANCE_ALERT = "compliance.alert"
}
/**
 * Webhook definition
 */
export interface Webhook {
    /**
     * Unique webhook identifier
     */
    id: string;
    /**
     * Human-readable name
     */
    name: string;
    /**
     * URL to deliver the webhook to
     */
    url: string;
    /**
     * Event types this webhook subscribes to
     */
    events: WebhookEventType[];
    /**
     * Current status
     */
    status: WebhookStatus;
    /**
     * Whether to include the full resource in the webhook payload
     */
    includeResource: boolean;
    /**
     * Secret used to sign webhook payloads
     */
    secret?: string;
    /**
     * When the webhook was created
     */
    createdAt: number;
    /**
     * User who created the webhook
     */
    createdBy: string;
    /**
     * Custom HTTP headers to include with webhook requests
     */
    headers?: Record<string, string>;
    /**
     * Filter for which events should trigger this webhook
     */
    filter?: Record<string, any>;
    /**
     * Retry configuration
     */
    retry?: {
        /**
         * Maximum number of retry attempts
         */
        maxAttempts: number;
        /**
         * Retry delay strategy ('fixed', 'exponential')
         */
        strategy: 'fixed' | 'exponential';
        /**
         * Base delay in seconds
         */
        baseDelay: number;
    };
}
