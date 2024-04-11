// pages/images/index.jsx
import { useState } from 'react';
import GenerateImage from '../../components/GenerateImage';
import Image from 'next/image'; // Importing Next.js Image component for optimized image loading

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
        // Use the Next.js Image component for optimized image loading
        <div className="mt-4">
          <Image src={imageUrl} alt="Generated" width={500} height={500} layout="intrinsic" />
        </div>
      )}
    </div>
  );
}
