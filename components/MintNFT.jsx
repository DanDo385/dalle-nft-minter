// components/MintNFT.jsx
import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { ethers } from 'ethers';
import contractABI from '../build/ImageMinterABI.json';
import deployedAddress from '../build/DeployedAddress.json';

const MintNFT = ({ signer }) => {
    const [metadataIpfsUrl, setMetadataIpfsUrl] = useState('');

    const handleMintNFT = async () => {
        if (!metadataIpfsUrl.startsWith("ipfs://")) {
            alert('Please provide a valid IPFS URL starting with "ipfs://" before minting.');
            return;
        }

        try {
            const contractAddress = deployedAddress.address;
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const transaction = await contract.mintImage(metadataIpfsUrl);
            await transaction.wait();
            alert('NFT Minted Successfully');
        } catch (error) {
            console.error('Error minting NFT:', error);
            alert(`Failed to mint NFT. ${error.message}`);
        }
    };

    return (
        <div>
            <Input
                type="text"
                value={metadataIpfsUrl}
                onChange={(e) => setMetadataIpfsUrl(e.target.value)}
                placeholder="Metadata IPFS URL"
            />
            <Button onClick={handleMintNFT}>Mint NFT</Button>
        </div>
    );
};

export default MintNFT;
