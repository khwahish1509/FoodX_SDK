# Testing FoodX SDK with Real Blockchain Networks

This guide explains how to properly set up and test the FoodX SDK with real blockchain networks instead of mocks.

## Prerequisites

1. Install dependencies:
   ```bash
   npm install dotenv --save-dev
   ```

2. Create an account with a blockchain provider:
   - For Ethereum: [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/)
   - For Polygon: [Polygon RPC](https://polygon.technology/developers)
   - For Solana: [QuickNode](https://www.quicknode.com/)
   - For Hyperledger Fabric: Set up a local test network

## Setting Up Environment Variables

1. Edit the `.env` file in the project root with your actual credentials:

```
# Ethereum settings
ETHEREUM_NETWORK=ropsten         # Use a testnet, not mainnet for testing
ETHEREUM_API_KEY=your_api_key    # From Infura/Alchemy
ETHEREUM_PROVIDER_URL=https://ropsten.infura.io/v3/your_project_id
ETHEREUM_PRIVATE_KEY=0x12345...  # Must be prefixed with 0x

# Smart contract details
CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890

# Tenant settings  
TENANT_ID=test-company-123
```

## Important Notes for Real Blockchain Connections

1. **Private Key Format**: 
   - Ethereum private keys must be prefixed with `0x`
   - Example: `ETHEREUM_PRIVATE_KEY=0x1234abcd...`
   - Never commit private keys to version control

2. **Test Networks**:
   - Always use test networks (Ropsten, Rinkeby, Mumbai, etc.) for testing
   - Test ETH/MATIC can be obtained from faucets:
     - [Ropsten Faucet](https://faucet.ropsten.be/)
     - [Mumbai Faucet](https://faucet.polygon.technology/)

3. **Smart Contract**:
   - You need a deployed smart contract for transactions
   - For testing, you can use a test contract or deploy your own

## Running the Tests

1. Run the basic test:
   ```bash
   npx ts-node real-data-test.ts
   ```

2. Run the interactive supply chain example:
   ```bash
   npx ts-node supply-chain-example.ts
   ```

## Troubleshooting

1. **Connection Issues**:
   - Check that your API key is valid
   - Verify the endpoint URL is correct
   - Make sure your network name matches the provider's network name

2. **Transaction Errors**:
   - Ensure your private key has sufficient funds
   - Check that the contract address exists on the network
   - Verify contract method names and parameters

3. **Private Key Errors**:
   - Make sure the private key is in the correct format (0x prefix for Ethereum)
   - Verify the key has permissions to interact with the contract

## Security Warning

Never use production private keys or API keys in test environments. Create separate keys for testing purposes.

## Mock Testing

If you don't have access to blockchain provider credentials, you can modify the tests to use mock data by:

1. Editing `src/blockchain/adapters/EthereumAdapter.ts` to return mock data instead of making real blockchain calls
2. Setting a flag in your tests to use mock mode 