// components/UploadIPFS.jsx
import { useState } from 'react';
import axios from 'axios';

const UploadIPFS = ({ imageUrl, onUpload }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Function to upload metadata to IPFS using Pinata
  const uploadToIPFS = async (metadata) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const body = JSON.stringify(metadata);
    const headers = {
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_API_SECRET,
    };

    try {
      const response = await axios.post(url, body, { headers });
      return `https://ipfs.io/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw new Error('Failed to upload to IPFS');
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const metadata = {
        name,
        description,
        image: imageUrl,
      };
      const ipfsUri = await uploadToIPFS(metadata);
      onUpload(name, description, ipfsUri);
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      alert(`Error uploading to IPFS: ${error.message}`);
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter NFT name"
        disabled={isUploading}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter NFT description"
        disabled={isUploading}
      />
      <button onClick={handleUpload} disabled={isUploading || !name.trim() || !description.trim()}>
        {isUploading ? 'Uploading...' : 'Upload to IPFS'}
      </button>
    </div>
  );
};

export default UploadIPFS;
