import { IBlockchainService } from './interfaces/IBlockchainService';
import { BlockchainType } from './models/BlockchainConfig';
import { TransactionOptions } from './models/TransactionOptions';
import { TransactionResult } from './models/TransactionResult';
/**
 * Service for interacting with blockchain networks
 */
export declare class BlockchainService implements IBlockchainService {
    private _logger;
    private _adapters;
    private _activeAdapter;
    /**
     * Create a new blockchain service
     */
    constructor();
    /**
     * Initialize the blockchain service
     */
    initialize(): Promise<void>;
    /**
     * Register a blockchain adapter
     * @param type Blockchain type
     * @param adapter Adapter implementation
     */
    private registerAdapter;
    /**
     * Configure the service to use a specific blockchain
     * @param type Blockchain type
     * @param config Blockchain-specific configuration
     */
    configure(type: BlockchainType, config: any): Promise<void>;
    /**
     * Submit a transaction to the blockchain
     * @param contractName Name of the contract to call
     * @param functionName Name of the function to call
     * @param args Arguments to pass to the function
     * @param options Additional transaction options
     */
    submitTransaction(contractName: string, functionName: string, args: string[], options?: TransactionOptions): Promise<TransactionResult>;
    /**
     * Query the blockchain without submitting a transaction
     * @param contractName Name of the contract to call
     * @param functionName Name of the function to call
     * @param args Arguments to pass to the function
     */
    queryBlockchain(contractName: string, functionName: string, args: string[]): Promise<any>;
    /**
     * Get transaction details by ID
     * @param transactionId The ID of the transaction to retrieve
     */
    getTransaction(transactionId: string): Promise<any>;
    /**
     * Get current blockchain information
     */
    getBlockchainInfo(): Promise<any>;
    /**
     * Ensure an active adapter is set
     */
    private ensureActiveAdapter;
}
