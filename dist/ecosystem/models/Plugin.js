"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginCapabilityType = exports.PluginInterfaceType = exports.PluginStatus = void 0;
/**
 * Status of a plugin
 */
var PluginStatus;
(function (PluginStatus) {
    PluginStatus["ACTIVE"] = "active";
    PluginStatus["DISABLED"] = "disabled";
    PluginStatus["ERROR"] = "error";
})(PluginStatus || (exports.PluginStatus = PluginStatus = {}));
/**
 * Plugin interface types
 */
var PluginInterfaceType;
(function (PluginInterfaceType) {
    PluginInterfaceType["REST"] = "rest";
    PluginInterfaceType["GRPC"] = "grpc";
    PluginInterfaceType["WEBASSEMBLY"] = "webassembly";
    PluginInterfaceType["NODE_MODULE"] = "node-module";
})(PluginInterfaceType || (exports.PluginInterfaceType = PluginInterfaceType = {}));
/**
 * Plugin capability types
 */
var PluginCapabilityType;
(function (PluginCapabilityType) {
    PluginCapabilityType["BLOCKCHAIN_ADAPTER"] = "blockchain-adapter";
    PluginCapabilityType["DATA_TRANSFORMER"] = "data-transformer";
    PluginCapabilityType["STORAGE_PROVIDER"] = "storage-provider";
    PluginCapabilityType["AUTHENTICATION"] = "authentication";
    PluginCapabilityType["ANALYTICS"] = "analytics";
    PluginCapabilityType["EXTERNAL_CONNECTOR"] = "external-connector";
    PluginCapabilityType["CUSTOM"] = "custom";
})(PluginCapabilityType || (exports.PluginCapabilityType = PluginCapabilityType = {}));
