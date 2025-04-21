import { 
  FoodXClient, 
  BlockchainType, 
  ClientConfig,
  TransactionOptions,
  TransactionResult
} from './src/index';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Environment variables should be set for real connections
// ETHEREUM_API_KEY=your_api_key
// ETHEREUM_PROVIDER_URL=https://mainnet.infura.io/v3/your_infura_key
// ETHEREUM_PRIVATE_KEY=your_private_key

async function testWithRealData() {
  console.log('Starting FoodX SDK test with real blockchain data');
  
  // Create real configuration with actual API keys
  const clientConfig: ClientConfig = {
    tenant: 'test-company',
    blockchain: {
      type: BlockchainType.ETHEREUM,
      network: process.env.ETHEREUM_NETWORK || 'ropsten', // Use testnet
      apiKey: process.env.ETHEREUM_API_KEY,
      providerUrl: process.env.ETHEREUM_PROVIDER_URL,
      privateKey: process.env.ETHEREUM_PRIVATE_KEY
    }
  };
  
  // Create client with real config
  const client = new FoodXClient();
  
  try {
    // Initialize with real config
    console.log('Initializing client with real blockchain connection...');
    await client.initialize(clientConfig);
    
    // Get blockchain info - this will use a real connection
    console.log('Fetching real blockchain info...');
    const blockchainInfo = await client.blockchain.getBlockchainInfo();
    console.log('Blockchain info:', JSON.stringify(blockchainInfo, null, 2));
    
    // Submit real transaction (if private key is provided)
    if (process.env.ETHEREUM_PRIVATE_KEY) {
      console.log('Submitting a real blockchain transaction...');
      
      const productData = {
        id: 'PROD-' + Date.now(),
        name: 'Organic Apples',
        origin: 'Washington State Farms',
        harvestDate: new Date().toISOString(),
        batchNumber: 'BATCH-' + Math.floor(Math.random() * 10000)
      };
      
      const options: TransactionOptions = {
        gasLimit: 300000
      };
      
      // Use the correct parameter structure for submitTransaction
      const txResult: TransactionResult = await client.blockchain.submitTransaction(
        process.env.CONTRACT_ADDRESS || 'ProductRegistry',  // contractName
        'recordProduct',                                   // functionName
        [                                                  // args as string array
          productData.id,
          productData.name,
          productData.origin,
          productData.harvestDate,
          productData.batchNumber
        ],
        options                                           // options
      );
      
      console.log('Transaction submitted successfully!');
      console.log('Transaction hash:', txResult.transactionId);
      console.log('Block number:', txResult.blockNumber);
    } else {
      console.log('No private key provided, skipping transaction submission');
    }
    
    console.log('Test completed successfully');
    return 0;
  } catch (error) {
    console.error('Error during real data test:', error);
    return 1;
  }
}

// Run the test
testWithRealData()
  .then(exitCode => {
    console.log(`Test exited with code: ${exitCode}`);
    process.exit(exitCode);
  })
  .catch(err => {
    console.error('Unhandled error:', err);
    process.exit(1);
  }); 