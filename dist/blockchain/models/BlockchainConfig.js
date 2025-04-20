"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainType = void 0;
/**
 * Supported blockchain types in the FoodX SDK
 */
var BlockchainType;
(function (BlockchainType) {
    BlockchainType["ETHEREUM"] = "ethereum";
    BlockchainType["HYPERLEDGER_FABRIC"] = "hyperledger-fabric";
    BlockchainType["POLYGON"] = "polygon";
    BlockchainType["SOLANA"] = "solana";
})(BlockchainType || (exports.BlockchainType = BlockchainType = {}));
