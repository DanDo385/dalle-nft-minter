import { useState } from 'react';

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

    const response = await fetch('/api/generate-image', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setGeneratedImage(data.imageUrl); // Assuming the API responds with an image URL
  };

  return (
    <div>
        {/* Form content remains the same */}
        
        <button
            type="submit"
            className="bg-green-400 text-black p-2 rounded"
        >Generate Image</button>
        
        {generatedImage && (
            <div>
                <Image src={generatedImage} alt="Generated" />
            </div>
        )}
    </div>
  );
}
