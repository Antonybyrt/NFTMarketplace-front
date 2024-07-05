"use client";
import { MintNFT } from '@/components/MintNFT';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Page() {

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}
      >
        <ConnectButton showBalance={true}/>
      </div>
      <div style={{ padding: 20 }}>
        <MintNFT />
      </div>  
    </div>
  );
}

export default Page;
