"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookDeliveryStatus = void 0;
/**
 * Status of a webhook delivery
 */
var WebhookDeliveryStatus;
(function (WebhookDeliveryStatus) {
    WebhookDeliveryStatus["SUCCESS"] = "success";
    WebhookDeliveryStatus["FAILED"] = "failed";
    WebhookDeliveryStatus["PENDING"] = "pending";
    WebhookDeliveryStatus["RETRYING"] = "retrying";
})(WebhookDeliveryStatus || (exports.WebhookDeliveryStatus = WebhookDeliveryStatus = {}));
