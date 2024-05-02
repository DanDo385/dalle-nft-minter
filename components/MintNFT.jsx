// components/MintNFT.jsx

import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import { ethers } from 'ethers';

// Correct paths to the ABI and address JSON files
import contractABI from '../build/ImageMinterABI.json';
import deployedAddress from '../build/DeployedAddress.json';

const MintNFT = ({ signer, ipfsUrl }) => {
    const [metadataUri, setMetadataUri] = useState('');

    useEffect(() => {
        // Fetch the metadata URI once the component mounts
        fetch('/api/getMetadata')  // Adjust if needed to ensure it fetches the correct data
            .then(response => response.json())
            .then(data => {
                setMetadataUri(data.ipfsUrl);
            });
    }, []);

    const handleMintNFT = async () => {
        if (!metadataUri) {
            alert('No metadata URL found. Please save metadata first.');
            return;
        }

        try {
            const contractAddress = deployedAddress.address; // Extract the contract address
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const transaction = await contract.mintImage(metadataUri);
            await transaction.wait();
            alert('NFT Minted Successfully');
        } catch (error) {
            console.error('Error minting NFT:', error);
            alert('Failed to mint NFT');
        }
    };

    return <Button onClick={handleMintNFT}>Mint NFT</Button>;
};

export default MintNFT;
