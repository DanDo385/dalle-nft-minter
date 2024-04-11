// components/GenerateImage.jsx
import { useState } from 'react';
import Image from 'next/image'; // Importing the Image component

export default function GenerateImage({ onImageGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to manage loading spinner

  const handleGenerateImage = async () => {
    setIsLoading(true); // Start loading
    const response = await fetch('/api/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setImageUrl(data.url);
    setIsLoading(false); // End loading
    onImageGenerated(data.url); // Call the passed callback with the new image URL
  };

  return (
    <div className="p-4">
      {/* Input and button elements remain the same */}
      
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div> {/* Loader */}
        </div>
      ) : (
        imageUrl && <Image src={imageUrl} alt="Generated" width={500} height={500} layout="intrinsic" />
      )}
      {/* Styles remain the same */}
    </div>
  );
}
