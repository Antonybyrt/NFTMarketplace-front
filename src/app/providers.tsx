'use client';

import {
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
  } from 'wagmi/chains';
  import {
    QueryClientProvider,
    QueryClient,
  } from "@tanstack/react-query";
  import Test from './page';
  import { AppProps } from 'next/app';
  
  import { NextPage } from 'next';
  import { ReactElement, ReactNode } from 'react';

const config = getDefaultConfig({
    appName: 'NFTMarketplace',
    projectId: '40ffbdb9a70d28b07e3270fc658d1439',
    chains: [mainnet, polygon, optimism, arbitrum, base, hardhat],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
