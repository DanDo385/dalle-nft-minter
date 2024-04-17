// pages/images/index.jsimport { useState } from 'react';
import { useRouter } from 'next/router';
import GenerateImage from '../../components/GenerateImage';
import Image from 'next/image';

export default function ImagePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const router = useRouter();

  const handleImageGenerated = (url) => {
    setImageUrl(url);
  };

  const handleRedirectToUpload = () => {
    router.push(`/upload?imageUrl=${encodeURIComponent(imageUrl)}&nftName=${encodeURIComponent(nftName)}&nftDescription=${encodeURIComponent(nftDescription)}`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Enter Prompt Below</h1>
      <input type="text" placeholder="Enter NFT Name" value={nftName} onChange={(e) => setNftName(e.target.value)} />
      <textarea placeholder="Enter Description" value={nftDescription} onChange={(e) => setNftDescription(e.target.value)} />
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
