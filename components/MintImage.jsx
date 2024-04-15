// components/MintImage.jsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from '../build/ImageMinterABI.json';

const contractAddress = require('../build/DeployedAddress.json').address;

const MintImage = ({ imageUrl, imageName, imageDescription }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mintedNft, setMintedNft] = useState(null);

  // Function to set up an event listener for the ImageMinted event
  const listenForMintEvent = (contract, signerAddress) => {
    contract.on('ImageMinted', (minter, tokenId, tokenURI, name, description) => {
      if (minter.toLowerCase() === signerAddress.toLowerCase()) {
        setMintedNft({ tokenURI, name, description });
        alert('Image minted successfully!');
        setIsMinting(false);
      }
    });
  };

  const mintImage = async () => {
    if (!imageUrl || !imageName || !imageDescription) {
      setErrorMessage('All fields must be filled out.');
      return;
    }

    setIsMinting(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Set up the event listener for the minting event
      listenForMintEvent(contract, signerAddress);

      // Perform the minting operation
      await contract.mintImage(imageUrl, imageName, imageDescription);
      // The event listener will handle the rest after the minting operation.
    } catch (error) {
      console.error('Minting error:', error);
      setErrorMessage(`Minting failed: ${error.message || 'Unknown error occurred'}`);
      setIsMinting(false);
    }
  };

  // Clean up the event listener when the component is unmounted
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    return () => {
      contract.removeAllListeners('ImageMinted');
    };
  }, []);

  return (
    <div>
      <button
        onClick={mintImage}
        disabled={isMinting || !imageUrl || !imageName || !imageDescription}
        className="bg-black text-white p-2 w-full mt-4 hover:bg-green-400 transition-colors duration-300"
      >
        {isMinting ? 'Minting...' : 'Mint Image'}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {mintedNft && (
        <div className="mt-4">
          <p><strong>Name:</strong> {mintedNft.name}</p>
          <p><strong>Description:</strong> {mintedNft.description}</p>
          <img src={mintedNft.tokenURI} alt={mintedNft.name} style={{ width: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default MintImage;
