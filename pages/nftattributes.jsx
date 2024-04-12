// pages/nftattributes.jsx
import React, { useEffect, useState } from 'react';
import TestUrlPngMetaData from '../components/TestUrlPngMetaData';

const NFTAttributesPage = () => {
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    // Retrieve the metadata from localStorage
    const savedMetadata = localStorage.getItem('recentNFT');
    if (savedMetadata) {
      setMetadata(JSON.parse(savedMetadata));
    }
  }, []);

  return (
    <div>
      <h1>NFT Attributes and Test</h1>
      <TestUrlPngMetaData metadata={metadata} />
    </div>
  );
};

export default NFTAttributesPage;
