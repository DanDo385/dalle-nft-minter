// pages/api/saveMetadata.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = req.body;
    const filePath = path.join(process.cwd(), 'build', 'metadata.json');

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error("Failed to write file:", err);
            return res.status(500).json({ message: "Failed to save metadata", error: err.message });
        }
        res.status(200).json({ message: "Metadata saved successfully" });
    });
}
