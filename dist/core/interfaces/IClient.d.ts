import { BlockchainConfig } from '../../blockchain/models/BlockchainConfig';
import { OfflineConfig } from '../../offline/models/OfflineConfig';
import { IBlockchainService } from '../../blockchain/interfaces/IBlockchainService';
import { IOfflineService } from '../../offline/interfaces/IOfflineService';
import { IEnterpriseService } from '../../enterprise/interfaces/IEnterpriseService';
import { IComplianceService } from '../../compliance/interfaces/IComplianceService';
import { IEcosystemService } from '../../ecosystem/interfaces/IEcosystemService';
/**
 * Configuration for the FoodX SDK client
 */
export interface ClientConfig {
    /**
     * The tenant identifier for multi-tenant deployments
     */
    tenant: string;
    /**
     * Blockchain configuration
     */
    blockchain: BlockchainConfig;
    /**
     * Offline capabilities configuration
     */
    offline?: OfflineConfig;
    /**
     * API key for authentication
     */
    apiKey?: string;
    /**
     * Base URL for API requests
     */
    baseUrl?: string;
}
/**
 * Main interface for the FoodX SDK client
 */
export interface IClient {
    /**
     * Initialize the client with the provided configuration
     */
    initialize(config: ClientConfig): Promise<void>;
    /**
     * Access to blockchain-related operations
     */
    blockchain: IBlockchainService;
    /**
     * Access to offline synchronization features
     */
    offline: IOfflineService;
    /**
     * Access to enterprise control features (access control, rate limiting, etc.)
     */
    enterprise: IEnterpriseService;
    /**
     * Access to compliance and reporting features
     */
    compliance: IComplianceService;
    /**
     * Access to ecosystem integrations and extensions
     */
    ecosystem: IEcosystemService;
}
