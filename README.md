# Spicy Donut Market Project

To make the project work : 

launch the nodes :
```shell
npx hardhat node
```

compile the contracts :
```shell
npx hardhat run --network localhost scripts/deploy.ts
```

### Configure your Metamask wallet by creating a local network :
Network Name: localhost  
New RPC URL: http://127.0.0.1:8545/  
Chain ID: 31337 (default for Hardhat)  
Currency Symbol: ETH (optional)  
Block Explorer URL: (leave blank)

### Using Next.js, Wagmi and RainbowKit

run the front end : 
```shell
npm run dev
```

Don't forget to install dependencies.