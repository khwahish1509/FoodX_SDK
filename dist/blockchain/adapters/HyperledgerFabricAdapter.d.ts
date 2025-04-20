import { IBlockchainAdapter } from '../interfaces/IBlockchainAdapter';
import { TransactionOptions } from '../models/TransactionOptions';
import { TransactionResult } from '../models/TransactionResult';
import { HyperledgerFabricConfig } from '../models/BlockchainConfig';
/**
 * Adapter for Hyperledger Fabric blockchain networks
 */
export declare class HyperledgerFabricAdapter implements IBlockchainAdapter {
    private _logger;
    private _gateway;
    private _network;
    private _contracts;
    private _config;
    /**
     * Create a new Hyperledger Fabric adapter
     */
    constructor();
    /**
     * Initialize the adapter with configuration
     * @param config Hyperledger Fabric configuration
     */
    initialize(config: HyperledgerFabricConfig): Promise<void>;
    /**
     * Get a contract instance by name
     * @param contractName Name of the contract
     */
    private getContract;
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
     * Disconnect from the Fabric network
     */
    disconnect(): void;
}
