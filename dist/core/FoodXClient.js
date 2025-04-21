"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodXClient = void 0;
const BlockchainService_1 = require("../blockchain/BlockchainService");
const OfflineService_1 = require("../offline/OfflineService");
const EnterpriseService_1 = require("../enterprise/EnterpriseService");
const ComplianceService_1 = require("../compliance/ComplianceService");
const EcosystemService_1 = require("../ecosystem/EcosystemService");
const Logger_1 = require("../utils/Logger");
/**
 * Main client for the FoodX SDK
 */
class FoodXClient {
    /**
     * Creates a new FoodX SDK client
     * @param config Optional client configuration (can also be provided in initialize())
     */
    constructor(config) {
        this._logger = new Logger_1.Logger('FoodXClient');
        // Initialize services
        this._blockchainService = new BlockchainService_1.BlockchainService();
        this._offlineService = new OfflineService_1.OfflineService();
        this._enterpriseService = new EnterpriseService_1.EnterpriseService();
        this._complianceService = new ComplianceService_1.ComplianceService();
        this._ecosystemService = new EcosystemService_1.EcosystemService();
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
    async initialize(config) {
        this._logger.info('Initializing FoodX SDK client', { tenant: config.tenant });
        this._config = config;
        try {
            // Initialize all services in order
            await this._blockchainService.initialize();
            // Configure blockchain service with the appropriate adapter
            const blockchainService = this._blockchainService;
            if (config.blockchain) {
                await blockchainService.configure(config.blockchain.type, config.blockchain);
            }
            // Initialize remaining services
            if (config.offline) {
                await this._offlineService.initialize(config.offline);
            }
            else {
                await this._offlineService.initialize({ enabled: false });
            }
            await this._enterpriseService.initialize();
            await this._complianceService.initialize();
            await this._ecosystemService.initialize();
            this._logger.info('FoodX SDK client initialization complete');
        }
        catch (error) {
            this._logger.error('Failed to initialize client', error);
            throw error;
        }
    }
    /**
     * Access to blockchain-related operations
     */
    get blockchain() {
        this.ensureInitialized();
        return this._blockchainService;
    }
    /**
     * Access to offline synchronization features
     */
    get offline() {
        this.ensureInitialized();
        return this._offlineService;
    }
    /**
     * Access to enterprise control features
     */
    get enterprise() {
        this.ensureInitialized();
        return this._enterpriseService;
    }
    /**
     * Access to compliance and reporting features
     */
    get compliance() {
        this.ensureInitialized();
        return this._complianceService;
    }
    /**
     * Access to ecosystem integrations and extensions
     */
    get ecosystem() {
        this.ensureInitialized();
        return this._ecosystemService;
    }
    /**
     * Ensure the client has been initialized
     */
    ensureInitialized() {
        if (!this._config) {
            throw new Error('FoodX SDK client has not been initialized. Call initialize() first.');
        }
    }
}
exports.FoodXClient = FoodXClient;
