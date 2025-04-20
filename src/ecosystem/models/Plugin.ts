/**
 * Status of a plugin
 */
export enum PluginStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  ERROR = 'error'
}

/**
 * Plugin interface types
 */
export enum PluginInterfaceType {
  REST = 'rest',
  GRPC = 'grpc',
  WEBASSEMBLY = 'webassembly',
  NODE_MODULE = 'node-module'
}

/**
 * Plugin capability types
 */
export enum PluginCapabilityType {
  BLOCKCHAIN_ADAPTER = 'blockchain-adapter',
  DATA_TRANSFORMER = 'data-transformer',
  STORAGE_PROVIDER = 'storage-provider',
  AUTHENTICATION = 'authentication',
  ANALYTICS = 'analytics',
  EXTERNAL_CONNECTOR = 'external-connector',
  CUSTOM = 'custom'
}

/**
 * Plugin metadata
 */
export interface Plugin {
  /**
   * Unique plugin identifier
   */
  id: string;
  
  /**
   * Human-readable name
   */
  name: string;
  
  /**
   * Plugin description
   */
  description: string;
  
  /**
   * Plugin version
   */
  version: string;
  
  /**
   * Current status
   */
  status: PluginStatus;
  
  /**
   * Interface type for interacting with the plugin
   */
  interfaceType: PluginInterfaceType;
  
  /**
   * Plugin capabilities
   */
  capabilities: PluginCapabilityType[];
  
  /**
   * Entry point or endpoint for the plugin
   */
  entryPoint: string;
  
  /**
   * Plugin configuration schema
   */
  configSchema?: Record<string, any>;
  
  /**
   * Current plugin configuration
   */
  config?: Record<string, any>;
  
  /**
   * When the plugin was registered
   */
  registeredAt: number;
  
  /**
   * User who registered the plugin
   */
  registeredBy: string;
  
  /**
   * Optional error message if status is ERROR
   */
  error?: string;
  
  /**
   * Dependencies on other plugins or services
   */
  dependencies?: string[];
} 