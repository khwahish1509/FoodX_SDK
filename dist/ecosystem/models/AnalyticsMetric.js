"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricDataType = exports.MetricGranularity = exports.MetricAggregation = void 0;
/**
 * Aggregation functions for metrics
 */
var MetricAggregation;
(function (MetricAggregation) {
    MetricAggregation["SUM"] = "sum";
    MetricAggregation["AVERAGE"] = "average";
    MetricAggregation["MIN"] = "min";
    MetricAggregation["MAX"] = "max";
    MetricAggregation["COUNT"] = "count";
    MetricAggregation["COUNT_UNIQUE"] = "count_unique";
    MetricAggregation["PERCENTILE"] = "percentile";
})(MetricAggregation || (exports.MetricAggregation = MetricAggregation = {}));
/**
 * Time granularity for metrics
 */
var MetricGranularity;
(function (MetricGranularity) {
    MetricGranularity["MINUTE"] = "minute";
    MetricGranularity["HOUR"] = "hour";
    MetricGranularity["DAY"] = "day";
    MetricGranularity["WEEK"] = "week";
    MetricGranularity["MONTH"] = "month";
})(MetricGranularity || (exports.MetricGranularity = MetricGranularity = {}));
/**
 * Metric data type
 */
var MetricDataType;
(function (MetricDataType) {
    MetricDataType["NUMBER"] = "number";
    MetricDataType["COUNTER"] = "counter";
    MetricDataType["GAUGE"] = "gauge";
    MetricDataType["HISTOGRAM"] = "histogram";
    MetricDataType["SET"] = "set";
})(MetricDataType || (exports.MetricDataType = MetricDataType = {}));
