import { FoodXClient, BlockchainType } from './src/index';

/**
 * Example application demonstrating the FoodX SDK
 */
async function main() {
  console.log('Initializing FoodX SDK...');
  
  try {
    // Create a new FoodX client without auto-initialization
    const client = new FoodXClient();
    
    // Initialize the client manually with minimal config
    await client.initialize({
      tenant: 'example-company',
      blockchain: {
        type: BlockchainType.ETHEREUM,
        network: 'goerli',
        useTestnet: true
      },
      offline: {
        enabled: false // Disable offline to simplify example
      }
    });
    
    console.log('Client initialized successfully');
    
    // Query blockchain information
    const blockchainInfo = await client.blockchain.getBlockchainInfo();
    console.log('Blockchain info:', blockchainInfo);
    
    // Test if enterprise service is available
    const accessControl = await client.enterprise.getAccessControl();
    console.log('Access control:', accessControl);
    
    console.log('Example completed successfully!');
  } catch (error) {
    console.error('Error in example:', error);
  }
}

// Run the example
main(); 