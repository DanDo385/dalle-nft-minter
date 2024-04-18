// pages/images.jsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import GenerateImage from '@/components/GenerateImage'; // Ensure this is correct
import Image from 'next/image';
import Input from '@/components/ui/Input'; // Import Input component
import TextArea from '@/components/ui/TextArea'; // Import TextArea component
import Button from '@/components/ui/Button'; // Import Button component

export default function ImagePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const router = useRouter();

  const handleImageGenerated = (url) => {
    setImageUrl(url);
  };

  const handleRedirectToUpload = () => {
    // Pass the image URL, NFT name, and description to the upload page
    router.push(`/upload?imageUrl=${encodeURIComponent(imageUrl)}&nftName=${encodeURIComponent(nftName)}&nftDescription=${encodeURIComponent(nftDescription)}`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Enter Image Generation Prompt</h1>
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
      <GenerateImage onImageGenerated={handleImageGenerated} />
      {imageUrl && (
        <>
          <div className="my-4">
            <Image src={imageUrl} alt="Generated Art" width={500} height={500} layout="responsive" />
          </div>
          <Button onClick={handleRedirectToUpload}>
            Proceed to Upload
          </Button>
        </>
      )}
    </div>
  );
}
