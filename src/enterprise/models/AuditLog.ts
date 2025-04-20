/**
 * Severity levels for audit events
 */
export enum AuditSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

/**
 * Types of events that can be audited
 */
export enum AuditEventType {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  DATA_ACCESS = 'data-access',
  DATA_MODIFICATION = 'data-modification',
  CONFIGURATION_CHANGE = 'configuration-change',
  SECURITY_ALERT = 'security-alert',
  USER_MANAGEMENT = 'user-management',
  API_KEY_MANAGEMENT = 'api-key-management',
  BLOCKCHAIN_TRANSACTION = 'blockchain-transaction'
}

/**
 * Status of an audited event
 */
export enum AuditEventStatus {
  SUCCESS = 'success',
  FAILURE = 'failure',
  BLOCKED = 'blocked',
  PENDING = 'pending'
}

/**
 * Represents an entry in the audit log
 */
export interface AuditLog {
  /**
   * Unique identifier for the log entry
   */
  id: string;
  
  /**
   * Tenant ID for multi-tenant deployments
   */
  tenantId: string;
  
  /**
   * Timestamp when the event occurred
   */
  timestamp: number;
  
  /**
   * User or system that performed the action
   */
  actor: {
    id: string;
    type: 'user' | 'system' | 'api-key';
    name?: string;
  };
  
  /**
   * Type of event
   */
  eventType: AuditEventType;
  
  /**
   * Specific action that was performed
   */
  action: string;
  
  /**
   * Resource that was acted upon
   */
  resource: {
    type: string;
    id?: string;
    name?: string;
  };
  
  /**
   * Status of the event
   */
  status: AuditEventStatus;
  
  /**
   * Severity of the event
   */
  severity: AuditSeverity;
  
  /**
   * IP address where the request originated
   */
  sourceIp?: string;
  
  /**
   * User agent string
   */
  userAgent?: string;
  
  /**
   * Additional context metadata
   */
  metadata?: Record<string, any>;
  
  /**
   * Error message if status is FAILURE
   */
  error?: string;
} 