// pages/images.js
import { useState } from 'react';

export default function GenerateImage() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure at least one of the fields is filled
    if (!prompt && !image) {
      alert('Please enter a text prompt or upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('prompt', prompt);
    if (image) {
      formData.append('image', image);
    }

    // API call setup remains the same
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data); // Consider displaying this data on the page
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
        
        <button type="submit">Generate Image</button>
      </form>
    </div>
  );
}
