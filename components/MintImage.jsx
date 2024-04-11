// components/MintImage.jsx
import { useState } from 'react';
import { ethers } from 'ethers';

// Adjust these paths to correctly point to where your ABI and deployed address JSON files are located.
const contractABI = require('../build/ImageMinterABI.json');
const contractAddressData = require('../build/DeployedAddress.json');
const contractAddress = contractAddressData.address; // Assuming the JSON structure is { "address": "YOUR_DEPLOYED_CONTRACT_ADDRESS" }

const MintImage = ({ imageUrl }) => {
  const [isMinting, setIsMinting] = useState(false);

  const mintImage = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    try {
      setIsMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI.abi, signer); // Make sure to use contractABI.abi if your ABI file exports an object with an abi key

      const transaction = await contract.mintImage(imageUrl);
      await transaction.wait();

      setIsMinting(false);
      alert('Image minted successfully!');
    } catch (error) {
      console.error('Minting error:', error);
      setIsMinting(false);
    }
  };

  return (
    <button
      onClick={mintImage}
      disabled={isMinting || !imageUrl}
      className="bg-black text-green-400 p-2 w-full mt-4 hover:bg-green-400 hover:text-black transition-colors duration-300"
    >
      {isMinting ? 'Minting...' : 'Mint Image'}
    </button>
  );
};

export default MintImage;
