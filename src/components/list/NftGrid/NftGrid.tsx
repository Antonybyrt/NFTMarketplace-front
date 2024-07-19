// src/components/NftGrid/NftGrid.tsx
import React from 'react';
import './NftGrid.css';
import { Nft } from '../../../models/nft.model';

interface NftGridProps {
  nfts: Nft[];
}

const NftGrid: React.FC<NftGridProps> = ({ nfts }) => {
  return (
    <div className="nft-grid">
      {nfts.map((nft) => (
        <div key={nft.id} className="nft-item">
          <img className="nft-image" src={nft.image} alt={nft.name} />
          <div className="nft-details">
            <h2 className="nft-title">{nft.name}</h2>
            {nft.description && <p className="nft-description">{nft.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NftGrid;
