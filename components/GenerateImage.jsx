// components/GenerateImage.jsx
import { useState } from 'react';

export default function GenerateImage({ onImageGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateImage = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setIsLoading(false);
      onImageGenerated(data.url); // This should trigger any parent component handling for the generated image URL.
    } catch (error) {
      console.error('Failed to generate image:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter a prompt"
        />
      </div>
      <button 
        onClick={handleGenerateImage} 
        disabled={isLoading} 
        className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded"
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
    </div>
  );
}

