// pages/mint.jsx
import React, { useState } from 'react';
import MintNFT from '../components/MintNFT';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ethers } from 'ethers';

export default function MintPage() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const [metadataIpfsUrl, setMetadataIpfsUrl] = useState('');

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Mint Your NFT</h1>
            <Input type="text" value={metadataIpfsUrl} onChange={(e) => setMetadataIpfsUrl(e.target.value)} placeholder="Metadata IPFS URL" />
            <Button onClick={() => {}}>Mint NFT</Button>
            <MintNFT signer={signer} ipfsUrl={metadataIpfsUrl} />
        </div>
    );
}

