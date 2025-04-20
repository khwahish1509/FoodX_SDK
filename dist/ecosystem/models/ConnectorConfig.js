"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorAuthType = exports.ConnectorStatus = void 0;
/**
 * Status of a connector
 */
var ConnectorStatus;
(function (ConnectorStatus) {
    ConnectorStatus["ACTIVE"] = "active";
    ConnectorStatus["INACTIVE"] = "inactive";
    ConnectorStatus["ERROR"] = "error";
    ConnectorStatus["PENDING"] = "pending";
})(ConnectorStatus || (exports.ConnectorStatus = ConnectorStatus = {}));
/**
 * Authentication types for connectors
 */
var ConnectorAuthType;
(function (ConnectorAuthType) {
    ConnectorAuthType["API_KEY"] = "api-key";
    ConnectorAuthType["OAUTH2"] = "oauth2";
    ConnectorAuthType["JWT"] = "jwt";
    ConnectorAuthType["BASIC"] = "basic";
    ConnectorAuthType["CERTIFICATE"] = "certificate";
    ConnectorAuthType["NONE"] = "none";
})(ConnectorAuthType || (exports.ConnectorAuthType = ConnectorAuthType = {}));
