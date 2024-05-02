// components/SaveMetadata.jsx

import { useState } from 'react';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import Button from './ui/Button';

const SaveMetadata = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ipfsUrl, setIpfsUrl] = useState('');

    const handleSaveMetadata = async () => {
        const metadata = {
            name,
            description,
            image: ipfsUrl
        };

        const response = await fetch('/api/saveMetadata', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(metadata),
        });

        if (response.ok) {
            alert('Metadata saved successfully.');
        } else {
            alert('Failed to save metadata.');
        }
    };

    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <Input type="text" value={ipfsUrl} onChange={(e) => setIpfsUrl(e.target.value)} placeholder="IPFS URL" />
            <Button onClick={handleSaveMetadata}>Save Metadata</Button>
        </form>
    );
};

export default SaveMetadata;
