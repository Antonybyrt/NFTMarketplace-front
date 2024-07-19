import React, { useEffect, useState, useRef } from "react";
import NftCard from "../NftCard/NftCard";
import './NftCardList.css';

// Définition du type pour les collections NFT
interface NftCollection {
  id: string;
  name: string;
  symbol: string;
  address: string;
  image?: string; // Si vous avez une image dans votre collection
}

const NftCardList: React.FC = () => {
  const [nftCollections, setNftCollections] = useState<NftCollection[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('http://localhost:6789/collection/');
        const data = await response.json();
        setNftCollections(data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
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
          <NftCard key={collection.id} collection={collection} />
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
