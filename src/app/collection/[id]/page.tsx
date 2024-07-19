"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import './page.css';
import Banner from '../../../components/banner/Banner';
import NftGrid from '../../../components/list/NftGrid/NftGrid';
import { fetchNftsByPackId } from '../../../service/nftCollection.service';
import { Nft } from '../../../models/nft.model';

const CollectionPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const id = params?.id as string | string[];
  const collectionName = "Your Collection Name";
  const creatorName = "Creator Name";
  const collectionDescription = "This is a description of the collection. It provides an overview of what the collection is about and any other relevant details.";
  const blockchain = "Ethereum";
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !id) {
      return;
    }

    const collectionId = Array.isArray(id) ? id[0] : id;

    const fetchNfts = async () => {
      try {
        const data = await fetchNftsByPackId(collectionId);
        setNfts(data);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    };

    fetchNfts();
  }, [mounted, id]);

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
