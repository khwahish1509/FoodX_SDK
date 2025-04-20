import { FoodXClient, BlockchainType } from './src/index';

/**
 * Simple example to verify the SDK works
 */
async function main() {
  console.log('==========================================');
  console.log('FoodX SDK Simple Example');
  console.log('==========================================');
  
  // Create a client
  const client = new FoodXClient();
  
  try {
    console.log('Initializing client...');
    
    // Initialize with minimal configuration
    await client.initialize({
      tenant: 'test-company',
      blockchain: {
        type: BlockchainType.ETHEREUM,
        network: 'mainnet'
      }
    });
    
    console.log('Client initialized successfully!');
    
    // Get blockchain info
    const info = await client.blockchain.getBlockchainInfo();
    console.log('Blockchain info:', JSON.stringify(info, null, 2));
    
    console.log('==========================================');
    console.log('Example completed successfully!');
    console.log('==========================================');
    
    // Exit cleanly
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the example
main(); 