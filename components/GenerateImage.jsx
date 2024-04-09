//components/GenerateImage.jsx
import { useState } from 'react';

export default function GenerateImage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleGenerateImage = async () => {
    const response = await fetch('/api/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setImageUrl(data.url);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border p-2 mr-2"
        placeholder="Enter a prompt"
      />
      <button onClick={handleGenerateImage} className="bg-blue-500 text-white p-2">Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
}
