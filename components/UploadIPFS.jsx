import { useState } from 'react';
import axios from 'axios';

const UploadIPFS = ({ imageUrl, nftName, nftDescription }) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadToIPFS = async (file, name, description) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pinataMetadata', JSON.stringify({
      name: name,
      keyvalues: { description }
    }));

    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
        }
      });
      if (response.status === 200) {
        alert('Image and metadata uploaded successfully: ' + response.data.IpfsHash);
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

  const convertToBlobAndUpload = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const blob = await response.blob();
      uploadToIPFS(blob, nftName, nftDescription);
    } catch (error) {
      console.error('Error fetching image for upload:', error);
      alert('Error fetching image for upload: ' + error.message);
    }
  };

  return (
    <div>
      {imageUrl && (
        <button
          onClick={() => convertToBlobAndUpload(imageUrl)}
          disabled={isUploading}
          className="bg-green-400 hover:bg-black hover:text-green-400 text-black font-bold py-2 px-4 rounded"
        >
          {isUploading ? 'Uploading...' : 'Upload to IPFS'}
        </button>
      )}
    </div>
  );
};

export default UploadIPFS;
