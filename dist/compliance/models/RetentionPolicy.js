"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetentionActionType = void 0;
/**
 * Types of retention actions
 */
var RetentionActionType;
(function (RetentionActionType) {
    /**
     * Delete the data completely
     */
    RetentionActionType["DELETE"] = "delete";
    /**
     * Archive the data to cold storage
     */
    RetentionActionType["ARCHIVE"] = "archive";
    /**
     * Anonymize the data by removing identifying information
     */
    RetentionActionType["ANONYMIZE"] = "anonymize";
    /**
     * Redact specific fields in the data
     */
    RetentionActionType["REDACT"] = "redact";
})(RetentionActionType || (exports.RetentionActionType = RetentionActionType = {}));
