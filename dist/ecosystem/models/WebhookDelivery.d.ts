/**
 * Status of a webhook delivery
 */
export declare enum WebhookDeliveryStatus {
    SUCCESS = "success",
    FAILED = "failed",
    PENDING = "pending",
    RETRYING = "retrying"
}
/**
 * Represents a webhook delivery attempt
 */
export interface WebhookDelivery {
    /**
     * Unique delivery identifier
     */
    id: string;
    /**
     * ID of the webhook
     */
    webhookId: string;
    /**
     * Type of event that triggered the webhook
     */
    eventType: string;
    /**
     * Current delivery status
     */
    status: WebhookDeliveryStatus;
    /**
     * When the event was triggered
     */
    triggeredAt: number;
    /**
     * When the delivery was attempted
     */
    deliveredAt?: number;
    /**
     * HTTP request that was sent
     */
    request: {
        /**
         * URL the webhook was sent to
         */
        url: string;
        /**
         * HTTP method used
         */
        method: string;
        /**
         * HTTP headers sent
         */
        headers: Record<string, string>;
        /**
         * Request body (payload)
         */
        body: string;
    };
    /**
     * HTTP response received
     */
    response?: {
        /**
         * HTTP status code
         */
        statusCode: number;
        /**
         * Response headers
         */
        headers: Record<string, string>;
        /**
         * Response body
         */
        body?: string;
    };
    /**
     * Error information if delivery failed
     */
    error?: {
        /**
         * Error message
         */
        message: string;
        /**
         * Error code
         */
        code?: string;
        /**
         * Error stack trace
         */
        stack?: string;
    };
    /**
     * Number of delivery attempts made
     */
    attempts: number;
    /**
     * Next retry time if status is RETRYING
     */
    nextRetryAt?: number;
}
