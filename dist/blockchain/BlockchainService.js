"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainService = void 0;
const BlockchainConfig_1 = require("./models/BlockchainConfig");
const Logger_1 = require("../utils/Logger");
const EthereumAdapter_1 = require("./adapters/EthereumAdapter");
const HyperledgerFabricAdapter_1 = require("./adapters/HyperledgerFabricAdapter");
/**
 * Service for interacting with blockchain networks
 */
class BlockchainService {
    /**
     * Create a new blockchain service
     */
    constructor() {
        this._logger = new Logger_1.Logger('BlockchainService');
        this._adapters = new Map();
        // Register available blockchain adapters
        this.registerAdapter(BlockchainConfig_1.BlockchainType.ETHEREUM, new EthereumAdapter_1.EthereumAdapter());
        this.registerAdapter(BlockchainConfig_1.BlockchainType.HYPERLEDGER_FABRIC, new HyperledgerFabricAdapter_1.HyperledgerFabricAdapter());
        // Additional adapters would be registered here
    }
    /**
     * Initialize the blockchain service
     */
    async initialize() {
        this._logger.info('Initializing blockchain service');
        // The active adapter will be set when a specific blockchain is configured
        this._logger.info('Blockchain service initialized');
    }
    /**
     * Register a blockchain adapter
     * @param type Blockchain type
     * @param adapter Adapter implementation
     */
    registerAdapter(type, adapter) {
        this._adapters.set(type, adapter);
        this._logger.debug(`Registered blockchain adapter for ${type}`);
    }
    /**
     * Configure the service to use a specific blockchain
     * @param type Blockchain type
     * @param config Blockchain-specific configuration
     */
    async configure(type, config) {
        this._logger.info(`Configuring blockchain service for ${type}`);
        const adapter = this._adapters.get(type);
        if (!adapter) {
            throw new Error(`No adapter available for blockchain type: ${type}`);
        }
        // Initialize the adapter with its configuration
        await adapter.initialize(config);
        // Set as active adapter
        this._activeAdapter = adapter;
        this._logger.info(`Blockchain service configured for ${type}`);
    }
    /**
     * Submit a transaction to the blockchain
     * @param contractName Name of the contract to call
     * @param functionName Name of the function to call
     * @param args Arguments to pass to the function
     * @param options Additional transaction options
     */
    async submitTransaction(contractName, functionName, args, options) {
        this._logger.debug(`Submitting transaction to ${contractName}.${functionName}`, { args });
        this.ensureActiveAdapter();
        try {
            // Submit the transaction through the active adapter
            const result = await this._activeAdapter.submitTransaction(contractName, functionName, args, options);
            this._logger.debug('Transaction submitted successfully', { transactionId: result.transactionId });
            return result;
        }
        catch (error) {
            this._logger.error(`Failed to submit transaction to ${contractName}.${functionName}`, error);
            throw error;
        }
    }
    /**
     * Query the blockchain without submitting a transaction
     * @param contractName Name of the contract to call
     * @param functionName Name of the function to call
     * @param args Arguments to pass to the function
     */
    async queryBlockchain(contractName, functionName, args) {
        this._logger.debug(`Querying ${contractName}.${functionName}`, { args });
        this.ensureActiveAdapter();
        try {
            // Query through the active adapter
            const result = await this._activeAdapter.queryBlockchain(contractName, functionName, args);
            this._logger.debug('Query completed successfully');
            return result;
        }
        catch (error) {
            this._logger.error(`Failed to query ${contractName}.${functionName}`, error);
            throw error;
        }
    }
    /**
     * Get transaction details by ID
     * @param transactionId The ID of the transaction to retrieve
     */
    async getTransaction(transactionId) {
        this._logger.debug(`Getting transaction details for ${transactionId}`);
        this.ensureActiveAdapter();
        try {
            // Get transaction details through the active adapter
            const result = await this._activeAdapter.getTransaction(transactionId);
            this._logger.debug('Retrieved transaction details successfully');
            return result;
        }
        catch (error) {
            this._logger.error(`Failed to get transaction details for ${transactionId}`, error);
            throw error;
        }
    }
    /**
     * Get current blockchain information
     */
    async getBlockchainInfo() {
        this._logger.debug('Getting blockchain information');
        this.ensureActiveAdapter();
        try {
            // Get blockchain info through the active adapter
            const result = await this._activeAdapter.getBlockchainInfo();
            this._logger.debug('Retrieved blockchain information successfully');
            return result;
        }
        catch (error) {
            this._logger.error('Failed to get blockchain information', error);
            throw error;
        }
    }
    /**
     * Ensure an active adapter is set
     */
    ensureActiveAdapter() {
        if (!this._activeAdapter) {
            throw new Error('No active blockchain adapter configured. Call configure() first.');
        }
    }
}
exports.BlockchainService = BlockchainService;
