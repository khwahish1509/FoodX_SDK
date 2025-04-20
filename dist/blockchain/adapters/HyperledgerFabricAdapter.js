"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperledgerFabricAdapter = void 0;
const Logger_1 = require("../../utils/Logger");
const fabric_network_1 = require("fabric-network");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Adapter for Hyperledger Fabric blockchain interactions
 */
class HyperledgerFabricAdapter {
    /**
     * Create a new Hyperledger Fabric adapter
     */
    constructor() {
        this._logger = new Logger_1.Logger('HyperledgerFabricAdapter');
        this._contracts = new Map();
    }
    /**
     * Initialize the adapter with Hyperledger Fabric configuration
     * @param config Hyperledger Fabric configuration
     */
    async initialize(config) {
        this._logger.info('Initializing Hyperledger Fabric adapter', {
            channel: config.channel,
            organization: config.organization
        });
        this._config = config;
        try {
            // Create a new gateway instance for interacting with the fabric network
            this._gateway = new fabric_network_1.Gateway();
            // Create a new wallet for managing identities
            const wallet = await fabric_network_1.Wallets.newFileSystemWallet('./wallets');
            // Parse the connection profile
            let connectionProfile;
            if (typeof config.connectionProfile === 'string') {
                // Load the connection profile from file
                const profilePath = path.resolve(config.connectionProfile);
                const profileJson = fs.readFileSync(profilePath, 'utf8');
                connectionProfile = JSON.parse(profileJson);
            }
            else {
                // Use the provided object directly
                connectionProfile = config.connectionProfile;
            }
            // Connect to the gateway
            await this._gateway.connect(connectionProfile, {
                wallet,
                identity: config.userId,
                discovery: { enabled: true, asLocalhost: true } // For development only
            });
            // Get the network
            this._network = await this._gateway.getNetwork(config.channel);
            this._logger.info('Connected to Hyperledger Fabric network');
        }
        catch (error) {
            this._logger.error('Failed to initialize Hyperledger Fabric adapter', error);
            throw error;
        }
    }
    /**
     * Get or create a contract instance
     * @param contractName Contract name (chaincode name)
     */
    getContract(contractName) {
        // Check if contract is already loaded
        if (this._contracts.has(contractName)) {
            return this._contracts.get(contractName);
        }
        if (!this._network) {
            throw new Error('Network not initialized. Call initialize() first.');
        }
        // Get the contract from the network
        this._logger.debug(`Getting contract: ${contractName}`);
        const contract = this._network.getContract(contractName);
        // Cache the contract instance
        this._contracts.set(contractName, contract);
        return contract;
    }
    /**
     * Submit a transaction to the Hyperledger Fabric network
     * @param contractName Name of the contract (chaincode) to call
     * @param functionName Name of the function to call
     * @param args Arguments to pass to the function
     * @param options Additional transaction options
     */
    async submitTransaction(contractName, functionName, args, options) {
        this._logger.debug(`Submitting transaction to ${contractName}.${functionName}`, { args });
        try {
            // Get the contract
            const contract = this.getContract(contractName);
            // Create a transaction
            let transaction = contract.createTransaction(functionName);
            // Set transaction options
            if (options?.timeout) {
                transaction.setEndorsingTimeout(options.timeout);
                transaction.setCommitTimeout(options.timeout);
            }
            // Submit the transaction
            this._logger.debug('Sending transaction');
            const result = await transaction.submit(...args);
            // Process the result
            return {
                transactionId: transaction.getTransactionId(),
                success: true,
                result: result.toString(),
                timestamp: Date.now()
            };
        }
        catch (error) {
            this._logger.error(`Transaction to ${contractName}.${functionName} failed`, error);
            return {
                transactionId: '',
                success: false,
                error: error.message
            };
        }
    }
    /**
     * Query the Hyperledger Fabric blockchain without submitting a transaction
     * @param contractName Name of the contract (chaincode) to call
     * @param functionName Name of the function to call
     * @param args Arguments to pass to the function
     */
    async queryBlockchain(contractName, functionName, args) {
        this._logger.debug(`Querying ${contractName}.${functionName}`, { args });
        try {
            // Get the contract
            const contract = this.getContract(contractName);
            // Evaluate the transaction (query)
            const result = await contract.evaluateTransaction(functionName, ...args);
            // Convert Buffer to string and parse JSON if possible
            const resultStr = result.toString();
            try {
                return JSON.parse(resultStr);
            }
            catch {
                return resultStr;
            }
        }
        catch (error) {
            this._logger.error(`Query to ${contractName}.${functionName} failed`, error);
            throw error;
        }
    }
    /**
     * Get transaction details by ID
     * @param transactionId The ID of the transaction to retrieve
     */
    async getTransaction(transactionId) {
        this._logger.debug(`Getting transaction details for ${transactionId}`);
        if (!this._network) {
            throw new Error('Network not initialized');
        }
        try {
            // This would normally use the Fabric SDK to get transaction details
            // For simplicity, we'll just return a placeholder
            // In a real implementation, we would use the Network object to get a specific channel,
            // then use the channel's queryTransaction method to get transaction details
            return {
                id: transactionId,
                status: 'VALID',
                blockNumber: 0,
                timestamp: Date.now(),
                // Additional fields would be included in a real implementation
            };
        }
        catch (error) {
            this._logger.error(`Failed to get transaction ${transactionId}`, error);
            throw error;
        }
    }
    /**
     * Get current Hyperledger Fabric network information
     */
    async getBlockchainInfo() {
        this._logger.debug('Getting Hyperledger Fabric network information');
        if (!this._network || !this._config) {
            throw new Error('Network not initialized');
        }
        try {
            // This would normally use the Fabric SDK to get blockchain info
            // For simplicity, we'll just return configuration details
            return {
                channel: this._config.channel,
                organization: this._config.organization,
                user: this._config.userId,
                // Additional fields would be included in a real implementation
            };
        }
        catch (error) {
            this._logger.error('Failed to get Hyperledger Fabric network information', error);
            throw error;
        }
    }
    /**
     * Disconnect from the Hyperledger Fabric network
     */
    disconnect() {
        if (this._gateway) {
            this._gateway.disconnect();
            this._logger.info('Disconnected from Hyperledger Fabric network');
        }
    }
}
exports.HyperledgerFabricAdapter = HyperledgerFabricAdapter;
