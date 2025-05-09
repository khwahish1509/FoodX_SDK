import { FoodXClient } from './core/FoodXClient';
import { ClientConfig } from './core/interfaces/IClient';

// Main client class
export { FoodXClient } from './core/FoodXClient';

// Core interfaces and types
export { ClientConfig, IClient } from './core/interfaces/IClient';
export { Logger, LogLevel, configureLogger } from './utils/Logger';

// Blockchain module exports
export { 
  BlockchainType,
  EthereumConfig,
  HyperledgerFabricConfig,
  PolygonConfig,
  SolanaConfig
} from './blockchain/models/BlockchainConfig';
export { TransactionOptions } from './blockchain/models/TransactionOptions';
export { TransactionResult } from './blockchain/models/TransactionResult';
export { IBlockchainService } from './blockchain/interfaces/IBlockchainService';
export { IBlockchainAdapter } from './blockchain/interfaces/IBlockchainAdapter';

// Offline module exports
export { OfflineConfig } from './offline/models/OfflineConfig';
export { SyncOptions } from './offline/models/SyncOptions';
export { SyncResult } from './offline/models/SyncResult';
export { QueuedItem, QueuedItemStatus } from './offline/models/QueuedItem';
export { IOfflineService } from './offline/interfaces/IOfflineService';
export { IOfflineStorage } from './offline/interfaces/IOfflineStorage';
export { IQueueManager } from './offline/interfaces/IQueueManager';

// Enterprise module exports
export { AccessControl, PolicyType } from './enterprise/models/AccessControl';
export { ApiKey, ApiKeyStatus, ApiKeyType } from './enterprise/models/ApiKey';
export { AuditLog, AuditEventType, AuditSeverity } from './enterprise/models/AuditLog';
export { IEnterpriseService } from './enterprise/interfaces/IEnterpriseService';

// Compliance module exports
export { ExportFormat } from './compliance/models/ExportFormat';
export { ExportOptions } from './compliance/models/ExportOptions';
export { ReportTemplate } from './compliance/models/ReportTemplate';
export { RetentionPolicy } from './compliance/models/RetentionPolicy';
export { IComplianceService } from './compliance/interfaces/IComplianceService';

// Ecosystem module exports
export { Plugin, PluginStatus } from './ecosystem/models/Plugin';
export { Webhook, WebhookStatus } from './ecosystem/models/Webhook';
export { AnalyticsMetric } from './ecosystem/models/AnalyticsMetric';
export { ConnectorConfig } from './ecosystem/models/ConnectorConfig';
export { IEcosystemService } from './ecosystem/interfaces/IEcosystemService';

/**
 * Create a new FoodX SDK client
 * @param config Client configuration
 * @returns A configured FoodX client
 */
export function createClient(config: ClientConfig): FoodXClient {
  return new FoodXClient(config);
} 