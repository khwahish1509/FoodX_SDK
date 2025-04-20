/**
 * Options for data export operations
 */
export interface ExportOptions {
    /**
     * Filters to apply to the exported data
     */
    filters?: Record<string, any>;
    /**
     * Fields to include in the export (null for all fields)
     */
    fields?: string[];
    /**
     * Time range for the exported data
     */
    timeRange?: {
        /**
         * Start timestamp
         */
        startTime: number;
        /**
         * End timestamp
         */
        endTime: number;
    };
    /**
     * Maximum number of records to export
     */
    limit?: number;
    /**
     * Whether to include a digital signature
     */
    includeSignature?: boolean;
    /**
     * Whether to include metadata in the export
     */
    includeMetadata?: boolean;
    /**
     * Compression options
     */
    compression?: {
        /**
         * Whether to compress the exported data
         */
        enabled: boolean;
        /**
         * Compression algorithm to use
         */
        algorithm?: 'gzip' | 'zip' | 'brotli';
    };
    /**
     * Encryption options
     */
    encryption?: {
        /**
         * Whether to encrypt the exported data
         */
        enabled: boolean;
        /**
         * Encryption key or identifier
         */
        keyId?: string;
    };
    /**
     * Sort options
     */
    sort?: {
        /**
         * Field to sort by
         */
        field: string;
        /**
         * Sort direction
         */
        direction: 'asc' | 'desc';
    };
}
