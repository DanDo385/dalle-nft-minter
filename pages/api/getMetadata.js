// pages/api/getMetadata.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'build', 'metadata.json');  // Confirm the path where metadata is stored

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Failed to read file:", err);
            return res.status(500).json({ error: "Failed to retrieve metadata" });
        }
        res.status(200).json(JSON.parse(data));
    });
}
