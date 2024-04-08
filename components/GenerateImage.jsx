//components/GenerateImage.jsx

import { useState } from 'react';
import Image from 'next/image';

export default function GenerateImage() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Keep track of loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Enable loading state

    const formData = new FormData();
    formData.append('prompt', prompt);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl); // Make sure to adjust according to your actual API response
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false); // Disable loading state after fetch completion
    }
  };

  return (
    <div>
      <h2>Generate an Image with DALL-E</h2>
      <p>Enter a text prompt and/or upload an image to generate a new image.</p>
      <form onSubmit={handleSubmit}>
        {/* Form elements go here */}
      </form>
      
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-900"></div>
        </div>
      )}

      {/* Display generated image */}
      {generatedImage && (
        <div>
          <Image src={generatedImage} alt="Generated" layout="fill" />
        </div>
      )}
    </div>
  );
}
