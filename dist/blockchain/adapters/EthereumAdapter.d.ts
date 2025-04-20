import { IBlockchainAdapter } from '../interfaces/IBlockchainAdapter';
import { TransactionOptions } from '../models/TransactionOptions';
import { TransactionResult } from '../models/TransactionResult';
import { EthereumConfig } from '../models/BlockchainConfig';
/**
 * Adapter for Ethereum blockchain interactions
 */
export declare class EthereumAdapter implements IBlockchainAdapter {
    private _logger;
    private _provider;
    private _signer;
    private _contracts;
    private _config;
    /**
     * Create a new Ethereum adapter
     */
    constructor();
    /**
     * Initialize the adapter with Ethereum configuration
     * @param config Ethereum configuration
     */
    initialize(config: EthereumConfig): Promise<void>;
    /**
     * Get or create a contract instance
     * @param contractName Contract name
     * @param abi Contract ABI
     * @param address Contract address
     */
    private getContract;
    /**
     * Submit a transaction to the Ethereum network
     * @param contractName Name of the contract to call
     * @param functionName Name of the function to call
     * @param args Arguments to pass to the function
     * @param options Additional transaction options
     */
    submitTransaction(contractName: string, functionName: string, args: string[], options?: TransactionOptions): Promise<TransactionResult>;
    /**
     * Query the Ethereum blockchain without submitting a transaction
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
     * Get current Ethereum network information
     */
    getBlockchainInfo(): Promise<any>;
}
