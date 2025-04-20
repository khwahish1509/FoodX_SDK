"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportChartType = exports.ReportComponentType = void 0;
/**
 * Component types in a report template
 */
var ReportComponentType;
(function (ReportComponentType) {
    ReportComponentType["TABLE"] = "table";
    ReportComponentType["CHART"] = "chart";
    ReportComponentType["TEXT"] = "text";
    ReportComponentType["IMAGE"] = "image";
    ReportComponentType["HEADER"] = "header";
    ReportComponentType["FOOTER"] = "footer";
    ReportComponentType["PAGE_BREAK"] = "page-break";
})(ReportComponentType || (exports.ReportComponentType = ReportComponentType = {}));
/**
 * Chart types available in reports
 */
var ReportChartType;
(function (ReportChartType) {
    ReportChartType["BAR"] = "bar";
    ReportChartType["LINE"] = "line";
    ReportChartType["PIE"] = "pie";
    ReportChartType["SCATTER"] = "scatter";
    ReportChartType["AREA"] = "area";
})(ReportChartType || (exports.ReportChartType = ReportChartType = {}));
