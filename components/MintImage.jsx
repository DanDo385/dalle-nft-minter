// components/MintImage.jsx
import { useState } from 'react';
import { ethers } from 'ethers';
import ImageMinterABI from '../build/ImageMinterABI.json';
import DeployedAddress from '../build/DeployedAddress.json';
import Button from './ui/Button';

const contractAddress = DeployedAddress.address; 
const MintImage = ({ ipfsUri, imageName, imageDescription }) => {
    const [isMinting, setIsMinting] = useState(false);
    const [transactionHash, setTransactionHash] = useState('');

    const mintNFT = async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask to use this feature!');
            return;
        }

        setIsMinting(true);

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ImageMinterABI, signer);

            const transaction = await contract.mintImage(ipfsUri, imageName, imageDescription);
            const tx = await transaction.wait();

            setTransactionHash(tx.transactionHash);
            alert(`NFT minted! Transaction Hash: ${tx.transactionHash}`);
        } catch (error) {
            console.error('Minting error:', error);
            alert('Minting failed: ' + error.message);
        } finally {
            setIsMinting(false);
        }
    };

    return (
        <div>
            <Button onClick={mintNFT} disabled={isMinting} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded my-2">
                {isMinting ? 'Minting...' : 'Mint NFT'}
            </Button>
            {transactionHash && (
                <p>Transaction Hash: {transactionHash}</p>
            )}
        </div>
    );
};

export default MintImage;
