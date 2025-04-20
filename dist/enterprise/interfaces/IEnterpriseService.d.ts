import { AccessControl } from '../models/AccessControl';
import { ApiKey } from '../models/ApiKey';
import { AuditLog } from '../models/AuditLog';
/**
 * Interface for enterprise-level controls
 */
export interface IEnterpriseService {
    /**
     * Initialize the enterprise service
     */
    initialize(): Promise<void>;
    /**
     * Get the current access control configuration
     */
    getAccessControl(): Promise<AccessControl>;
    /**
     * Update the access control configuration
     * @param config New access control configuration
     */
    updateAccessControl(config: AccessControl): Promise<void>;
    /**
     * Check if an action is allowed based on current user/context
     * @param resource Resource being accessed
     * @param action Action being performed
     * @param attributes Additional context attributes for attribute-based control
     */
    isAllowed(resource: string, action: string, attributes?: Record<string, any>): Promise<boolean>;
    /**
     * Create a new API key
     * @param name Human-readable name for the key
     * @param scopes Permission scopes for the key
     * @param expiresAt Optional expiration timestamp
     */
    createApiKey(name: string, scopes: string[], expiresAt?: number): Promise<ApiKey>;
    /**
     * List all API keys
     */
    listApiKeys(): Promise<ApiKey[]>;
    /**
     * Revoke an API key
     * @param keyId ID of the key to revoke
     */
    revokeApiKey(keyId: string): Promise<void>;
    /**
     * Get rate limit status for the current tenant
     */
    getRateLimitStatus(): Promise<{
        remaining: number;
        limit: number;
        resetAt: number;
    }>;
    /**
     * Update rate limit configuration
     * @param limit New rate limit configuration
     */
    updateRateLimit(limit: {
        requestsPerMinute?: number;
        burstLimit?: number;
        tier?: string;
    }): Promise<void>;
    /**
     * Get usage metrics for the current tenant
     * @param startTime Start timestamp for the report
     * @param endTime End timestamp for the report
     */
    getUsageMetrics(startTime: number, endTime: number): Promise<any>;
    /**
     * Get audit logs for the specified time range
     * @param startTime Start timestamp for logs
     * @param endTime End timestamp for logs
     * @param filters Optional filters to apply
     */
    getAuditLogs(startTime: number, endTime: number, filters?: Record<string, any>): Promise<AuditLog[]>;
    /**
     * Log an event to the audit log
     * @param event Event details
     */
    logAuditEvent(event: Omit<AuditLog, 'id' | 'timestamp'>): Promise<void>;
}
