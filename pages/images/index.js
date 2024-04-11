// pages/images/index.jsx
import { useState } from 'react';
import GenerateImage from '../../components/GenerateImage';
import MintImage from '../../components/MintImage';

export default function ImagePage() {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageGenerated = (url) => {
    setImageUrl(url);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Enter Prompt Below</h1>
      <GenerateImage onImageGenerated={handleImageGenerated} />
      {imageUrl && <MintImage imageUrl={imageUrl} />}
    </div>
  );
}
