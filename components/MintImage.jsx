//components/MintImage.jsx

import React, { useState } from 'react';
import { ethers } from 'ethers';

const contractABI = require('../build/ImageMinterABI.json');
const contractAddress = require('../build/DeployedAddress.json').address;

const MintImage = ({ imageUrl, imageName, imageDescription }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const mintImage = async () => {
    if (!imageUrl || !imageName || !imageDescription) {
      setErrorMessage('All fields must be filled out.');
      return;
    }

    setIsMinting(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

    try {
      const transaction = await contract.mintImage(imageUrl, imageName, imageDescription);
      await transaction.wait();
      alert('Image minted successfully!');
    } catch (error) {
      console.error('Minting error:', error);
      setErrorMessage(`Minting failed: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsMinting(false);
    }
  };

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
    </div>
  );
};

export default MintImage;
