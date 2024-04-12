// pages/images/index.js

import { useState } from 'react';
import GenerateImage from '../../components/GenerateImage';
import MintImage from '../../components/MintImage';
import Image from 'next/image';

export default function ImagePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');

  const handleImageGenerated = (url) => {
    setImageUrl(url);
  };

  const handleDetailsProvided = (url, name, description) => {
    setImageUrl(url);
    setNftName(name);
    setNftDescription(description);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Enter Prompt Below</h1>
      <GenerateImage onImageGenerated={handleImageGenerated} onDetailsProvided={handleDetailsProvided} />
      {imageUrl && (
        <>
          <div className="mt-4">
            <Image src={imageUrl} alt="Generated" width={500} height={500} layout="intrinsic" />
          </div>
          <MintImage imageUrl={imageUrl} imageName={nftName} imageDescription={nftDescription} />
        </>
      )}
    </div>
  );
}
