// components/MintNFT.jsx
import React, { useEffect, useState } from 'react';
import Button from './ui/Button';
import { ethers } from 'ethers';
import contractABI from '../build/ImageMinterABI.json';
import deployedAddress from '../build/DeployedAddress.json';

const MintNFT = ({ signer }) => {
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        // Fetch the metadata on mount
        fetch('/api/getMetadata')
            .then(response => response.json())
            .then(data => {
                setMetadata(data);
            })
            .catch(error => {
                console.error('Failed to fetch metadata:', error);
                alert('Failed to fetch metadata.');
            });
    }, []);

    const handleMintNFT = async () => {
        if (!metadata) {
            alert('Please load metadata before minting.');
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
            {metadata ? (
                <div>
                    <p>Name: {metadata.name}</p>
                    <p>Description: {metadata.description}</p>
                    <p>Image URL: {metadata.image}</p>
                    <Button onClick={handleMintNFT}>Mint NFT</Button>
                </div>
            ) : (
                <p>Loading metadata...</p>
            )}
        </div>
    );
};

export default MintNFT;
