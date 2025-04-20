"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyType = void 0;
/**
 * Types of access control policies
 */
var PolicyType;
(function (PolicyType) {
    PolicyType["ROLE_BASED"] = "role-based";
    PolicyType["ATTRIBUTE_BASED"] = "attribute-based";
    PolicyType["HYBRID"] = "hybrid";
})(PolicyType || (exports.PolicyType = PolicyType = {}));
