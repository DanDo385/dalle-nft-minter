// components/MintImage.jsx

import { useState } from 'react';
import { ethers } from 'ethers';

// Ensure these paths correctly point to where your ABI and deployed address JSON files are located.
const contractABI = require('../build/ImageMinterABI.json');
const contractAddress = require('../build/DeployedAddress.json');

// The detected chain ID for the network MetaMask is connected to
const EXPECTED_CHAIN_ID_HEX = '0xAAF0B7'; // Sepolia test network chain ID in hexadecimal

const MintImage = ({ imageUrl }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const mintImage = async () => {
    setErrorMessage('');

    if (!window.ethereum) {
      setErrorMessage('MetaMask is not installed. Please install MetaMask to use this feature.');
      return;
    }

    if (!contractABI || !contractAddress) {
      setErrorMessage('Contract ABI or address is not available. Please check the console for details.');
      console.error('Contract ABI or address is not properly defined.');
      return;
    }

    setIsMinting(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      const network = await provider.getNetwork();
      const chainIdHex = ethers.utils.hexStripZeros(ethers.utils.hexlify(network.chainId));

      if (chainIdHex !== EXPECTED_CHAIN_ID_HEX) {
        setErrorMessage(`You are on the wrong network. Please switch to the network with chain ID ${EXPECTED_CHAIN_ID_HEX}. Detected chain ID: ${chainIdHex}`);
        return;
      }

      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await contract.mintImage(imageUrl);
      await transaction.wait();
      alert('Image minted successfully!');
    } catch (error) {
      handleMintingError(error);
    } finally {
      setIsMinting(false);
    }
  };

  function handleMintingError(error) {
    console.error('Minting error:', error);
    let message = 'Minting failed: ';
    if (error.code === 4001) {
      message += 'You have rejected the transaction.';
    } else if (error.code === -32603) {
      message += 'Internal Ethereum error. You might be trying to mint too quickly.';
    } else {
      message += error.message || 'An unknown error occurred.';
    }
    setErrorMessage(message);
  }

  return (
    <>
      <button
        onClick={mintImage}
        disabled={isMinting || !imageUrl}
        className="bg-black text-green-400 p-2 w-full mt-4 hover:bg-green-400 transition-colors duration-300"
      >
        {isMinting ? 'Minting...' : 'Mint Image'}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </>
  );
};

export default MintImage;
