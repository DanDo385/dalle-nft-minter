import { useState } from 'react';
import Button from './ui/Button';

const UploadIpfs = ({ imageUrl, nftName, nftDescription, onUploadSuccess }) => {
    const [isUploading, setIsUploading] = useState(false);

    const uploadToIpfs = async (blob) => {
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', blob, `${nftName}.png`);

        try {
            const response = await fetch('/api/uploadToIPFS', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const { ipfsHash } = await response.json();
                onUploadSuccess(ipfsHash);
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
            const proxyUrl = `/api/proxy?imageUrl=${encodeURIComponent(imageUrl)}`;
            const response = await fetch(proxyUrl);
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
