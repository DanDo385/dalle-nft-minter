//components/GenerateImage.jsx
import { useState } from 'react';
import Image from 'next/image'; // Importing the Image component

export default function GenerateImage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to manage loading spinner

  const handleGenerateImage = async () => {
    setIsLoading(true); // Start loading
    const response = await fetch('/api/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setImageUrl(data.url);
    setIsLoading(false); // End loading
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border p-2 w-full bg-green-400 text-black"
          placeholder="Enter a prompt"
        />
      </div>
      <button onClick={handleGenerateImage} className="bg-black text-green-400 p-2 w-full hover:bg-green-400 hover:text-black transition-colors duration-300">Generate Image</button>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div> {/* This is your spinner element */}
        </div>
      ) : (
        imageUrl && <Image src={imageUrl} alt="Generated" width={500} height={500} layout="intrinsic" /> /* Using Next.js Image component */
      )}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #68D391; /* Using Tailwind's green-400 color */
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
