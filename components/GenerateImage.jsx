// components/GenerateImage.jsx
import { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';

export default function GenerateImage({ onImageGenerated }) {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            alert('Please enter a prompt for your NFT.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/images', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const { metadata } = await response.json();
            onImageGenerated(metadata.image, metadata.description);  // Pass the image URL and description
        } catch (error) {
            console.error('Failed to generate image:', error);
            alert(`Failed to generate image: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4">
            <Input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt"
                disabled={isLoading}
            />
            <Button
                onClick={handleGenerateImage}
                disabled={isLoading || !prompt.trim()}
            >
                {isLoading ? 'Generating...' : 'Generate Image'}
            </Button>
        </div>
    );
}
