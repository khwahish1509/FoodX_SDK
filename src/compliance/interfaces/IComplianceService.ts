import { ExportFormat } from '../models/ExportFormat';
import { ExportOptions } from '../models/ExportOptions';
import { ReportTemplate } from '../models/ReportTemplate';
import { RetentionPolicy } from '../models/RetentionPolicy';

/**
 * Interface for compliance-related operations
 */
export interface IComplianceService {
  /**
   * Initialize the compliance service
   */
  initialize(): Promise<void>;
  
  /**
   * Export data in the specified format
   * @param dataType Type of data to export
   * @param format Format to export in
   * @param options Export options including filters
   */
  exportData(
    dataType: string, 
    format: ExportFormat, 
    options?: ExportOptions
  ): Promise<{ data: string | Buffer; filename: string }>;
  
  /**
   * Get available data types for export
   */
  getAvailableDataTypes(): Promise<string[]>;
  
  /**
   * Verify a digital signature for exported data
   * @param data The data to verify
   * @param signature The signature to verify
   */
  verifySignature(data: string | Buffer, signature: string): Promise<boolean>;
  
  /**
   * Get the current data retention policy
   */
  getRetentionPolicy(): Promise<RetentionPolicy>;
  
  /**
   * Update the data retention policy
   * @param policy New retention policy
   */
  updateRetentionPolicy(policy: RetentionPolicy): Promise<void>;
  
  /**
   * Search for data that matches the specified criteria
   * @param dataType Type of data to search
   * @param query Search query
   * @param options Search options
   */
  searchData(
    dataType: string, 
    query: Record<string, any>, 
    options?: Record<string, any>
  ): Promise<any[]>;
  
  /**
   * Get the data provenance/chain of custody for a resource
   * @param resourceType Type of resource
   * @param resourceId Resource identifier
   */
  getDataProvenance(
    resourceType: string, 
    resourceId: string
  ): Promise<any[]>;
  
  /**
   * Get available report templates
   */
  getReportTemplates(): Promise<ReportTemplate[]>;
  
  /**
   * Create a new report template
   * @param template Template details
   */
  createReportTemplate(template: Omit<ReportTemplate, 'id'>): Promise<ReportTemplate>;
  
  /**
   * Generate a report using a template
   * @param templateId Template identifier
   * @param parameters Report parameters
   */
  generateReport(
    templateId: string, 
    parameters: Record<string, any>
  ): Promise<{ reportId: string; url?: string }>;
  
  /**
   * Get a previously generated report
   * @param reportId Report identifier
   */
  getReport(reportId: string): Promise<{ data: Buffer; filename: string; metadata: any }>;
} 