import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export function getConfig() {
  // return createConfig({
  //   chains: [mainnet, sepolia],
  //   connectors: [
  //     injected(),
  //     coinbaseWallet(),
  //     walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }),
  //   ],
  //   storage: createStorage({
  //     storage: cookieStorage,
  //   }),
  //   ssr: true,
  //   transports: {
  //     [mainnet.id]: http(),
  //     [sepolia.id]: http(),
  //   },
  // })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>  
  }
}

// const mintNft = async () => {
  //   if (!signer || !isConnected) {
  //     alert('Please connect your wallet');
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const nftFactoryContract = new ethers.Contract(NFT_FACTORY_ADDRESS, NFTFactoryABI.abi, address);
  //     const tx = await nftFactoryContract.generateNFT('MyNFT', 'MNFT');
  //     await tx.wait();
  //     alert('NFT generated successfully!');
  //   } catch (error) {
  //     console.error(error);
  //     alert('Failed to generate NFT');
  //   } finally {
  //     setLoading(false);
  //   }
  // };