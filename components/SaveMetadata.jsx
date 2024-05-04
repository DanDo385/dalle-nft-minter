// components/SaveMetadata.jsx

const handleSaveMetadata = async () => {
    const metadata = {
        name,
        description,
        image: imageIpfsUrl
    };

    console.log("Sending metadata to server:", metadata);

    const response = await fetch('/api/saveMetadata', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(metadata),
    });

    const result = await response.json();
    if (response.ok) {
        console.log("Metadata saved successfully:", result);
        alert('Metadata saved successfully.');
    } else {
        console.error('Failed to save metadata:', result);
        alert('Failed to save metadata: ' + result.message);
    }
};
