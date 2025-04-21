import { FoodXClient, BlockchainType, IBlockchainService } from './src/index';

/**
 * Fixed example that properly initializes the SDK with blockchain adapter
 */
async function main() {
  console.log('==============================================');
  console.log('FoodX SDK Fixed Example');
  console.log('==============================================');
  
  // Create a client
  const client = new FoodXClient();
  
  try {
    console.log('Initializing client...');
    
    // Initialize with configuration
    await client.initialize({
      tenant: 'test-company',
      blockchain: {
        type: BlockchainType.ETHEREUM,
        network: 'mainnet'
      },
      offline: {
        enabled: false // Disable offline to simplify example
      }
    });
    
    console.log('Client initialized successfully!');
    
    // Get access to the blockchain service
    const blockchainService = client.blockchain;
    
    // Cast and configure 
    await (blockchainService as any).configure(
      BlockchainType.ETHEREUM,
      {
        type: BlockchainType.ETHEREUM,
        network: 'mainnet'
      }
    );
    
    console.log('Blockchain service configured successfully!');
    
    // Get blockchain info
    const info = await blockchainService.getBlockchainInfo();
    console.log('Blockchain info:', JSON.stringify(info, null, 2));
    
    // Get access control configuration 
    const accessControl = await client.enterprise.getAccessControl();
    console.log('Access control:', JSON.stringify(accessControl, null, 2));
    
    console.log('==============================================');
    console.log('Example completed successfully!');
    console.log('==============================================');
    
    // Exit cleanly
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the example
main(); 