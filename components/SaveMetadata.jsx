// components/SaveMetadata.jsx

import React, { useState } from 'react';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import Button from './ui/Button';

const SaveMetadata = ({ onMetadataSaved }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageIpfsUrl, setImageIpfsUrl] = useState('');
    const [metadataIpfsUrl, setMetadataIpfsUrl] = useState(''); // This will be used to input the IPFS URL where metadata is stored.

    const handleSaveMetadata = async () => {
        // Constructing the metadata object to send
        const metadata = {
            name,
            description,
            image: imageIpfsUrl
        };

        // Making an API call to save the metadata
        const response = await fetch('/api/saveMetadata', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(metadata),
        });

        const result = await response.json();
        if (response.ok) {
            console.log("Metadata saved successfully:", result);
            if (typeof onMetadataSaved === 'function') {
                onMetadataSaved(metadataIpfsUrl);  // Passing the metadata IPFS URL to the parent component
            }
            alert('Metadata saved successfully.');
        } else {
            console.error('Failed to save metadata:', result.message);
            alert('Failed to save metadata: ' + result.message);
        }
    };

    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <Input type="text" value={imageIpfsUrl} onChange={(e) => setImageIpfsUrl(e.target.value)} placeholder="Image IPFS URL" />
            <Button onClick={handleSaveMetadata}>Save Metadata</Button>
        </form>
    );
};

export default SaveMetadata;
