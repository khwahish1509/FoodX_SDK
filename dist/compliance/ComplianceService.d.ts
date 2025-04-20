/// <reference types="pouchdb-core" />
/// <reference types="node" />
/// <reference types="node" />
import { IComplianceService } from './interfaces/IComplianceService';
import { ExportFormat } from './models/ExportFormat';
import { ExportOptions } from './models/ExportOptions';
import { ReportTemplate } from './models/ReportTemplate';
import { RetentionPolicy } from './models/RetentionPolicy';
/**
 * Implementation of the compliance service
 */
export declare class ComplianceService implements IComplianceService {
    private _logger;
    constructor();
    initialize(): Promise<void>;
    exportData(dataType: string, format: ExportFormat, options?: ExportOptions): Promise<{
        data: string | Buffer;
        filename: string;
    }>;
    getAvailableDataTypes(): Promise<string[]>;
    verifySignature(data: string | Buffer, signature: string): Promise<boolean>;
    getRetentionPolicy(): Promise<RetentionPolicy>;
    updateRetentionPolicy(policy: RetentionPolicy): Promise<void>;
    searchData(dataType: string, query: Record<string, any>, options?: Record<string, any>): Promise<any[]>;
    getDataProvenance(resourceType: string, resourceId: string): Promise<any[]>;
    getReportTemplates(): Promise<ReportTemplate[]>;
    createReportTemplate(template: Omit<ReportTemplate, 'id'>): Promise<ReportTemplate>;
    generateReport(templateId: string, parameters: Record<string, any>): Promise<{
        reportId: string;
        url?: string;
    }>;
    getReport(reportId: string): Promise<{
        data: Buffer;
        filename: string;
        metadata: any;
    }>;
}
