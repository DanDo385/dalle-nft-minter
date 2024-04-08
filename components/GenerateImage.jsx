//components/GenerateImage.jsx
import { useState } from 'react';
import Image from 'next/image';

export default function GenerateImage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [generatedImage, setGeneratedImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          // Include any other fields as necessary
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setGeneratedImage(data.data[0]?.url); // Ensure you are accessing the URL correctly based on your API response
    } catch (error) {
      console.error('Fetch error:', error.message);
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div>
      <h2>Generate an Image with DALL-E</h2>
      <p>Enter a text prompt to generate a new image.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Text Prompt:</label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        
        <button
          type="submit"
          className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Generate Image
        </button>
      </form>
      
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {generatedImage && (
        <div className="mt-4">
          <Image src={generatedImage} alt="Generated" width={700} height={700} layout="responsive" />
        </div>
      )}
    </div>
  );
}

