// pages/api/getMetadata.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'build', 'metadata.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error("Failed to read file:", err);
            return res.status(500).json({ error: "Failed to retrieve metadata" });
        }
        res.status(200).json(JSON.parse(data));
    });
}
