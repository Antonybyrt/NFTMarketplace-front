// components/NftCard/NftCard.jsx
import React from "react";
import Link from 'next/link';
import './NftCard.css';

const NftCard = ({ collection }) => {
  console.log('Rendering NftCard with collection:', collection);

  return (
    <Link href={`/collection/`} legacyBehavior>
      <a className="nft-card max-w-sm rounded overflow-hidden shadow-lg bg-white inline-block cursor-pointer">
        <img
          className="w-full h-48 object-cover"
          src="/image/Space.jpg" // Remplacez par collection.image si vous avez une image dans votre collection
          alt={collection.name}
        />
        <div className="p-4">
          <h1 className="text-gray-700 font-bold text-xl mb-4">{collection.name}</h1>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">Symbol: </span>{collection.symbol}
          </p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">Address: </span>{collection.address}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default NftCard;
