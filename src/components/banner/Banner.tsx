// src/components/Banner/Banner.tsx
"use client";

import React, { useState, useEffect } from 'react';
import './Banner.css';

interface BannerProps {
  collectionName: string;
  creatorName: string;
}

const Banner: React.FC<BannerProps> = ({ collectionName, creatorName }) => {
  const images = ['/image/spicyDonut.png', '/image/logo.png'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="banner-container">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <div className="nft-image-container">
            <img src={images[currentImageIndex]} alt="NFT" className="nft-image" />
          </div>
          <div className="text-content">
            <h1 className="banner-title">{collectionName}</h1>
            <p className="creator-name">{creatorName}</p>
          </div>
        </div>
        <div className="gradient-overlay"></div>
      </div>
    </>
  );
};

export default Banner;
