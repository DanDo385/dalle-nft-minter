// components/MintNFT.jsx
import React, { useEffect, useState } from 'react';
import Button from './ui/Button';
import { ethers } from 'ethers';
import contractABI from '../build/ImageMinterABI.json';
import deployedAddress from '../build/DeployedAddress.json';

const MintNFT = ({ signer }) => {
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        fetch('/api/getMetadata') // Assuming this endpoint returns all needed metadata
            .then(response => response.json())
            .then(setMetadata)
            .catch(console.error);
    }, []);

    const handleMintNFT = async () => {
        if (!metadata) {
            alert('Metadata not loaded yet');
            return;
        }

        try {
            const contractAddress = deployedAddress.address;
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const transaction = await contract.mintImage(metadata.image, metadata.name, metadata.description);
            await transaction.wait();
            alert('NFT Minted Successfully');
        } catch (error) {
            console.error('Error minting NFT:', error);
            alert('Failed to mint NFT');
        }
    };

    return (
        <div>
            <Button onClick={handleMintNFT}>Mint NFT</Button>
        </div>
    );
};

export default MintNFT;
