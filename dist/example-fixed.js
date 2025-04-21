"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
/**
 * Fixed example that properly initializes the SDK with blockchain adapter
 */
async function main() {
    console.log('==============================================');
    console.log('FoodX SDK Fixed Example');
    console.log('==============================================');
    // Create a client
    const client = new index_1.FoodXClient();
    try {
        console.log('Initializing client...');
        // Initialize with configuration
        await client.initialize({
            tenant: 'test-company',
            blockchain: {
                type: index_1.BlockchainType.ETHEREUM,
                network: 'mainnet'
            },
            offline: {
                enabled: false // Disable offline to simplify example
            }
        });
        console.log('Client initialized successfully!');
        // Explicitly configure the blockchain service with the adapter
        // This should normally be done in the FoodXClient.initialize method
        // But we'll call it directly as a workaround
        const blockchainService = client.blockchain;
        // Directly access and configure the blockchain service
        // TypeScript casting to access the protected method
        await blockchainService.configure(index_1.BlockchainType.ETHEREUM, {
            type: index_1.BlockchainType.ETHEREUM,
            network: 'mainnet'
        });
        console.log('Blockchain service configured successfully!');
        // Now we can query the blockchain
        const info = await client.blockchain.getBlockchainInfo();
        console.log('Blockchain info:', JSON.stringify(info, null, 2));
        console.log('==============================================');
        console.log('Example completed successfully!');
        console.log('==============================================');
        // Exit cleanly
        process.exit(0);
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
// Run the example
main();
