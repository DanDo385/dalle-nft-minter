// components/MintNFT.jsx
import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { ethers } from 'ethers';
import contractABI from '../build/ImageMinterABI.json';
import deployedAddress from '../build/DeployedAddress.json';

const MintNFT = ({ signer }) => {
    const [metadataIpfsUrl, setMetadataIpfsUrl] = useState('');
    const [isMinting, setIsMinting] = useState(false);

    const validateIPFS = (url) => {
        return /^ipfs:\/\/\b[A-Za-z0-9]{46}\b$/.test(url);
    };

    const handleMintNFT = async () => {
        if (!metadataIpfsUrl || !validateIPFS(metadataIpfsUrl)) {
            alert('Please provide a valid IPFS URL in the format "ipfs://<CID>" before minting.');
            return;
        }

        setIsMinting(true);
        try {
            const contractAddress = deployedAddress.address;
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const transaction = await contract.mintImage(metadataIpfsUrl);
            const receipt = await transaction.wait();

            if (receipt.status === 1) {
                console.log('Transaction successfully processed:', receipt);
                alert('NFT Minted Successfully');
            } else {
                console.log('Transaction failed with receipt:', receipt);
                alert('Transaction failed. See console for details.');
            }
        } catch (error) {
            console.error('Error minting NFT:', error);
            alert(`Failed to mint NFT. ${error.message}`);
        } finally {
            setIsMinting(false);
        }
    };

    return (
        <div>
            <Input
                type="text"
                value={metadataIpfsUrl}
                onChange={(e) => setMetadataIpfsUrl(e.target.value)}
                placeholder="Metadata IPFS URL"
                disabled={isMinting}
            />
            <Button onClick={handleMintNFT} disabled={isMinting}>
                {isMinting ? 'Minting...' : 'Mint NFT'}
            </Button>
        </div>
    );
};

export default MintNFT;
