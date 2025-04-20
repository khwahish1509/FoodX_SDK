/**
 * Status of an API key
 */
export enum ApiKeyStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  REVOKED = 'revoked'
}

/**
 * Types of API keys
 */
export enum ApiKeyType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RESTRICTED = 'restricted',
  TEMPORARY = 'temporary'
}

/**
 * Represents an API key for authentication
 */
export interface ApiKey {
  /**
   * Unique identifier for the API key
   */
  id: string;
  
  /**
   * The actual key value (only returned when initially created)
   */
  key?: string;
  
  /**
   * Human-readable name for the key
   */
  name: string;
  
  /**
   * Type of the API key
   */
  type: ApiKeyType;
  
  /**
   * Current status of the key
   */
  status: ApiKeyStatus;
  
  /**
   * Permission scopes granted to this key
   */
  scopes: string[];
  
  /**
   * Maximum requests per minute allowed for this key
   */
  rateLimit?: number;
  
  /**
   * When the key was created
   */
  createdAt: number;
  
  /**
   * When the key was last used
   */
  lastUsedAt?: number;
  
  /**
   * When the key expires (null for no expiration)
   */
  expiresAt?: number;
  
  /**
   * IP addresses that are allowed to use this key (null for any IP)
   */
  allowedIps?: string[];
  
  /**
   * User who created the key
   */
  createdBy: string;
} 