//components/DisplayNFTs.jsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';

const DisplayNFTs = ({ publicKey }) => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load ABI and Address
  const contractABI = require('../build/ImageMinterABI.json');
  const contractAddress = require('../build/DeployedAddress.json').address;

  useEffect(() => {
    const fetchNFTs = async () => {
      if (window.ethereum && publicKey) {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        try {
          // Use the ImageMinted event emitted by the contract to get NFTs
          const filter = contract.filters.ImageMinted(null, null, null);
          const events = await contract.queryFilter(filter);

          const nfts = await Promise.all(events.map(async (event) => {
            const tokenURI = event.args.tokenURI;
            const response = await fetch(tokenURI);
            const metadata = await response.json();
            return metadata.image;
          }));

          setNftData(nfts);
        } catch (error) {
          console.error("Error fetching NFTs: ", error);
          setNftData([]); // Clear data on error
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNFTs();
  }, [publicKey]);

  return (
    <div style={{ background: 'black', padding: '10px' }}>
      {loading ? (
        <p>Loading NFTs...</p>
      ) : nftData.length > 0 ? (
        nftData.map((image, index) => (
          <div key={index} style={{ border: '2px solid green', borderColor: '#34D399', margin: '10px', display: 'inline-block' }}>
            <Image src={image} alt={`NFT ${index}`} width={200} height={200} layout="fixed" />
          </div>
        ))
      ) : (
        <p>No NFTs found for this address.</p>
      )}
    </div>
  );
};

export default DisplayNFTs;
