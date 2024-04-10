// components/MintImage.jsx
import { useState } from 'react';
import { ethers } from 'ethers';

const contractABI = require('../path/to/your/contractABI.json');
const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';

const MintImage = ({ imageUrl }) => {
  const [isMinting, setIsMinting] = useState(false);

  const mintImage = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    try {
      setIsMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await contract.mintImage(imageUrl);
      await transaction.wait();

      setIsMinting(false);
      alert('Image minted successfully!');
    } catch (error) {
      console.error('Minting error:', error);
      setIsMinting(false);
    }
  };

  return (
    <button
      onClick={mintImage}
      disabled={isMinting || !imageUrl}
      className="bg-black text-green-400 p-2 w-full mt-4 hover:bg-green-400 hover:text-black transition-colors duration-300"
    >
      {isMinting ? 'Minting...' : 'Mint Image'}
    </button>
  );
};

export default MintImage;
