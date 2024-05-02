// pages/images.jsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import GenerateImage from '@/components/GenerateImage';
import Image from 'next/image';
import Button from '@/components/ui/Button'; // Import Button component

export default function ImagePage() {
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const handleImageGenerated = (url) => {
    setImageUrl(url);
  };

  const handleRedirectToUpload = () => {
    // Pass only the image URL to the upload page
    router.push(`/upload?imageUrl=${encodeURIComponent(imageUrl)}`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Generate Image</h1>
      <GenerateImage onImageGenerated={handleImageGenerated} />
      {imageUrl && (
        <>
          <div className="my-4">
            <Image src={imageUrl} alt="DALLE-3 Generated Art" width={500} height={500} layout="responsive" />
          </div>
        </>
      )}
    </div>
  );
}
