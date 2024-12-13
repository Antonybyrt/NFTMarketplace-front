import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Nouvelle URL de RPC pour le réseau local
      chainId: 31337,
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/iKVrGJ4H4ecBFESYg3F6rOmnCnrfSEaV',
      accounts: [`0x68cee2f097c10a638bc332616274af08bedcefce1fb0ba51fe86bc81826047f7`]
    },
    /*mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },*/
  },
};

export default config;