// components/UploadIPFS.jsx

import React, { useState } from 'react';
import axios from 'axios';

const UploadIPFS = ({ imageUrl, onUploadSuccess }) => {
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const uploadToIPFS = async (blob) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', blob, `${nftName}.png`);
    formData.append('pinataMetadata', JSON.stringify({
      name: nftName,
      keyvalues: {
        description: nftDescription
      }
    }));

    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
        }
      });

      if (response.status === 200) {
        onUploadSuccess(response.data.IpfsHash, nftName, nftDescription);
      } else {
        throw new Error(`Failed to upload to IPFS. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      alert('Error uploading to IPFS: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const convertToBlobAndUpload = async () => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const blob = await response.blob();
      uploadToIPFS(blob);
    } catch (error) {
      console.error('Error fetching image for upload:', error);
      alert('Error fetching image for upload: ' + error.message);
    }
  };

  return (
    <div>
      <input 
        type="text"
        value={nftName}
        onChange={(e) => setNftName(e.target.value)}
        placeholder="Enter NFT name"
        className="border p-2 w-full my-2"
      />
      <textarea 
        value={nftDescription}
        onChange={(e) => setNftDescription(e.target.value)}
        placeholder="Enter NFT description"
        className="border p-2 w-full my-2"
      />
      <button
        onClick={convertToBlobAndUpload}
        disabled={isUploading || !nftName || !nftDescription}
        className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-2"
      >
        {isUploading ? 'Uploading...' : 'Upload to IPFS'}
      </button>
    </div>
  );
};

export default UploadIPFS;
