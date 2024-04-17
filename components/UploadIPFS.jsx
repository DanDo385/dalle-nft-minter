// components/UploadIPFS.jsx
import { useState } from 'react';
import axios from 'axios';

const UploadIPFS = ({ imageUrl, nftDescription, onUpload }) => {
  const [name, setName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Function to upload metadata to IPFS using Pinata
  const uploadToIPFS = async (metadata) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const body = JSON.stringify(metadata);
    const headers = {
      'Content-Type': 'application/json',
      'pinata_api_key': process.env.PINATA_API_KEY,
      'pinata_secret_api_key': process.env.PINATA_API_SECRET,
    };

    try {
      const response = await axios.post(url, body, { headers });
      return `https://ipfs.io/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error('Axios error response:', error.response ? error.response.data : error);
      throw new Error('Failed to upload to IPFS', error);
    }
  };

  const handleUpload = async () => {
    if (!name.trim()) {
      alert('Please enter a name for the NFT.');
      return;
    }

    setIsUploading(true);
    try {
      const metadata = {
        name,
        description: nftDescription,
        image: imageUrl,
      };
      const ipfsUri = await uploadToIPFS(metadata);
      onUpload(name, ipfsUri);
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      alert(`Error uploading to IPFS: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter NFT name"
        disabled={isUploading}
        className="border p-2 w-full"
      />
      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="bg-green-400 hover:bg-black text-black hover:text-green-400 font-bold py-2 px-4 rounded mt-4"
      >
        {isUploading ? 'Uploading...' : 'Upload to IPFS'}
      </button>
    </div>
  );
};

export default UploadIPFS;
