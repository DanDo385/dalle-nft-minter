// pages/upload.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import UploadIPFS from '@/components/UploadIPFS';
import MintImage from '@/components/MintImage';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

export default function UploadPage() {
  const router = useRouter();
  const { imageUrl, nftName: queryNftName, nftDescription: queryNftDescription } = router.query;
  const [nftName, setNftName] = useState(queryNftName || '');
  const [nftDescription, setNftDescription] = useState(queryNftDescription || '');
  const [ipfsUri, setIpfsUri] = useState('');

  const handleUploadToIPFS = (ipfsHash, name, description) => {
    setIpfsUri(ipfsHash);
    setNftName(name);
    setNftDescription(description);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Upload to IPFS and Mint NFT</h1>
      {!ipfsUri && (
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
          {imageUrl && (
            <UploadIPFS
              imageUrl={decodeURIComponent(imageUrl)}
              nftName={nftName}
              nftDescription={nftDescription}
              onUpload={handleUploadToIPFS}
            />
          )}
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
