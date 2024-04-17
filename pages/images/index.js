// pages/images/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import GenerateImage from '../../components/GenerateImage';
import Image from 'next/image';

export default function ImagePage() {
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const handleImageGenerated = (url) => {
    setImageUrl(url);
  };

  const handleRedirectToUpload = () => {
    router.push(`/upload?imageUrl=${encodeURIComponent(imageUrl)}`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Enter Prompt Below</h1>
      <GenerateImage onImageGenerated={handleImageGenerated} />
      {imageUrl && (
        <>
          <div className="my-4">
            <Image src={imageUrl} alt="Generated Art" width={500} height={500} layout="responsive" />
          </div>
          <button
            onClick={handleRedirectToUpload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload to IPFS
          </button>
        </>
      )}
    </div>
  );
}
