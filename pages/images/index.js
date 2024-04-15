// pages/images/index.js
import { useState } from 'react';
import GenerateImage from '../../components/GenerateImage';
import UploadIPFS from '../../components/UploadIPFS';
import MintImage from '../../components/MintImage';
import Image from 'next/image';

export default function ImagePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [ipfsUri, setIpfsUri] = useState('');

  const handleImageGenerated = (url) => {
    setImageUrl(url);
  };

  const handleUploadToIPFS = (name, description, uri) => {
    setNftName(name);
    setNftDescription(description);
    setIpfsUri(uri);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Enter Prompt Below</h1>
      <GenerateImage onImageGenerated={handleImageGenerated} />
      {imageUrl && !ipfsUri && (
        <UploadIPFS imageUrl={imageUrl} onUpload={handleUploadToIPFS} />
      )}
      {ipfsUri && (
        <>
          <div className="mt-4">
            <Image src={imageUrl} alt="Generated" width={500} height={500} layout="responsive" />
          </div>
          <MintImage ipfsUri={ipfsUri} imageName={nftName} imageDescription={nftDescription} />
        </>
      )}
    </div>
  );
}
