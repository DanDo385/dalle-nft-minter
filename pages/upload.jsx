// pages/upload.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import UploadIpfs from '@/components/UploadIpfs';
import MintImage from '@/components/MintImage';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

export default function UploadPage() {
  const router = useRouter();
  const { imageUrl } = router.query;
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [ipfsUri, setIpfsUri] = useState('');

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
          <UploadIpfs
            imageUrl={decodeURIComponent(imageUrl)}
            nftName={nftName}
            nftDescription={nftDescription}
            onUpload={handleUploadToIPFS}
          />
        </>
      )}
      {ipfsUri && (
        <>
          <div>
            <strong>IPFS URI:</strong> {ipfsUri}
          </div>
          <MintImage ipfsUri={ipfsUri} imageName={nftName} imageDescription={nftDescription} />
        </>
      )}
    </div>
  );
}
