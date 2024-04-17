// components/UploadIPFS.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const UploadIPFS = ({ imageUrl, nftName, nftDescription }) => {
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (imageUrl) convertToBlob(imageUrl);
  }, [imageUrl]);

  const convertToBlob = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    handleUpload(blob);
  };

  const handleUpload = async (blob) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', blob, `${nftName}.png`); // Appending blob as a file with a .png extension
    formData.append('pinataMetadata', JSON.stringify({
      name: nftName,
      keyvalues: {
        description: nftDescription
      }
    }));

    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Authorization': `Bearer ${process.env.PINATA_JWT}`
        }
      });
      alert('Image and metadata uploaded successfully: ' + response.data.IpfsHash);
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      alert('Error uploading to IPFS: ' + error.message);
      setIsUploading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => imageUrl && convertToBlob(imageUrl)}
        disabled={isUploading}
        className="bg-green-400 hover:bg-black hover:text-green-400  text-black font-bold py-2 px-4 rounded"
      >
        {isUploading ? 'Uploading...' : 'Upload to IPFS'}
      </button>
    </div>
  );
};

export default UploadIPFS;
