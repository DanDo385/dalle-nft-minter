// pages/api/saveMetadata.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    // Ensure the request is a POST request
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const data = req.body;
    const directoryPath = path.join(process.cwd(), 'data'); // Consider using a `data` directory instead
    const filePath = path.join(directoryPath, 'metadata.json');

    // Ensure directory exists
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
        if (err) {
            console.error("Failed to write file:", err);
            return res.status(500).json({ message: "Failed to save metadata" });
        }
        res.status(200).json({ message: "Metadata saved successfully" });
    });
}
