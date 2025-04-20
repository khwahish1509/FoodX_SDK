"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportFormat = void 0;
/**
 * Supported export formats
 */
var ExportFormat;
(function (ExportFormat) {
    /**
     * CSV format for tabular data
     */
    ExportFormat["CSV"] = "csv";
    /**
     * JSON format for structured data
     */
    ExportFormat["JSON"] = "json";
    /**
     * Excel spreadsheet format
     */
    ExportFormat["EXCEL"] = "excel";
    /**
     * PDF document format
     */
    ExportFormat["PDF"] = "pdf";
    /**
     * XML format for hierarchical data
     */
    ExportFormat["XML"] = "xml";
})(ExportFormat || (exports.ExportFormat = ExportFormat = {}));
