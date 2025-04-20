import { TransactionOptions } from '../models/TransactionOptions';
import { TransactionResult } from '../models/TransactionResult';

/**
 * Interface for blockchain-specific adapters
 */
export interface IBlockchainAdapter {
  /**
   * Initialize the adapter with configuration
   * @param config Blockchain-specific configuration
   */
  initialize(config: any): Promise<void>;
  
  /**
   * Submit a transaction to the blockchain
   * @param contractName Name of the contract to call
   * @param functionName Name of the function to call
   * @param args Arguments to pass to the function
   * @param options Additional transaction options
   */
  submitTransaction(
    contractName: string,
    functionName: string,
    args: string[],
    options?: TransactionOptions
  ): Promise<TransactionResult>;
  
  /**
   * Query the blockchain without submitting a transaction
   * @param contractName Name of the contract to call
   * @param functionName Name of the function to call
   * @param args Arguments to pass to the function
   */
  queryBlockchain(
    contractName: string,
    functionName: string,
    args: string[]
  ): Promise<any>;
  
  /**
   * Get transaction details by ID
   * @param transactionId The ID of the transaction to retrieve
   */
  getTransaction(transactionId: string): Promise<any>;
  
  /**
   * Get current blockchain information
   */
  getBlockchainInfo(): Promise<any>;
} 