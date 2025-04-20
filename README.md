# FoodX SDK

A modular blockchain-based decentralized platform for food traceability and supply chain management.

## Key Features

1. **Multi-Chain Agnosticism**
   - Supports both private chains (Hyperledger Fabric) and public networks (Ethereum, Polygon, Solana)
   - Unified API interface that abstracts chain-specific details
   - Per-tenant blockchain configuration and hybrid approaches

2. **Offline-First Client SDK**
   - Resilient client library with persistent local storage
   - Deterministic conflict resolution for offline data synchronization
   - Intelligent sync mechanisms with configurable retry strategies

3. **Developer-First Experience**
   - OpenAPI 3.0 specification as the single source of truth
   - Auto-generated strongly-typed client libraries
   - CLI tool for project scaffolding with sensible defaults

4. **Enterprise Controls**
   - Fine-grained, attribute-based access control
   - Hierarchical API keys with scope restrictions
   - Tiered rate limiting and comprehensive audit logging

5. **Compliance & Reporting**
   - Flexible data export framework supporting multiple formats
   - Digital signatures and verification for all exported data
   - Configurable data retention and archiving policies

6. **Ecosystem & Extensibility**
   - Clean plugin architecture using dependency injection
   - Webhook system with retry and delivery confirmation
   - Analytics framework that can be extended with custom metrics

## Installation

```bash
npm install foodx-sdk
```

## Quick Start

```typescript
import { FoodXClient } from 'foodx-sdk';

// Initialize the client with configuration
const client = new FoodXClient({
  tenant: 'acme-foods',
  blockchain: {
    type: 'ethereum',
    network: 'rinkeby',
    apiKey: process.env.ETHEREUM_API_KEY
  },
  offline: {
    enabled: true,
    syncInterval: 60000 // 1 minute
  }
});

// Record a product movement with automatic offline support
await client.supplyChain.recordMovement({
  productId: 'PROD-12345',
  from: 'FARM-001',
  to: 'DISTRIBUTOR-003',
  timestamp: new Date(),
  metadata: {
    temperature: 4.2,
    humidity: 73
  }
});
```

## Documentation

For full documentation and examples, visit our [documentation site](https://docs.foodx-sdk.example).

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Generate client libraries from OpenAPI spec
npm run generate-clients

# Start the CLI
npm run start:cli
```

## License

MIT 