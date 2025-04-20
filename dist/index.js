"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = exports.WebhookStatus = exports.PluginStatus = exports.ExportFormat = exports.AuditSeverity = exports.AuditEventType = exports.ApiKeyType = exports.ApiKeyStatus = exports.PolicyType = exports.QueuedItemStatus = exports.BlockchainType = exports.configureLogger = exports.LogLevel = exports.Logger = exports.FoodXClient = void 0;
// Main client class
var FoodXClient_1 = require("./core/FoodXClient");
Object.defineProperty(exports, "FoodXClient", { enumerable: true, get: function () { return FoodXClient_1.FoodXClient; } });
var Logger_1 = require("./utils/Logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return Logger_1.Logger; } });
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return Logger_1.LogLevel; } });
Object.defineProperty(exports, "configureLogger", { enumerable: true, get: function () { return Logger_1.configureLogger; } });
// Blockchain module exports
var BlockchainConfig_1 = require("./blockchain/models/BlockchainConfig");
Object.defineProperty(exports, "BlockchainType", { enumerable: true, get: function () { return BlockchainConfig_1.BlockchainType; } });
var QueuedItem_1 = require("./offline/models/QueuedItem");
Object.defineProperty(exports, "QueuedItemStatus", { enumerable: true, get: function () { return QueuedItem_1.QueuedItemStatus; } });
// Enterprise module exports
var AccessControl_1 = require("./enterprise/models/AccessControl");
Object.defineProperty(exports, "PolicyType", { enumerable: true, get: function () { return AccessControl_1.PolicyType; } });
var ApiKey_1 = require("./enterprise/models/ApiKey");
Object.defineProperty(exports, "ApiKeyStatus", { enumerable: true, get: function () { return ApiKey_1.ApiKeyStatus; } });
Object.defineProperty(exports, "ApiKeyType", { enumerable: true, get: function () { return ApiKey_1.ApiKeyType; } });
var AuditLog_1 = require("./enterprise/models/AuditLog");
Object.defineProperty(exports, "AuditEventType", { enumerable: true, get: function () { return AuditLog_1.AuditEventType; } });
Object.defineProperty(exports, "AuditSeverity", { enumerable: true, get: function () { return AuditLog_1.AuditSeverity; } });
// Compliance module exports
var ExportFormat_1 = require("./compliance/models/ExportFormat");
Object.defineProperty(exports, "ExportFormat", { enumerable: true, get: function () { return ExportFormat_1.ExportFormat; } });
// Ecosystem module exports
var Plugin_1 = require("./ecosystem/models/Plugin");
Object.defineProperty(exports, "PluginStatus", { enumerable: true, get: function () { return Plugin_1.PluginStatus; } });
var Webhook_1 = require("./ecosystem/models/Webhook");
Object.defineProperty(exports, "WebhookStatus", { enumerable: true, get: function () { return Webhook_1.WebhookStatus; } });
/**
 * Create a new FoodX SDK client
 * @param config Client configuration
 * @returns A configured FoodX client
 */
function createClient(config) {
    return new FoodXClient(config);
}
exports.createClient = createClient;
