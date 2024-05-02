// pages/api/saveMetadata.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const data = req.body;
    const filePath = path.join(process.cwd(), 'public', 'metadata.json'); // Save in public for easy access or elsewhere securely

    fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
        if (err) {
            console.error("Failed to write file:", err);
            return res.status(500).json({ message: "Failed to save metadata" });
        }
        res.status(200).json({ message: "Metadata saved successfully" });
    });
}
