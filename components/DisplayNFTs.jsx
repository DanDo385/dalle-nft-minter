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
          const filter = contract.filters.ImageMinted(null, null, null);
          const events = await contract.queryFilter(filter);
          console.log("Fetched events:", events); // Debug log
  
          const nfts = await Promise.all(events.map(async (event) => {
            try {
              const tokenURI = event.args.tokenURI;
              console.log("Fetching metadata from URI:", tokenURI); // Debug log
              const response = await fetch(tokenURI);
              const metadata = await response.json();
              return metadata.image;
            } catch (error) {
              console.error("Failed to fetch metadata for tokenURI:", event.args.tokenURI, error);
              return null; // Return null or a default image if the fetch fails
            }
          }));
  
          console.log("NFT Data:", nfts); // Debug log
          setNftData(nfts.filter(image => image !== null)); // Filter out null results
        } catch (error) {
          console.error("Error fetching NFTs: ", error);
          setNftData([]); // Clear data on error
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchNFTs();
  }, [publicKey, contractABI, contractAddress]);

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
