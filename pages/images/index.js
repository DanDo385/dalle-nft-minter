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

  const handleImageGenerated = (url, description) => {
    setImageUrl(url);
    setNftDescription(description); // Set the description from the image generation prompt
  };

  const handleUploadToIPFS = (name, uri) => {
    setNftName(name);
    setIpfsUri(uri);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Enter Prompt Below</h1>
      <GenerateImage onImageGenerated={handleImageGenerated} />
      {imageUrl && (
        <div className="my-4">
          <Image src={imageUrl} alt="Generated Art" width={500} height={500} layout="responsive" />
        </div>
      )}
      {imageUrl && !ipfsUri && (
        <UploadIPFS imageUrl={imageUrl} nftDescription={nftDescription} onUpload={handleUploadToIPFS} />
      )}
      {ipfsUri && (
        <MintImage ipfsUri={ipfsUri} imageName={nftName} imageDescription={nftDescription} />
      )}
    </div>
  );
}
