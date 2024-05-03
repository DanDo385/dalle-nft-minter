// pages/mint.jsx
import React, { useState } from 'react';
import SaveMetadata from '../components/SaveMetadata';
import MintNFT from '../components/MintNFT';
import { ethers } from 'ethers';

export default function MintPage() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const [metadataIpfsUrl, setMetadataIpfsUrl] = useState('');

    const handleMetadataSaved = (url) => {
        setMetadataIpfsUrl(url);  // This function should update the state
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Mint Your NFT</h1>
            <SaveMetadata onMetadataSaved={handleMetadataSaved} />
            <MintNFT signer={signer} ipfsUrl={metadataIpfsUrl} />
        </div>
    );
}
