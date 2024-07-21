import React, { useEffect, useState, useRef } from "react";
import NftCard from "../NftCard/NftCard";
import './NftCardList.css';
import { NftCollection } from '../../../models/nftCollection.model';
import { fetchNftCollections } from '../../../service/nftCollection.service';

const NftCardList: React.FC = () => {
  const [nftCollections, setNftCollections] = useState<NftCollection[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const data = await fetchNftCollections();
        setNftCollections(data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    getCollections();
  }, []);

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative nft-card-list-container">
      <h2 className="nft-card-list-title text-2xl font-bold mb-4">Titre de la Collection</h2>
      <button className="scroll-button left" onClick={scrollLeft}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div ref={listRef} className="nft-card-list flex overflow-x-auto space-x-4">
        {nftCollections.map((collection) => (
          <NftCard key={collection._id} collection={collection} />
        ))}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default NftCardList;
