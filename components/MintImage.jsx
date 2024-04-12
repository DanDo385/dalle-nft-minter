// components/MintImage.jsx
import { useState } from 'react';
import { ethers } from 'ethers';

// Adjust these paths to correctly point to where your ABI and deployed address JSON files are located.
const contractABI = require('../build/ImageMinterABI.json');
const contractAddress = require('../build/DeployedAddress.json').address;

const MintImage = ({ imageUrl, imageName, imageDescription }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const mintImage = async () => {
    setErrorMessage('');

    if (!window.ethereum) {
      setErrorMessage('MetaMask is not installed. Please install MetaMask to use this feature.');
      return;
    }

    setIsMinting(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await contract.mintImage(imageUrl, imageName, imageDescription);
      await transaction.wait();

      alert('Image minted successfully!');
      setIsMinting(false);
    } catch (error) {
      console.error('Minting error:', error);
      setErrorMessage(`Minting failed: ${error.message}`);
      setIsMinting(false);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={mintImage}
          disabled={isMinting}
          className="bg-black text-white p-2 w-full mt-4 hover:bg-green-400 transition-colors duration-300"
        >
          {isMinting ? 'Minting...' : 'Mint Image'}
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </>
  );
};

export default MintImage;



