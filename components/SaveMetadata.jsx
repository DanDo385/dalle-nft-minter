// components/SaveMetadata.jsx

import React, { useState } from 'react';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import Button from './ui/Button';

const SaveMetadata = ({ onMetadataSaved }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageIpfsUrl, setImageIpfsUrl] = useState('');
    

    const handleSaveMetadata = async () => {
        // Constructing metadata object
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

        if (response.ok) {
            console.log("Metadata saved successfully:", metadata);
            // Checking if onMetadataSaved is a function before calling it
            if (typeof onMetadataSaved === 'function') {
                onMetadataSaved(metadataIpfsUrl);  // Passing the metadata IPFS URL to the parent component
            } else {
                console.error("onMetadataSaved is not a function");
            }
            alert('Metadata saved successfully.');
        } else {
            console.error('Failed to save metadata.');
            alert('Failed to save metadata.');
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
