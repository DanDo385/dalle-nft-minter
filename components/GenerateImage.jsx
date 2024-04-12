// components/GenerateImage.jsx
import { useState } from 'react';

export default function GenerateImage({ onImageGenerated, onDetailsProvided }) {
  const [prompt, setPrompt] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateImage = async () => {
    if (!prompt || !name) {
      alert('Please enter a prompt and name your NFT.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const { metadata } = await response.json();
      onImageGenerated(metadata.image);
      onDetailsProvided(metadata.image, name, metadata.description);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to generate image:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* ... rest of your component */}
    </div>
  );
}
