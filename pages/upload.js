//pages/upload.js
import { useRouter } from 'next/router';
import UploadIPFS from '@/components/UploadIPFS';
import { useState, useEffect } from 'react';

export default function UploadPage() {
  const router = useRouter();
  const { imageUrl, nftName, nftDescription } = router.query;  // Assuming you'll pass these as query params
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (imageUrl) {
      setImageURL(decodeURIComponent(imageUrl));
    }
  }, [imageUrl]);

  return (
    <div>
      <h1 className="text-xl font-bold">Upload Your Image to IPFS</h1>
      {imageURL && (
        <UploadIPFS imageUrl={imageURL} nftName={decodeURIComponent(nftName)} nftDescription={decodeURIComponent(nftDescription)} />
      )}
    </div>
  );
}
