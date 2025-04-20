"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyType = exports.ApiKeyStatus = void 0;
/**
 * Status of an API key
 */
var ApiKeyStatus;
(function (ApiKeyStatus) {
    ApiKeyStatus["ACTIVE"] = "active";
    ApiKeyStatus["EXPIRED"] = "expired";
    ApiKeyStatus["REVOKED"] = "revoked";
})(ApiKeyStatus || (exports.ApiKeyStatus = ApiKeyStatus = {}));
/**
 * Types of API keys
 */
var ApiKeyType;
(function (ApiKeyType) {
    ApiKeyType["PRIMARY"] = "primary";
    ApiKeyType["SECONDARY"] = "secondary";
    ApiKeyType["RESTRICTED"] = "restricted";
    ApiKeyType["TEMPORARY"] = "temporary";
})(ApiKeyType || (exports.ApiKeyType = ApiKeyType = {}));
