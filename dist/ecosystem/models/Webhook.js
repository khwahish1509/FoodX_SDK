"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookEventType = exports.WebhookStatus = void 0;
/**
 * Status of a webhook
 */
var WebhookStatus;
(function (WebhookStatus) {
    WebhookStatus["ACTIVE"] = "active";
    WebhookStatus["PAUSED"] = "paused";
    WebhookStatus["ERROR"] = "error";
})(WebhookStatus || (exports.WebhookStatus = WebhookStatus = {}));
/**
 * Event types that can trigger webhooks
 */
var WebhookEventType;
(function (WebhookEventType) {
    WebhookEventType["PRODUCT_CREATED"] = "product.created";
    WebhookEventType["PRODUCT_UPDATED"] = "product.updated";
    WebhookEventType["TRANSACTION_CREATED"] = "transaction.created";
    WebhookEventType["TRANSACTION_CONFIRMED"] = "transaction.confirmed";
    WebhookEventType["TRANSACTION_FAILED"] = "transaction.failed";
    WebhookEventType["USER_CREATED"] = "user.created";
    WebhookEventType["USER_UPDATED"] = "user.updated";
    WebhookEventType["API_KEY_CREATED"] = "api-key.created";
    WebhookEventType["API_KEY_REVOKED"] = "api-key.revoked";
    WebhookEventType["DATA_SYNCHRONIZED"] = "data.synchronized";
    WebhookEventType["COMPLIANCE_ALERT"] = "compliance.alert";
})(WebhookEventType || (exports.WebhookEventType = WebhookEventType = {}));
