// src/app/collection/page.tsx
"use client";

import React from 'react';
import './page.css';
import Banner from '../../components/banner/Banner';
import NftGrid from '../../components/list/NftGrid/NftGrid';

interface Nft {
  id: number;
  name: string;
  image: string;
}

const CollectionPage: React.FC = () => {
  const collectionName = "Your Collection Name";
  const creatorName = "Creator Name";
  const collectionDescription = "This is a description of the collection. It provides an overview of what the collection is about and any other relevant details.";
  const blockchain = "Ethereum";
  const nfts: Nft[] = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    name: `NFT ${index + 1}`,
    image: '/image/Space.jpg', // Utilisation de votre image
  }));

  return (
    <div>
      <Banner collectionName={collectionName} creatorName={creatorName} />
      <div className="collection-details text-left my-8 px-4">
        <p className="description text-lg mb-4">{collectionDescription}</p>
        <p className="blockchain text-base font-semibold">Blockchain: {blockchain}</p>
      </div>
      <NftGrid nfts={nfts} />
    </div>
  );
};

export default CollectionPage;
