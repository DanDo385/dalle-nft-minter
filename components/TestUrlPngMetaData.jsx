// TestUrlPngMetaData.jsx
import React, { useState, useEffect } from 'react';

const TestUrlPngMetaData = () => {
  const [metadata, setMetadata] = useState({});
  const [imageValid, setImageValid] = useState(false);

  useEffect(() => {
    // Retrieve the metadata from localStorage
    const savedMetadata = localStorage.getItem('recentNFT');
    if (savedMetadata) {
      setMetadata(JSON.parse(savedMetadata));
    }
  }, []);

  // Check if the image URL ends with .png and the metadata has the required properties
  const checkImageAndMetadata = () => {
    const isValidImage = metadata.image?.endsWith('.png');
    setImageValid(isValidImage);

    // Store the metadata in localStorage
    localStorage.setItem('recentNFT', JSON.stringify(metadata));
  };

  return (
    <div>
      <h2>NFT Attributes and Test</h2>
      <button onClick={checkImageAndMetadata}>Test</button>
      {imageValid ? (
        <p>The image URL is valid and ends with .png</p>
      ) : (
        <p>The image URL is not valid or does not end with .png</p>
      )}
      {metadata.image && (
        <img src={metadata.image} alt={metadata.name} width="250" height="250" />
      )}
      <ul>
        <li>Name: {metadata.name || 'Not set'}</li>
        <li>Description: {metadata.description || 'Not set'}</li>
        <li>Image URL is valid: {imageValid ? 'Yes' : 'No'}</li>
        <li>Image URL ends with .png: {metadata.image?.endsWith('.png') ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  );
};

export default TestUrlPngMetaData;
