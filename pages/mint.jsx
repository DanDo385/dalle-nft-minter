// pages/mint.jsx

import React from 'react';
import SaveMetadata from '../components/SaveMetadata';
import MintNFT from '../components/MintNFT'; // Correctly name and import the MintNFT component if it handles minting.
import { ethers } from 'ethers';

export default function MintPage() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const ipfsUrl = "IPFS_URL_FROM_SAVE_METADATA"; // This should be dynamically obtained or managed via context or state

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Mint Your NFT</h1>
            <SaveMetadata />
            <MintNFT signer={signer} ipfsUrl={ipfsUrl} />
        </div>
    );
}
