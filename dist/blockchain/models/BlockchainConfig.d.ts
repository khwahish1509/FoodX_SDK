/**
 * Supported blockchain types in the FoodX SDK
 */
export declare enum BlockchainType {
    ETHEREUM = "ethereum",
    HYPERLEDGER_FABRIC = "hyperledger-fabric",
    POLYGON = "polygon",
    SOLANA = "solana"
}
/**
 * Base configuration for all blockchain types
 */
export interface BaseBlockchainConfig {
    /**
     * Type of blockchain to use
     */
    type: BlockchainType;
    /**
     * API key for blockchain service (if applicable)
     */
    apiKey?: string;
    /**
     * Optional timeout in milliseconds for blockchain operations
     */
    timeout?: number;
    /**
     * Whether to use test networks instead of mainnet
     */
    useTestnet?: boolean;
}
/**
 * Ethereum-specific configuration
 */
export interface EthereumConfig extends BaseBlockchainConfig {
    type: BlockchainType.ETHEREUM;
    /**
     * Network to connect to (e.g., 'mainnet', 'ropsten', 'rinkeby')
     */
    network: string;
    /**
     * Optional provider URL (if not using default providers)
     */
    providerUrl?: string;
    /**
     * Private key for signing transactions (if not using wallet integration)
     */
    privateKey?: string;
}
/**
 * Hyperledger Fabric specific configuration
 */
export interface HyperledgerFabricConfig extends BaseBlockchainConfig {
    type: BlockchainType.HYPERLEDGER_FABRIC;
    /**
     * Connection profile path or object
     */
    connectionProfile: string | object;
    /**
     * Channel name
     */
    channel: string;
    /**
     * Organization name
     */
    organization: string;
    /**
     * User identity to use
     */
    userId: string;
}
/**
 * Polygon-specific configuration (extends Ethereum config)
 */
export interface PolygonConfig extends BaseBlockchainConfig {
    type: BlockchainType.POLYGON;
    /**
     * Network to connect to (e.g., 'mainnet', 'mumbai')
     */
    network: string;
    /**
     * Optional provider URL (if not using default providers)
     */
    providerUrl?: string;
    /**
     * Private key for signing transactions (if not using wallet integration)
     */
    privateKey?: string;
}
/**
 * Solana-specific configuration
 */
export interface SolanaConfig extends BaseBlockchainConfig {
    type: BlockchainType.SOLANA;
    /**
     * Network to connect to (e.g., 'mainnet-beta', 'devnet', 'testnet')
     */
    network: string;
    /**
     * Optional custom RPC endpoint
     */
    rpcEndpoint?: string;
    /**
     * Private key for signing transactions (if not using wallet integration)
     */
    privateKey?: string;
}
/**
 * Union type for all blockchain configurations
 */
export type BlockchainConfig = EthereumConfig | HyperledgerFabricConfig | PolygonConfig | SolanaConfig;
