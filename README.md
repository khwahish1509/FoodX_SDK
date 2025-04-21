# FoodX SDK

A comprehensive blockchain SDK for food supply chain tracking and management.

## Overview

FoodX SDK provides a simple, unified interface for tracking food products across the entire supply chain, from farm to consumer, using blockchain technology.

Key features:
- Support for multiple blockchain networks (Ethereum, Hyperledger Fabric, Polygon, Solana)
- Offline capabilities for areas with poor internet connectivity
- Built-in compliance and reporting tools
- Enterprise-grade access control and security
- Ecosystem integration with external systems

## Installation

```bash
npm install foodx-sdk
```

## Quick Start

```javascript
import { createClient, BlockchainType } from 'foodx-sdk';

// Create and initialize client
const client = createClient({
  tenant: 'your-company-id',
  blockchain: {
    type: BlockchainType.ETHEREUM,
    network: 'ropsten',
    apiKey: 'your-api-key'
  }
});

// Record a product on the blockchain
await client.blockchain.submitTransaction(
  'ProductRegistry',
  'recordProduct',
  [
    'product-123',
    'Organic Apples',
    'Washington State',
    new Date().toISOString(),
    'batch-456'
  ]
);

// Query product history
const history = await client.blockchain.queryBlockchain(
  'ProductRegistry',
  'getProductHistory',
  ['product-123']
);
```

## Examples

- **[Basic Example](./fixed-example.ts)**: Simple initialization and blockchain interaction.
- **[Supply Chain Example](./supply-chain-example.ts)**: Complete farm-to-store tracking flow.
- **[Real Data Testing](./real-data-test.ts)**: Test with real blockchain networks.

## Testing With Real Data

To test with real blockchain connections instead of mocks, see our [Real Testing Setup Guide](./REAL_TESTING_SETUP.md).

## Enterprise Integration

For companies like Walmart integrating this SDK, the typical workflow is:

1. **Install & Configure**: Add the SDK to your existing systems with company-specific configuration.
2. **Connect Existing Systems**: Integrate with inventory, POS, and other enterprise systems.
3. **Capture Events**: Record key supply chain events (harvest, processing, distribution, retail).
4. **Verify & Trace**: Query the blockchain for complete product history and verification.
5. **Customer Access**: Optionally provide consumers with product journey information.

## License

MIT

## Support

For technical support, please contact support@foodx-sdk.example.com 