"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueuedItemStatus = void 0;
/**
 * Status of a queued operation
 */
var QueuedItemStatus;
(function (QueuedItemStatus) {
    QueuedItemStatus["PENDING"] = "pending";
    QueuedItemStatus["IN_PROGRESS"] = "in-progress";
    QueuedItemStatus["FAILED"] = "failed";
    QueuedItemStatus["COMPLETED"] = "completed";
})(QueuedItemStatus || (exports.QueuedItemStatus = QueuedItemStatus = {}));
