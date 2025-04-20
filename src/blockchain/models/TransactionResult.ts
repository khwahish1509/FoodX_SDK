/**
 * Result of a blockchain transaction
 */
export interface TransactionResult {
  /**
   * Transaction ID/hash
   */
  transactionId: string;
  
  /**
   * Block number where the transaction was included
   */
  blockNumber?: number;
  
  /**
   * Timestamp when the transaction was confirmed
   */
  timestamp?: number;
  
  /**
   * Whether the transaction was successful
   */
  success: boolean;
  
  /**
   * Error message if the transaction failed
   */
  error?: string;
  
  /**
   * Gas used by the transaction (Ethereum, Polygon)
   */
  gasUsed?: number;
  
  /**
   * Transaction result/return value
   */
  result?: any;
  
  /**
   * Raw transaction response from the blockchain
   */
  rawResponse?: any;
} 