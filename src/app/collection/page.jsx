// src/app/collection/page.jsx
"use client";

import React from 'react';
import './page.css';
import Banner from '../../components/Banner/Banner';
import NftGrid from '../../components/list/NftGrid/NftGrid';

const CollectionPage = () => {
  const collectionName = "Your Collection Name";
  const creatorName = "Creator Name";
  const collectionDescription = "This is a description of the collection. It provides an overview of what the collection is about and any other relevant details.";
  const blockchain = "Ethereum";
  const nfts = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    name: `NFT ${index + 1}`,
    image: '/image/Space.jpg', // Utilisation de votre image
  }));

  return (
    <div>
      <Banner collectionName={collectionName} creatorName={creatorName} />
      <div className="collection-details text-center my-8">
        <p className="description text-lg mb-4">{collectionDescription}</p>
        <p className="blockchain text-base font-semibold">Blockchain: {blockchain}</p>
      </div>
      <NftGrid nfts={nfts} />
    </div>
  );
};

export default CollectionPage;
