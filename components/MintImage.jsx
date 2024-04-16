// components/MintImage.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import ImageMinterABI from '../build/ImageMinterABI.json';
import Image from 'next/image';
const contractAddress = '../build/ImageMinterABI.json';

const MintImage = ({ ipfsUri, imageName, imageDescription }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mintedNft, setMintedNft] = useState(null);

  const mintImage = async () => {
    setIsMinting(true);
    setErrorMessage('');

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      
      const contract = new ethers.Contract(contractAddress, ImageMinterABI.abi, signer);

      // Here you would call your smart contract's minting function
      const transaction = await contract.mintImage(signer.getAddress(), ipfsUri, {
        value: ethers.utils.parseEther("0.05") // If your NFT minting function requires payment
      });
      
      await transaction.wait();

      setMintedNft({
        tokenURI: ipfsUri,
        name: imageName,
        description: imageDescription
      });

      setIsMinting(false);
      alert('NFT minted successfully!');
    } catch (error) {
      console.error('Minting error:', error);
      setErrorMessage(error.message);
      setIsMinting(false);
    }
  };

  return (
    <div>
      <button
        onClick={mintImage}
        disabled={isMinting || !ipfsUri || !imageName || !imageDescription}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isMinting ? 'Minting...' : 'Mint NFT'}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {mintedNft && (
        <div className="mt-4">
          <p><strong>Name:</strong> {mintedNft.name}</p>
          <p><strong>Description:</strong> {mintedNft.description}</p>
          {/* Assuming the IPFS URI is a direct link to the image */}
          <Image 
          src={mintedNft.tokenURI} 
          alt={mintedNft.name} 
          width={500} // Set desired width
          height={500} // Set desired height
          layout="responsive" // This makes the image scale nicely to the parent element
        />
        </div>
      )}
    </div>
  );
};

export default MintImage;
