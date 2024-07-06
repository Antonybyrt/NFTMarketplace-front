'use client';

import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  hardhat,
  sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { http } from 'viem'

export const config = getDefaultConfig({
    appName: 'NFTMarketplace',
    projectId: '40ffbdb9a70d28b07e3270fc658d1439',
    chains: [mainnet, polygon, optimism, arbitrum, base, hardhat],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [hardhat.id]: http(),
    }
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode theme={darkTheme()}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}