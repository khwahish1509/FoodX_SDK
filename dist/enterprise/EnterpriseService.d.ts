import { IEnterpriseService } from './interfaces/IEnterpriseService';
import { AccessControl } from './models/AccessControl';
import { ApiKey } from './models/ApiKey';
import { AuditLog } from './models/AuditLog';
/**
 * Implementation of the enterprise service
 */
export declare class EnterpriseService implements IEnterpriseService {
    private _logger;
    constructor();
    initialize(): Promise<void>;
    getAccessControl(): Promise<AccessControl>;
    updateAccessControl(config: AccessControl): Promise<void>;
    isAllowed(resource: string, action: string, attributes?: Record<string, any>): Promise<boolean>;
    createApiKey(name: string, scopes: string[], expiresAt?: number): Promise<ApiKey>;
    listApiKeys(): Promise<ApiKey[]>;
    revokeApiKey(keyId: string): Promise<void>;
    getRateLimitStatus(): Promise<{
        remaining: number;
        limit: number;
        resetAt: number;
    }>;
    updateRateLimit(limit: {
        requestsPerMinute?: number;
        burstLimit?: number;
        tier?: string;
    }): Promise<void>;
    getUsageMetrics(startTime: number, endTime: number): Promise<any>;
    getAuditLogs(startTime: number, endTime: number, filters?: Record<string, any>): Promise<AuditLog[]>;
    logAuditEvent(event: Omit<AuditLog, 'id' | 'timestamp'>): Promise<void>;
}
