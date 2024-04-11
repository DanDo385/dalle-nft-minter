// components/MintImage.jsx
import { useState } from 'react';
import { ethers } from 'ethers';

// Adjust these paths to correctly point to where your ABI and deployed address JSON files are located.
const contractABI = require('../build/ImageMinterABI.json');
const contractAddressData = require('../build/DeployedAddress.json');
const contractAddress = contractAddressData.address;

// The detected chain ID for the network MetaMask is connected to
const DETECTED_CHAIN_ID = '0xAAF0B7'; // Update this to match the actual chain ID from MetaMask

const MintImage = ({ imageUrl }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const mintImage = async () => {
    // Reset error message at the start of a new minting attempt
    setErrorMessage('');

    if (!window.ethereum) {
      setErrorMessage('MetaMask is not installed. Please install MetaMask to use this feature.');
      return;
    }

    try {
      setIsMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Check network compatibility
      const { chainId } = await provider.getNetwork();
      console.log(`Detected network chainId: ${chainId}`);
      if (chainId !== DETECTED_CHAIN_ID) {
        setErrorMessage('You are on the wrong network. Please switch to the network with chain ID 0xAAF0B7.');
        setIsMinting(false);
        return;
      }

      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

      const transaction = await contract.mintImage(imageUrl);
      await transaction.wait();

      alert('Image minted successfully!');
    } catch (error) {
      console.error('Minting error:', error);
      setErrorMessage(`Minting failed: ${error.message}`);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <>
      <button
        onClick={mintImage}
        disabled={isMinting || !imageUrl}
        className="bg-black text-green-400 p-2 w-full mt-4 hover:bg-green-400 hover:text-black transition-colors duration-300"
      >
        {isMinting ? 'Minting...' : 'Mint Image'}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </>
  );
};

export default MintImage;
