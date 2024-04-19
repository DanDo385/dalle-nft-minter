// components/UploadIpfs.jsx
import { useState } from 'react';
import axios from 'axios';
import Button from './ui/Button';

const UploadIpfs = ({ imageUrl, nftName, nftDescription, onUploadSuccess }) => {
    const [isUploading, setIsUploading] = useState(false);

    const uploadToIpfs = async (blob) => {
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
                onUploadSuccess(response.data.IpfsHash);
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
            uploadToIpfs(blob);
        } catch (error) {
            console.error('Error fetching image for upload:', error);
            alert('Error fetching image for upload: ' + error.message);
        }
    };

    return (
        <Button
            onClick={convertToBlobAndUpload}
            disabled={isUploading || !nftName || !nftDescription}
        >
            {isUploading ? 'Uploading...' : 'Upload to IPFS'}
        </Button>
    );
};

export default UploadIpfs;
