"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumAdapter = void 0;
const Logger_1 = require("../../utils/Logger");
const ethers_1 = require("ethers");
/**
 * Adapter for Ethereum blockchain interactions
 */
class EthereumAdapter {
    /**
     * Create a new Ethereum adapter
     */
    constructor() {
        this._logger = new Logger_1.Logger('EthereumAdapter');
        this._contracts = new Map();
    }
    /**
     * Initialize the adapter with Ethereum configuration
     * @param config Ethereum configuration
     */
    async initialize(config) {
        this._logger.info('Initializing Ethereum adapter', { network: config.network });
        this._config = config;
        try {
            // Set up provider based on configuration
            if (config.providerUrl) {
                this._provider = new ethers_1.ethers.JsonRpcProvider(config.providerUrl);
            }
            else {
                // Use default provider for the specified network
                this._provider = ethers_1.ethers.getDefaultProvider(config.network, {
                    etherscan: config.apiKey
                });
            }
            // If a private key is provided, create a signer
            if (config.privateKey) {
                this._signer = new ethers_1.ethers.Wallet(config.privateKey, this._provider);
                this._logger.info('Signer created with provided private key');
            }
            // Test connection
            const blockNumber = await this._provider.getBlockNumber();
            this._logger.info('Connected to Ethereum network', { blockNumber });
        }
        catch (error) {
            this._logger.error('Failed to initialize Ethereum adapter', error);
            throw error;
        }
    }
    /**
     * Get or create a contract instance
     * @param contractName Contract name
     * @param abi Contract ABI
     * @param address Contract address
     */
    async getContract(contractName) {
        // Check if contract is already loaded
        if (this._contracts.has(contractName)) {
            return this._contracts.get(contractName);
        }
        // For a real implementation, we would load the ABI and address from a 
        // contract registry or configuration. This is a simplified version.
        this._logger.debug(`Loading contract: ${contractName}`);
        try {
            // In a real implementation, we would fetch the ABI and address
            // For now, we'll throw an error if the contract is not found
            throw new Error(`Contract "${contractName}" not found in registry`);
        }
        catch (error) {
            this._logger.error(`Failed to load contract "${contractName}"`, error);
            throw error;
        }
    }
    /**
     * Submit a transaction to the Ethereum network
     * @param contractName Name of the contract to call
     * @param functionName Name of the function to call
     * @param args Arguments to pass to the function
     * @param options Additional transaction options
     */
    async submitTransaction(contractName, functionName, args, options) {
        this._logger.debug(`Submitting transaction to ${contractName}.${functionName}`, { args });
        if (!this._signer) {
            throw new Error('No signer configured. Private key must be provided for transaction submission.');
        }
        try {
            // Get contract instance
            const contract = await this.getContract(contractName);
            // Prepare transaction options
            const txOptions = {};
            if (options?.gasLimit) {
                txOptions.gasLimit = options.gasLimit;
            }
            if (options?.gasPrice) {
                txOptions.gasPrice = ethers_1.ethers.parseUnits(options.gasPrice, 'gwei');
            }
            // Submit transaction
            this._logger.debug('Sending transaction');
            const tx = await contract[functionName](...args, txOptions);
            // Wait for confirmation if requested
            if (options?.waitForConfirmation !== false) {
                const confirmations = options?.confirmations || 1;
                this._logger.debug(`Waiting for ${confirmations} confirmation(s)`);
                const receipt = await tx.wait(confirmations);
                // Process the result
                return {
                    transactionId: tx.hash,
                    blockNumber: receipt.blockNumber,
                    timestamp: Date.now(),
                    success: true,
                    gasUsed: receipt.gasUsed ? Number(receipt.gasUsed) : undefined,
                    rawResponse: receipt
                };
            }
            // Return immediately without waiting for confirmation
            return {
                transactionId: tx.hash,
                success: true
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
     * Query the Ethereum blockchain without submitting a transaction
     * @param contractName Name of the contract to call
     * @param functionName Name of the function to call
     * @param args Arguments to pass to the function
     */
    async queryBlockchain(contractName, functionName, args) {
        this._logger.debug(`Querying ${contractName}.${functionName}`, { args });
        try {
            // Get contract instance
            const contract = await this.getContract(contractName);
            // Call the function (read-only)
            const result = await contract[functionName].staticCall(...args);
            return result;
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
        if (!this._provider) {
            throw new Error('Provider not initialized');
        }
        try {
            // Get transaction details
            const tx = await this._provider.getTransaction(transactionId);
            if (!tx) {
                throw new Error(`Transaction ${transactionId} not found`);
            }
            // Get receipt for additional information
            const receipt = await this._provider.getTransactionReceipt(transactionId);
            return {
                hash: tx.hash,
                blockNumber: tx.blockNumber,
                from: tx.from,
                to: tx.to,
                value: tx.value.toString(),
                gasLimit: tx.gasLimit.toString(),
                gasPrice: tx.gasPrice?.toString(),
                nonce: tx.nonce,
                data: tx.data,
                status: receipt?.status ? 'success' : 'failed',
                gasUsed: receipt?.gasUsed.toString(),
                logs: receipt?.logs
            };
        }
        catch (error) {
            this._logger.error(`Failed to get transaction ${transactionId}`, error);
            throw error;
        }
    }
    /**
     * Get current Ethereum network information
     */
    async getBlockchainInfo() {
        this._logger.debug('Getting Ethereum network information');
        if (!this._provider) {
            throw new Error('Provider not initialized');
        }
        try {
            // Get network information
            const network = await this._provider.getNetwork();
            // Get latest block
            const blockNumber = await this._provider.getBlockNumber();
            const block = await this._provider.getBlock(blockNumber);
            // Get gas price
            const gasPrice = await this._provider.getFeeData();
            return {
                network: {
                    name: network.name,
                    chainId: network.chainId.toString()
                },
                currentBlock: blockNumber,
                latestBlockTimestamp: block?.timestamp,
                gasPrice: gasPrice.gasPrice?.toString(),
                maxFeePerGas: gasPrice.maxFeePerGas?.toString(),
                maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas?.toString()
            };
        }
        catch (error) {
            this._logger.error('Failed to get Ethereum network information', error);
            throw error;
        }
    }
}
exports.EthereumAdapter = EthereumAdapter;
