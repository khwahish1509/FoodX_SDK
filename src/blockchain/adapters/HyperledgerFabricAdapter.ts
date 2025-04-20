import { IBlockchainAdapter } from '../interfaces/IBlockchainAdapter';
import { TransactionOptions } from '../models/TransactionOptions';
import { TransactionResult } from '../models/TransactionResult';
import { HyperledgerFabricConfig } from '../models/BlockchainConfig';
import { Logger } from '../../utils/Logger';
import { Gateway, Wallets, Network, Contract } from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Adapter for Hyperledger Fabric blockchain interactions
 */
export class HyperledgerFabricAdapter implements IBlockchainAdapter {
  private _logger: Logger;
  private _gateway: Gateway | undefined;
  private _network: Network | undefined;
  private _contracts: Map<string, Contract>;
  private _config: HyperledgerFabricConfig | undefined;
  
  /**
   * Create a new Hyperledger Fabric adapter
   */
  constructor() {
    this._logger = new Logger('HyperledgerFabricAdapter');
    this._contracts = new Map<string, Contract>();
  }
  
  /**
   * Initialize the adapter with Hyperledger Fabric configuration
   * @param config Hyperledger Fabric configuration
   */
  public async initialize(config: HyperledgerFabricConfig): Promise<void> {
    this._logger.info('Initializing Hyperledger Fabric adapter', { 
      channel: config.channel, 
      organization: config.organization 
    });
    
    this._config = config;
    
    try {
      // Create a new gateway instance for interacting with the fabric network
      this._gateway = new Gateway();
      
      // Create a new wallet for managing identities
      const wallet = await Wallets.newFileSystemWallet('./wallets');
      
      // Parse the connection profile
      let connectionProfile;
      if (typeof config.connectionProfile === 'string') {
        // Load the connection profile from file
        const profilePath = path.resolve(config.connectionProfile);
        const profileJson = fs.readFileSync(profilePath, 'utf8');
        connectionProfile = JSON.parse(profileJson);
      } else {
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
      
    } catch (error) {
      this._logger.error('Failed to initialize Hyperledger Fabric adapter', error);
      throw error;
    }
  }
  
  /**
   * Get or create a contract instance
   * @param contractName Contract name (chaincode name)
   */
  private getContract(contractName: string): Contract {
    // Check if contract is already loaded
    if (this._contracts.has(contractName)) {
      return this._contracts.get(contractName)!;
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
  public async submitTransaction(
    contractName: string,
    functionName: string,
    args: string[],
    options?: TransactionOptions
  ): Promise<TransactionResult> {
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
      
    } catch (error) {
      this._logger.error(`Transaction to ${contractName}.${functionName} failed`, error);
      
      return {
        transactionId: '', // In a real implementation, we might have a tx ID even for failed transactions
        success: false,
        error: (error as Error).message
      };
    }
  }
  
  /**
   * Query the Hyperledger Fabric blockchain without submitting a transaction
   * @param contractName Name of the contract (chaincode) to call
   * @param functionName Name of the function to call
   * @param args Arguments to pass to the function
   */
  public async queryBlockchain(
    contractName: string,
    functionName: string,
    args: string[]
  ): Promise<any> {
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
      } catch {
        return resultStr;
      }
      
    } catch (error) {
      this._logger.error(`Query to ${contractName}.${functionName} failed`, error);
      throw error;
    }
  }
  
  /**
   * Get transaction details by ID
   * @param transactionId The ID of the transaction to retrieve
   */
  public async getTransaction(transactionId: string): Promise<any> {
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
        status: 'VALID', // or 'INVALID'
        blockNumber: 0, // placeholder
        timestamp: Date.now(),
        // Additional fields would be included in a real implementation
      };
      
    } catch (error) {
      this._logger.error(`Failed to get transaction ${transactionId}`, error);
      throw error;
    }
  }
  
  /**
   * Get current Hyperledger Fabric network information
   */
  public async getBlockchainInfo(): Promise<any> {
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
      
    } catch (error) {
      this._logger.error('Failed to get Hyperledger Fabric network information', error);
      throw error;
    }
  }
  
  /**
   * Disconnect from the Hyperledger Fabric network
   */
  public disconnect(): void {
    if (this._gateway) {
      this._gateway.disconnect();
      this._logger.info('Disconnected from Hyperledger Fabric network');
    }
  }
} 