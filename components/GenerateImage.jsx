// components/GenerateImage.jsx
import { useState } from 'react';

export default function GenerateImage({ onImageGenerated }) {
  const [prompt, setPrompt] = useState('');

  const handleGenerateImage = async () => {
    // Simulate generating an image URL based on the prompt
    const imageUrl = `https://example.com/generated-image?prompt=${encodeURIComponent(prompt)}`;
    // Call the callback with the generated image URL
    onImageGenerated(imageUrl);
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
      <button onClick={handleGenerateImage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate Image
      </button>
    </div>
  );
}
