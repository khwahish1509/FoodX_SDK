import { 
  FoodXClient, 
  BlockchainType, 
  ClientConfig
} from './src/index';
import { config } from 'dotenv';
import * as readline from 'readline';

// Load environment variables
config();

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Product tracking class to simulate a real product journey
class ProductJourney {
  private client: FoodXClient;
  private productId: string;
  private batchId: string;
  
  constructor(client: FoodXClient) {
    this.client = client;
    // Generate unique IDs for this product batch
    this.productId = 'PROD-' + Date.now();
    this.batchId = 'BATCH-' + Math.floor(Math.random() * 10000);
  }
  
  // Record initial product harvest at the farm
  async recordHarvest(farmData: any): Promise<void> {
    console.log(`Recording harvest of product ${this.productId} from ${farmData.name}...`);
    
    try {
      await this.client.blockchain.submitTransaction(
        'ProductRegistry', 
        'recordHarvest',
        [
          this.productId,
          this.batchId,
          farmData.name,
          farmData.location,
          farmData.harvestDate,
          JSON.stringify(farmData.metrics)
        ]
      );
      
      console.log('✅ Harvest recorded successfully on blockchain');
    } catch (error) {
      console.error('Failed to record harvest:', error);
      throw error;
    }
  }
  
  // Record food processing event
  async recordProcessing(processingData: any): Promise<void> {
    console.log(`Recording processing of product ${this.productId} at ${processingData.facilityName}...`);
    
    try {
      await this.client.blockchain.submitTransaction(
        'ProductRegistry',
        'recordProcessing',
        [
          this.productId,
          this.batchId,
          processingData.facilityName,
          processingData.facilityLocation,
          processingData.processingDate,
          JSON.stringify(processingData.processType),
          JSON.stringify(processingData.qualityChecks)
        ]
      );
      
      console.log('✅ Processing recorded successfully on blockchain');
    } catch (error) {
      console.error('Failed to record processing:', error);
      throw error;
    }
  }
  
  // Record distribution event
  async recordDistribution(distributionData: any): Promise<void> {
    console.log(`Recording distribution of product ${this.productId} to ${distributionData.destination}...`);
    
    try {
      await this.client.blockchain.submitTransaction(
        'ProductRegistry',
        'recordDistribution',
        [
          this.productId,
          this.batchId,
          distributionData.departureLocation,
          distributionData.destination,
          distributionData.shipDate,
          distributionData.carrierInfo,
          JSON.stringify(distributionData.conditions)
        ]
      );
      
      console.log('✅ Distribution recorded successfully on blockchain');
    } catch (error) {
      console.error('Failed to record distribution:', error);
      throw error;
    }
  }
  
  // Record retail stocking event
  async recordRetailStocking(retailData: any): Promise<void> {
    console.log(`Recording retail stocking of product ${this.productId} at ${retailData.storeName}...`);
    
    try {
      await this.client.blockchain.submitTransaction(
        'ProductRegistry',
        'recordRetailStocking',
        [
          this.productId,
          this.batchId,
          retailData.storeName,
          retailData.storeLocation,
          retailData.stockingDate,
          retailData.stockingEmployee,
          retailData.shelfLocation,
          retailData.expirationDate
        ]
      );
      
      console.log('✅ Retail stocking recorded successfully on blockchain');
    } catch (error) {
      console.error('Failed to record retail stocking:', error);
      throw error;
    }
  }
  
  // Verify the complete journey of a product
  async verifyProductJourney(): Promise<void> {
    console.log(`Verifying complete journey of product ${this.productId}...`);
    
    try {
      const journeyData = await this.client.blockchain.queryBlockchain(
        'ProductRegistry',
        'getProductJourney',
        [this.productId]
      );
      
      console.log('\n📋 COMPLETE PRODUCT JOURNEY:');
      console.log(JSON.stringify(journeyData, null, 2));
      
      // Check if the journey is complete
      const isComplete = this.verifyCompleteness(journeyData);
      console.log(`\nJourney completeness: ${isComplete ? '✅ Complete' : '❌ Incomplete'}`);
      
      return journeyData;
    } catch (error) {
      console.error('Failed to verify product journey:', error);
      throw error;
    }
  }
  
  // Helper method to verify all stages are present
  private verifyCompleteness(journey: any): boolean {
    const requiredStages = ['harvest', 'processing', 'distribution', 'retail'];
    const presentStages = Object.keys(journey).filter(key => 
      requiredStages.includes(key) && journey[key] !== null && journey[key] !== undefined
    );
    
    return presentStages.length === requiredStages.length;
  }
  
  // Get the product ID for reference
  getProductId(): string {
    return this.productId;
  }
  
  // Get the batch ID for reference
  getBatchId(): string {
    return this.batchId;
  }
}

// Main function to run the example
async function runSupplyChainExample() {
  console.log('=== FoodX SDK Supply Chain Example ===');
  
  // Configure client
  const clientConfig: ClientConfig = {
    tenant: process.env.TENANT_ID || 'example-company',
    blockchain: {
      type: BlockchainType.ETHEREUM,
      network: process.env.ETHEREUM_NETWORK || 'ropsten',
      apiKey: process.env.ETHEREUM_API_KEY,
      providerUrl: process.env.ETHEREUM_PROVIDER_URL,
      privateKey: process.env.ETHEREUM_PRIVATE_KEY
    }
  };
  
  // Create and initialize client
  const client = new FoodXClient();
  
  try {
    console.log('Initializing FoodX client...');
    await client.initialize(clientConfig);
    console.log('FoodX client initialized successfully');
    
    // Create a new product journey
    const journey = new ProductJourney(client);
    console.log(`Created new product journey with ID: ${journey.getProductId()}`);
    console.log(`Batch ID: ${journey.getBatchId()}`);
    
    // Simulate the complete supply chain with user prompts
    await promptForInput('Press Enter to record harvest event...', async () => {
      // Record harvest with real data
      const harvestData = {
        name: 'Sunshine Organic Farms',
        location: 'Fresno, CA',
        harvestDate: new Date().toISOString(),
        metrics: {
          soilQuality: 'Grade A',
          organicCertification: 'USDA Organic',
          fertilizers: 'None',
          pesticides: 'None',
          waterSource: 'Well water, tested quarterly'
        }
      };
      
      await journey.recordHarvest(harvestData);
    });
    
    await promptForInput('Press Enter to record processing event...', async () => {
      // Record processing with real data
      const processingData = {
        facilityName: 'FreshPack Processing Center',
        facilityLocation: 'Modesto, CA',
        processingDate: new Date().toISOString(),
        processType: {
          name: 'Washing and Packaging',
          certifications: ['ISO 22000', 'HACCP Compliant']
        },
        qualityChecks: {
          pesticide_residue: 'Pass',
          microbiological_safety: 'Pass',
          physical_inspection: 'Pass',
          temperature_control: '34F'
        }
      };
      
      await journey.recordProcessing(processingData);
    });
    
    await promptForInput('Press Enter to record distribution event...', async () => {
      // Record distribution with real data
      const distributionData = {
        departureLocation: 'FreshPack Distribution Center, Modesto, CA',
        destination: 'Walmart Distribution Center, Dallas, TX',
        shipDate: new Date().toISOString(),
        carrierInfo: 'FreshFreight Logistics #TR-78901',
        conditions: {
          temperature_range: '33F-38F',
          humidity: '85-95%',
          transport_mode: 'Refrigerated Truck',
          inspections: [{
            location: 'Arizona Border Checkpoint',
            timestamp: new Date(Date.now() - 2*60*60*1000).toISOString(),
            inspector: 'FDA Agent J. Smith',
            result: 'Pass'
          }]
        }
      };
      
      await journey.recordDistribution(distributionData);
    });
    
    await promptForInput('Press Enter to record retail stocking event...', async () => {
      // Record retail stocking with real data
      const retailData = {
        storeName: 'Walmart Supercenter',
        storeLocation: 'Dallas, TX Store #4217',
        stockingDate: new Date().toISOString(),
        stockingEmployee: 'Employee ID: WM42891',
        shelfLocation: 'Produce Section A3',
        expirationDate: new Date(Date.now() + 7*24*60*60*1000).toISOString() // 7 days later
      };
      
      await journey.recordRetailStocking(retailData);
    });
    
    await promptForInput('Press Enter to verify the complete product journey...', async () => {
      // Query and display the complete journey
      await journey.verifyProductJourney();
    });
    
    console.log('\n=== Supply Chain Example Completed Successfully ===');
    return 0;
  } catch (error) {
    console.error('Error in supply chain example:', error);
    return 1;
  } finally {
    rl.close();
  }
}

// Helper function to prompt for user input
function promptForInput(promptText: string, callback: () => Promise<void>): Promise<void> {
  return new Promise((resolve) => {
    rl.question(`\n${promptText}`, async () => {
      try {
        await callback();
        resolve();
      } catch (error) {
        console.error('Error in prompt callback:', error);
        resolve();
      }
    });
  });
}

// Run the example
runSupplyChainExample()
  .then(exitCode => {
    console.log(`\nExample completed with exit code: ${exitCode}`);
    process.exit(exitCode);
  })
  .catch(err => {
    console.error('\nUnhandled error in example:', err);
    process.exit(1);
  }); 