// pages/api/saveMetadata.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, description, ipfsUrl } = req.body;

        const metadata = {
            name,
            description,
            image: ipfsUrl
        };

        fs.writeFileSync(path.resolve('./public/metadata.json'), JSON.stringify(metadata, null, 2));
        res.status(200).json({ message: 'Metadata saved successfully' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
