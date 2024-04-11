import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const DisplayNFTs = ({ publicKey, contractABI, contractAddress }) => {
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (typeof window.ethereum !== 'undefined' && publicKey) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const balance = await contract.balanceOf(publicKey);
        const nfts = [];

        for (let i = 0; i < balance.toNumber(); i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(publicKey, i);
          const tokenURI = await contract.tokenURI(tokenId);
          const response = await fetch(tokenURI);
          const metadata = await response.json();
          nfts.push(metadata.image);
        }

        setNftData(nfts);
      }
    };

    fetchNFTs();
  }, [publicKey, contractABI, contractAddress]);

  return (
    <div style={{ background: 'black' }}>
      {nftData.map((image, index) => (
        <div key={index} style={{ border: '2px solid', borderColor: 'green-400', margin: '10px' }}>
          <img src={image} alt={`NFT ${index}`} style={{ width: '200px', height: '200px' }} />
        </div>
      ))}
    </div>
  );
};

export default DisplayNFTs;
