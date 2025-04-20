/**
 * Types of retention actions
 */
export declare enum RetentionActionType {
    /**
     * Delete the data completely
     */
    DELETE = "delete",
    /**
     * Archive the data to cold storage
     */
    ARCHIVE = "archive",
    /**
     * Anonymize the data by removing identifying information
     */
    ANONYMIZE = "anonymize",
    /**
     * Redact specific fields in the data
     */
    REDACT = "redact"
}
/**
 * Retention rule for a specific data type
 */
export interface RetentionRule {
    /**
     * Data type this rule applies to
     */
    dataType: string;
    /**
     * How long to retain the data in days
     * (null means retain indefinitely)
     */
    retentionPeriod: number | null;
    /**
     * Action to take when retention period expires
     */
    action: RetentionActionType;
    /**
     * For REDACT action, fields to redact
     */
    redactFields?: string[];
    /**
     * For ARCHIVE action, archive location
     */
    archiveLocation?: string;
    /**
     * Whether legal hold can override this rule
     */
    allowLegalHoldOverride: boolean;
    /**
     * Optional filter for which data this rule applies to
     */
    filter?: Record<string, any>;
}
/**
 * Legal hold configuration
 */
export interface LegalHold {
    /**
     * Unique identifier for this legal hold
     */
    id: string;
    /**
     * Human-readable name
     */
    name: string;
    /**
     * Description of the legal hold
     */
    description: string;
    /**
     * When the legal hold was created
     */
    createdAt: number;
    /**
     * When the legal hold expires (null for indefinite)
     */
    expiresAt: number | null;
    /**
     * Data types affected by this legal hold
     */
    dataTypes: string[];
    /**
     * Filter for which data is covered by the hold
     */
    filter?: Record<string, any>;
}
/**
 * Data retention policy
 */
export interface RetentionPolicy {
    /**
     * Retention rules by data type
     */
    rules: RetentionRule[];
    /**
     * Global default retention period in days
     * (used if no specific rule exists for a data type)
     */
    defaultRetentionPeriod: number;
    /**
     * Global default action when retention period expires
     */
    defaultAction: RetentionActionType;
    /**
     * Active legal holds
     */
    legalHolds: LegalHold[];
    /**
     * When the policy was last updated
     */
    lastUpdated: number;
    /**
     * User who last updated the policy
     */
    lastUpdatedBy: string;
}
