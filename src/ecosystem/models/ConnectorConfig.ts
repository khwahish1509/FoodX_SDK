/**
 * Status of a connector
 */
export enum ConnectorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ERROR = 'error',
  PENDING = 'pending'
}

/**
 * Authentication types for connectors
 */
export enum ConnectorAuthType {
  API_KEY = 'api-key',
  OAUTH2 = 'oauth2',
  JWT = 'jwt',
  BASIC = 'basic',
  CERTIFICATE = 'certificate',
  NONE = 'none'
}

/**
 * Base connector configuration
 */
export interface ConnectorConfig {
  /**
   * Type of connector
   */
  type: string;
  
  /**
   * Connector name
   */
  name: string;
  
  /**
   * Current status
   */
  status: ConnectorStatus;
  
  /**
   * Authentication configuration
   */
  auth: {
    /**
     * Authentication type
     */
    type: ConnectorAuthType;
    
    /**
     * Authentication parameters
     */
    params: Record<string, any>;
  };
  
  /**
   * Endpoint URL or connection string
   */
  endpoint?: string;
  
  /**
   * Additional configuration options
   */
  options?: Record<string, any>;
  
  /**
   * Polling interval in milliseconds (for pull connectors)
   */
  pollingInterval?: number;
  
  /**
   * When the connector was last updated
   */
  updatedAt: number;
  
  /**
   * User who last updated the connector
   */
  updatedBy: string;
  
  /**
   * Error information if status is ERROR
   */
  error?: {
    message: string;
    code?: string;
    timestamp: number;
  };
  
  /**
   * Metadata about the connected system
   */
  metadata?: Record<string, any>;
}

/**
 * ERP system connector configuration
 */
export interface ERPConnectorConfig extends ConnectorConfig {
  type: 'erp';
  
  /**
   * ERP system type
   */
  erpSystem: 'sap' | 'oracle' | 'ms-dynamics' | 'other';
  
  /**
   * Mappings between ERP entities and FoodX entities
   */
  entityMappings: Record<string, any>;
}

/**
 * IoT platform connector configuration
 */
export interface IoTConnectorConfig extends ConnectorConfig {
  type: 'iot';
  
  /**
   * IoT platform type
   */
  iotPlatform: 'aws-iot' | 'azure-iot' | 'google-iot' | 'other';
  
  /**
   * Device registration settings
   */
  deviceRegistration: {
    automatic: boolean;
    prefix?: string;
  };
}

/**
 * Warehouse management system connector
 */
export interface WMSConnectorConfig extends ConnectorConfig {
  type: 'wms';
  
  /**
   * WMS system type
   */
  wmsSystem: 'manhattan' | 'blue-yonder' | 'sap-ewm' | 'other';
  
  /**
   * Location mappings
   */
  locationMappings: Record<string, string>;
} 