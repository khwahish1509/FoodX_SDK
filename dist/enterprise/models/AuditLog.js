"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditEventStatus = exports.AuditEventType = exports.AuditSeverity = void 0;
/**
 * Severity levels for audit events
 */
var AuditSeverity;
(function (AuditSeverity) {
    AuditSeverity["INFO"] = "info";
    AuditSeverity["WARNING"] = "warning";
    AuditSeverity["ERROR"] = "error";
    AuditSeverity["CRITICAL"] = "critical";
})(AuditSeverity || (exports.AuditSeverity = AuditSeverity = {}));
/**
 * Types of events that can be audited
 */
var AuditEventType;
(function (AuditEventType) {
    AuditEventType["AUTHENTICATION"] = "authentication";
    AuditEventType["AUTHORIZATION"] = "authorization";
    AuditEventType["DATA_ACCESS"] = "data-access";
    AuditEventType["DATA_MODIFICATION"] = "data-modification";
    AuditEventType["CONFIGURATION_CHANGE"] = "configuration-change";
    AuditEventType["SECURITY_ALERT"] = "security-alert";
    AuditEventType["USER_MANAGEMENT"] = "user-management";
    AuditEventType["API_KEY_MANAGEMENT"] = "api-key-management";
    AuditEventType["BLOCKCHAIN_TRANSACTION"] = "blockchain-transaction";
})(AuditEventType || (exports.AuditEventType = AuditEventType = {}));
/**
 * Status of an audited event
 */
var AuditEventStatus;
(function (AuditEventStatus) {
    AuditEventStatus["SUCCESS"] = "success";
    AuditEventStatus["FAILURE"] = "failure";
    AuditEventStatus["BLOCKED"] = "blocked";
    AuditEventStatus["PENDING"] = "pending";
})(AuditEventStatus || (exports.AuditEventStatus = AuditEventStatus = {}));
