// components/SaveMetadata.jsx

import React, { useState } from 'react';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import Button from './ui/Button';

const SaveMetadata = ({ onMetadataSaved }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageIpfsUrl, setImageIpfsUrl] = useState('');
    const [metadataIpfsUrl, setMetadataIpfsUrl] = useState('');

    const handleSaveMetadata = async () => {
        const metadata = {
            name,
            description,
            image: imageIpfsUrl
        };

        const response = await fetch('/api/saveMetadata', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(metadata),
        });

        if (response.ok) {
            onMetadataSaved(metadataIpfsUrl); // This should pass the metadata URL up to the MintPage
            alert('Metadata saved successfully.');
        } else {
            alert('Failed to save metadata.');
        }
    };

    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <Input type="text" value={imageIpfsUrl} onChange={(e) => setImageIpfsUrl(e.target.value)} placeholder="Image IPFS URL" />
            <Input type="text" value={metadataIpfsUrl} onChange={(e) => setMetadataIpfsUrl(e.target.value)} placeholder="Metadata IPFS URL" />
            <Button onClick={handleSaveMetadata}>Save Metadata</Button>
        </form>
    );
};

export default SaveMetadata;
