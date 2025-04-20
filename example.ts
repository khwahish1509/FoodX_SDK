import { FoodXClient, BlockchainType } from './src/index';

/**
 * Example application demonstrating the FoodX SDK
 */
async function main() {
  console.log('Initializing FoodX SDK...');
  
  // Create a new FoodX client
  const client = new FoodXClient({
    tenant: 'example-company',
    blockchain: {
      type: BlockchainType.ETHEREUM,
      network: 'goerli',
      useTestnet: true
    },
    offline: {
      enabled: true,
      syncInterval: 60000
    },
    apiKey: 'test-api-key',
    baseUrl: 'https://api.example.com'
  });
  
  try {
    console.log('Initializing client...');
    
    // Query blockchain information
    const blockchainInfo = await client.blockchain.getBlockchainInfo();
    console.log('Blockchain info:', blockchainInfo);
    
    // Test offline functionality
    const isOnline = client.offline.isOnline();
    console.log('Online status:', isOnline);
    
    // Get access control configuration
    const accessControl = await client.enterprise.getAccessControl();
    console.log('Access control:', accessControl);
    
    // Get available data types for export
    const dataTypes = await client.compliance.getAvailableDataTypes();
    console.log('Available data types:', dataTypes);
    
    // Get registered plugins
    const plugins = await client.ecosystem.getPlugins();
    console.log('Registered plugins:', plugins);
    
    console.log('Example completed successfully!');
  } catch (error) {
    console.error('Error in example:', error);
  }
}

// Run the example
main().catch(console.error); 