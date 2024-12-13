# Spicy Donut Market Project

To make the project work :

Compile the contracts :
```shell
npx hardhat compile
```

## Deploy the project locally :

### Configure your Metamask wallet by creating a local network :
Network Name: localhost  
New RPC URL: http://127.0.0.1:8545/  
Chain ID: 31337 (default for Hardhat)  
Currency Symbol: ETH (optional)  
Block Explorer URL: (leave blank)

Launch the nodes :
```shell
npx hardhat node
```

Deploy the contracts :
```shell
npx hardhat run --network localhost scripts/deploy.ts
```

## Deploy the project on the sepolia testnet :

No need to launch the nodes.

Deploy the contracts :
```shell
npx hardhat run --network sepolia scripts/deploy.ts
```

### Configure your Metamask wallet by adding the sepolia network :
Network Name: sepolia  
New RPC URL: https://eth-sepolia.g.alchemy.com/v2/${your-alchemy-api-key}  
Chain ID: 11155111 (default for Sepolia)  
Currency Symbol: ETH   
Block Explorer URL: https://sepolia.etherscan.io

### Using Next.js, Wagmi and RainbowKit

run the front end : 
```shell
npm run dev
```

Don't forget to install dependencies in the main and the hardhat directory after pulling.
