import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';

const DisplayNFTs = ({ publicKey }) => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(true);

  const contractABI = require('../build/ImageMinterABI.json');
  const contractAddress = require('../build/DeployedAddress.json').address;

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!window.ethereum || !publicKey) {
        console.error("Ethereum object or public key not available.");
        return;
      }
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      try {
        const filter = contract.filters.ImageMinted(null, null, null, null, null);
        const events = await contract.queryFilter(filter);

        const nfts = await Promise.all(events.map(async (event) => {
          const tokenURI = event.args.tokenURI;
          try {
            const response = await fetch(tokenURI);
            if (!response.ok) throw new Error(`HTTP status ${response.status}`);
            const metadata = await response.json();
            return { image: metadata.image, name: metadata.name, description: metadata.description };
          } catch (error) {
            console.error("Failed to fetch metadata for tokenURI:", tokenURI, error);
            return null;
          }
        }));

        setNftData(nfts.filter(nft => nft !== null));
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setNftData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [publicKey]);

  return (
    <div style={{ background: 'black', padding: '10px' }}>
      {loading ? (
        <p>Loading NFTs...</p>
      ) : nftData.length > 0 ? (
        nftData.map((nft, index) => (
          <div key={index} style={{ border: '2px solid green', margin: '10px', display: 'inline-block' }}>
            <Image src={nft.image} alt={`NFT ${index}`} width={200} height={200} unoptimized={true} />
            <div style={{ color: 'white', textAlign: 'center' }}>{nft.name}</div>
            <p style={{ color: 'white', textAlign: 'center' }}>{nft.description}</p>
          </div>
        ))
      ) : (
        <p>No NFTs found for this address.</p>
      )}
    </div>
  );
};

export default DisplayNFTs;
