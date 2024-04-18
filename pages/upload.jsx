// pages/upload.jsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UploadIPFS from '../../components/UploadIPFS';
import MintImage from '../../components/MintImage';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';

export default function UploadPage() {
  const router = useRouter();
  const { imageUrl } = router.query;
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [ipfsUri, setIpfsUri] = useState('');

  useEffect(() => {
    // This would be the place to set the image URL state, 
    // but for now, we are directly using the query param
  }, [imageUrl]);

  const handleUploadToIPFS = (ipfsHash) => {
    setIpfsUri(ipfsHash);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Upload to IPFS and Mint NFT</h1>
      {imageUrl && !ipfsUri && (
        <>
          <Input
            type="text"
            placeholder="Enter NFT Name"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
          />
          <TextArea
            placeholder="Enter Description"
            value={nftDescription}
            onChange={(e) => setNftDescription(e.target.value)}
          />
          <UploadIPFS
            imageUrl={decodeURIComponent(imageUrl)}
            nftName={nftName}
            nftDescription={nftDescription}
            onUpload={handleUploadToIPFS}
          />
        </>
      )}
      {ipfsUri && (
        <MintImage ipfsUri={ipfsUri} imageName={nftName} imageDescription={nftDescription} />
      )}
    </div>
  );
}
