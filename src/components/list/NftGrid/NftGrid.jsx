// src/components/NftGrid/NftGrid.jsx
import React from 'react';
import './NftGrid.css';

const NftGrid = ({ nfts }) => {
  return (
    <div className="nft-grid">
      {nfts.map(nft => (
        <div key={nft.id} className="nft-item">
          <img className="nft-image" src={nft.image} alt={nft.name} />
          <div className="nft-details">
            <h2 className="nft-title">{nft.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NftGrid;
