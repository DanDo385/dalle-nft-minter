// pages/images/index.jsx
import { useState } from 'react';
import GenerateImage from '../../components/GenerateImage';
import MintImage from '../../components/MintImage'; // Make sure this is correctly imported

export default function ImagePage() {
  const [imageUrl, setImageUrl] = useState('');

  // This function will be passed to GenerateImage and called with the generated image URL
  const handleImageGenerated = (url) => {
    setImageUrl(url);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Enter Prompt Below</h1>
      <GenerateImage onImageGenerated={handleImageGenerated} />
      {/* Only show MintImage if there's an imageUrl */}
      {imageUrl && <MintImage imageUrl={imageUrl} />}
    </div>
  );
}
