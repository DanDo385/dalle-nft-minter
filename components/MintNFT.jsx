// components/MintNFT.jsx
import React, { useEffect } from 'react';  // Import React and useEffect hook
import Button from './ui/Button';  // Ensure Button is correctly imported from your UI components
import { ethers } from 'ethers';  // Assuming you need ethers here for blockchain interaction

const MintNFT = ({ signer, ipfsUrl }) => {
    useEffect(() => {
        if (!ipfsUrl) {
            console.log("IPFS URL is empty on mount.");
        } else {
            console.log("IPFS URL on mount:", ipfsUrl);
        }
    }, [ipfsUrl]);  // Dependency array to re-run useEffect when ipfsUrl changes

    const handleMintNFT = async () => {
        if (!ipfsUrl) {
            alert('No metadata URL found. Please save metadata first.');
            return;
        }

        try {
            // Assuming you have the contract ABI and address already setup elsewhere
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const transaction = await contract.mintImage(ipfsUrl);  // Assuming mintImage is the correct contract method
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