// components/GenerateImage.jsx
import { useState } from 'react';

export default function GenerateImage({ onImageGenerated, onDetailsProvided }) {
  const [prompt, setPrompt] = useState('');
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      setImageUrl(data.url);
      onImageGenerated(data.url);  // This can now be used to trigger image display elsewhere
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to generate image:', error);
      setIsLoading(false);
    }
  };

  const handleDetailsSubmission = () => {
    if (!name.trim() || !prompt.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    onDetailsProvided(imageUrl, name, prompt);
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
        {imageUrl && (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full mt-4"
              placeholder="Name your NFT"
            />
            <button
              onClick={handleDetailsSubmission}
              className="bg-green-400 hover:bg-green-400 text-black font-bold py-2 px-4 rounded"
            >
              Submit Details
            </button>
          </>
        )}
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
