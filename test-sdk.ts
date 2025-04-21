import { 
  FoodXClient, 
  BlockchainType, 
  IBlockchainService, 
  IClient, 
  ClientConfig 
} from './src/index';

/**
 * Test script to verify SDK exports and functionality
 */
async function testSDK() {
  console.log('=== Testing FoodX SDK exports and functionality ===');
  
  // Type checking - verifying the interfaces are properly exported
  const config: ClientConfig = {
    tenant: 'test-tenant',
    blockchain: {
      type: BlockchainType.ETHEREUM,
      network: 'mainnet'
    }
  };
  
  // Create a client
  const client: IClient = new FoodXClient(config);
  
  try {
    // Access a service to verify the client is correctly setup
    const blockchainService: IBlockchainService = client.blockchain;
    console.log('Successfully accessed blockchain service');
    
    // Print available blockchain types to verify enums are exported
    console.log('Available blockchain types:');
    Object.values(BlockchainType).forEach(type => {
      console.log(`  - ${type}`);
    });
    
    console.log('All interfaces successfully imported and used!');
    return 0;
  } catch (error) {
    console.error('Error during SDK test:', error);
    return 1;
  }
}

// Run the test
testSDK()
  .then(exitCode => {
    console.log(`Test completed with exit code: ${exitCode}`);
    process.exit(exitCode);
  })
  .catch(err => {
    console.error('Unhandled error:', err);
    process.exit(1);
  }); 