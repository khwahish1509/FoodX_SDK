/**
 * Options for blockchain transactions
 */
export interface TransactionOptions {
    /**
     * Maximum gas to use for the transaction (Ethereum, Polygon)
     */
    gasLimit?: number;
    /**
     * Gas price in wei (Ethereum, Polygon)
     */
    gasPrice?: string;
    /**
     * Transaction timeout in milliseconds
     */
    timeout?: number;
    /**
     * Whether to wait for transaction confirmation
     */
    waitForConfirmation?: boolean;
    /**
     * Number of confirmations to wait for
     */
    confirmations?: number;
    /**
     * Transaction priority (high, medium, low)
     */
    priority?: 'high' | 'medium' | 'low';
    /**
     * Custom metadata to include with the transaction
     */
    metadata?: Record<string, any>;
    /**
     * Whether to submit the transaction to the offline queue if blockchain is unreachable
     */
    offlineQueueIfUnavailable?: boolean;
}
