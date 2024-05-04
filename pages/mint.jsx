import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MintNFT from '../components/MintNFT';

export default function MintPage() {
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setSigner(provider.getSigner());
        }
    }, []);

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Mint Your NFT</h1>
            {signer && <MintNFT signer={signer} />}
        </div>
    );
}
