import { IClient, ClientConfig } from './interfaces/IClient';
import { IBlockchainService } from '../blockchain/interfaces/IBlockchainService';
import { IOfflineService } from '../offline/interfaces/IOfflineService';
import { IEnterpriseService } from '../enterprise/interfaces/IEnterpriseService';
import { IComplianceService } from '../compliance/interfaces/IComplianceService';
import { IEcosystemService } from '../ecosystem/interfaces/IEcosystemService';
/**
 * Main client for the FoodX SDK
 */
export declare class FoodXClient implements IClient {
    private _config;
    private _logger;
    private _blockchainService;
    private _offlineService;
    private _enterpriseService;
    private _complianceService;
    private _ecosystemService;
    /**
     * Creates a new FoodX SDK client
     * @param config Optional client configuration (can also be provided in initialize())
     */
    constructor(config?: ClientConfig);
    /**
     * Initialize the client with the provided configuration
     * @param config Client configuration
     */
    initialize(config: ClientConfig): Promise<void>;
    /**
     * Access to blockchain-related operations
     */
    get blockchain(): IBlockchainService;
    /**
     * Access to offline synchronization features
     */
    get offline(): IOfflineService;
    /**
     * Access to enterprise control features
     */
    get enterprise(): IEnterpriseService;
    /**
     * Access to compliance and reporting features
     */
    get compliance(): IComplianceService;
    /**
     * Access to ecosystem integrations and extensions
     */
    get ecosystem(): IEcosystemService;
    /**
     * Ensure the client has been initialized
     */
    private ensureInitialized;
}
