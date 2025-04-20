import { IClient, ClientConfig } from './interfaces/IClient';
import { IBlockchainService } from '../blockchain/interfaces/IBlockchainService';
import { IOfflineService } from '../offline/interfaces/IOfflineService';
import { IEnterpriseService } from '../enterprise/interfaces/IEnterpriseService';
import { IComplianceService } from '../compliance/interfaces/IComplianceService';
import { IEcosystemService } from '../ecosystem/interfaces/IEcosystemService';

import { BlockchainService } from '../blockchain/BlockchainService';
import { OfflineService } from '../offline/OfflineService';
import { EnterpriseService } from '../enterprise/EnterpriseService';
import { ComplianceService } from '../compliance/ComplianceService';
import { EcosystemService } from '../ecosystem/EcosystemService';

import { Logger } from '../utils/Logger';

/**
 * Main client for the FoodX SDK
 */
export class FoodXClient implements IClient {
  private _config: ClientConfig | undefined;
  private _logger: Logger;
  
  private _blockchainService: IBlockchainService;
  private _offlineService: IOfflineService;
  private _enterpriseService: IEnterpriseService;
  private _complianceService: IComplianceService;
  private _ecosystemService: IEcosystemService;
  
  /**
   * Creates a new FoodX SDK client
   * @param config Optional client configuration (can also be provided in initialize())
   */
  constructor(config?: ClientConfig) {
    this._logger = new Logger('FoodXClient');
    
    // Initialize services
    this._blockchainService = new BlockchainService();
    this._offlineService = new OfflineService();
    this._enterpriseService = new EnterpriseService();
    this._complianceService = new ComplianceService();
    this._ecosystemService = new EcosystemService();
    
    // Initialize if config is provided
    if (config) {
      this.initialize(config).catch(err => {
        this._logger.error('Failed to initialize client', err);
      });
    }
  }
  
  /**
   * Initialize the client with the provided configuration
   * @param config Client configuration
   */
  public async initialize(config: ClientConfig): Promise<void> {
    this._logger.info('Initializing FoodX SDK client', { tenant: config.tenant });
    this._config = config;
    
    try {
      // Initialize all services in order
      await this._blockchainService.initialize();
      await this._offlineService.initialize();
      await this._enterpriseService.initialize();
      await this._complianceService.initialize();
      await this._ecosystemService.initialize();
      
      this._logger.info('FoodX SDK client initialization complete');
    } catch (error) {
      this._logger.error('Failed to initialize client', error);
      throw error;
    }
  }
  
  /**
   * Access to blockchain-related operations
   */
  public get blockchain(): IBlockchainService {
    this.ensureInitialized();
    return this._blockchainService;
  }
  
  /**
   * Access to offline synchronization features
   */
  public get offline(): IOfflineService {
    this.ensureInitialized();
    return this._offlineService;
  }
  
  /**
   * Access to enterprise control features
   */
  public get enterprise(): IEnterpriseService {
    this.ensureInitialized();
    return this._enterpriseService;
  }
  
  /**
   * Access to compliance and reporting features
   */
  public get compliance(): IComplianceService {
    this.ensureInitialized();
    return this._complianceService;
  }
  
  /**
   * Access to ecosystem integrations and extensions
   */
  public get ecosystem(): IEcosystemService {
    this.ensureInitialized();
    return this._ecosystemService;
  }
  
  /**
   * Ensure the client has been initialized
   */
  private ensureInitialized(): void {
    if (!this._config) {
      throw new Error('FoodX SDK client has not been initialized. Call initialize() first.');
    }
  }
} 