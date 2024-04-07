// components/GenerateImage.jsx
import { useState } from 'react';
import Image from 'next/image';

export default function GenerateImage() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('prompt', prompt);
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch('/api/image', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setGeneratedImage(data.imageUrl); // Assuming the API responds with an image URL
  };

  return (
    <div>
      <h2>Generate an Image with DALL-E</h2>
      <p>Enter a text prompt and/or upload an image to generate a new image.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="prompt">Text Prompt:</label>
          <input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Enter a prompt"
          />
        </div>
        
        <div>
          <label htmlFor="imageUpload">Upload Image:</label>
          <input
            id="imageUpload"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        
        <button
            type="submit"
            className="bg-green-400 text-black p-2 rounded"
        >Generate Image</button>
      </form>
      
    {generatedImage && (
        <div>
            <Image src={generatedImage} alt="Generated" />
        </div>
    )}
    </div>
  );
}
