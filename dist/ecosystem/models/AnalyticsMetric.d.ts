/**
 * Aggregation functions for metrics
 */
export declare enum MetricAggregation {
    SUM = "sum",
    AVERAGE = "average",
    MIN = "min",
    MAX = "max",
    COUNT = "count",
    COUNT_UNIQUE = "count_unique",
    PERCENTILE = "percentile"
}
/**
 * Time granularity for metrics
 */
export declare enum MetricGranularity {
    MINUTE = "minute",
    HOUR = "hour",
    DAY = "day",
    WEEK = "week",
    MONTH = "month"
}
/**
 * Metric data type
 */
export declare enum MetricDataType {
    NUMBER = "number",
    COUNTER = "counter",
    GAUGE = "gauge",
    HISTOGRAM = "histogram",
    SET = "set"
}
/**
 * Analytics metric definition
 */
export interface AnalyticsMetric {
    /**
     * Unique metric identifier
     */
    id: string;
    /**
     * Human-readable name
     */
    name: string;
    /**
     * Metric description
     */
    description: string;
    /**
     * Data type of the metric
     */
    dataType: MetricDataType;
    /**
     * Default aggregation method
     */
    defaultAggregation: MetricAggregation;
    /**
     * Supported aggregation methods
     */
    supportedAggregations: MetricAggregation[];
    /**
     * Default time granularity
     */
    defaultGranularity: MetricGranularity;
    /**
     * Supported dimensions for grouping
     */
    availableDimensions?: string[];
    /**
     * Unit of measurement
     */
    unit?: string;
    /**
     * Whether this is a custom metric
     */
    isCustom: boolean;
    /**
     * When the metric was created
     */
    createdAt: number;
    /**
     * User who created the metric
     */
    createdBy?: string;
}
