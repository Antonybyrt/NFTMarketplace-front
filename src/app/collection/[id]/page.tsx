// src/app/collection/[id]/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import './page.css';
import Banner from '../../../components/banner/Banner';
import NftGrid from '../../../components/list/NftGrid/NftGrid';
import { fetchNftsByPackId, fetchCollectionById } from '../../../service/nftCollection.service';
import { Nft } from '../../../models/nft.model';
import { NftCollection } from '../../../models/nftCollection.model';

const CollectionPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [collection, setCollection] = useState<NftCollection | null>(null);
  const [nfts, setNfts] = useState<Nft[]>([]);
  const params = useParams();
  const id = params?.id as string | string[];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !id) {
      return;
    }

    const collectionId = Array.isArray(id) ? id[0] : id;

    const fetchData = async () => {
      try {
        const collectionData = await fetchCollectionById(collectionId);
        setCollection(collectionData);

        const nftData = await fetchNftsByPackId(collectionId);
        setNfts(nftData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [mounted, id]);

  if (!collection) {
    return <div>Loading...</div>;
  }

  const creatorFullName = `${collection.user.firstname} ${collection.user.name}`;

  return (
    <div>
      <Banner collectionName={collection.name} creatorName={creatorFullName} />
      <div className="collection-details text-left my-8 px-4">
        <p className="description text-lg mb-4">{collection.description || "No description available."}</p>
        <p className="blockchain text-base font-semibold">Blockchain: Ethereum</p>
      </div>
      <NftGrid nfts={nfts} />
    </div>
  );
};

export default CollectionPage;
