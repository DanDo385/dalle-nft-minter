// pages/metadata.jsx
import React from 'react';
import SaveMetadata from '../components/SaveMetadata';

export default function MetadataPage() {
    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Save Your NFT Metadata</h1>
            <SaveMetadata />
        </div>
    );
}
