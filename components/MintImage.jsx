// components/MintImage.jsx

import React, { useEffect, useState } from 'react';
import Button from './ui/Button';

const MintNFT = ({ signer }) => {
    const [metadataUri, setMetadataUri] = useState('');

    useEffect(() => {
        // Fetch metadata URI from where it's stored
        fetch('/path/to/metadata.json')
            .then(response => response.json())
            .then(data => {
                // Assuming the metadata JSON has a property `ipfsUrl`
                setMetadataUri(data.ipfsUrl);
            });
    }, []);

    const handleMintNFT = async () => {
        if (!metadataUri) {
            alert('No metadata URL found. Please save metadata first.');
            return;
        }

        try {
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
