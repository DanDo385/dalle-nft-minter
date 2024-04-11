// pages/images/index.js

import { useState } from 'react';
import GenerateImage from '../../components/GenerateImage';
import MintImage from '../../components/MintImage'; // Ensure this import is correct
import Image from 'next/image';

export default function ImagePage() {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageGenerated = (url) => {
    setImageUrl(url);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Enter Prompt Below</h1>
      <GenerateImage onImageGenerated={handleImageGenerated} />
      {imageUrl && (
        <>
          <div className="mt-4">
            <Image src={imageUrl} alt="Generated" width={500} height={500} layout="intrinsic" />
          </div>
          <MintImage imageUrl={imageUrl} />
        </>
      )}
    </div>
  );
}
