// components/MintImage.jsx

import React, { useState } from 'react';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import Button from './ui/Button';

const MintImage = ({ signer }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ipfsUrl, setIpfsUrl] = useState('');

  const handleSaveMetadata = async (event) => {
    event.preventDefault();

    const metadata = {
      name: name,
      description: description,
      image: ipfsUrl
    };

    const response = await fetch('/api/saveMetadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (response.ok) {
      alert('Metadata saved successfully. Please upload to IPFS and update the IPFS URL.');
    } else {
      const error = await response.json();
      alert(`Failed to save metadata: ${error.message}`);
    }
  };

  const handleMintNFT = async (event) => {
    event.preventDefault();

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await contract.mintImage(ipfsUrl, name, description);
      await transaction.wait();
      alert('NFT Minted Successfully');
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Failed to mint NFT');
    }
  };

  return (
    <form className="space-y-4">
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <Input type="text" value={ipfsUrl} onChange={(e) => setIpfsUrl(e.target.value)} placeholder="IPFS URL" />
      <Button onClick={handleSaveMetadata}>Save Metadata</Button>
      <Button onClick={handleMintNFT}>Mint NFT</Button>
    </form>
  );
};

export default MintImage;
