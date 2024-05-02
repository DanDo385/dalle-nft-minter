// pages/api/saveMetadata.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description, ipfsUrl } = req.body;

    const metadata = {
      name: name,
      description: description,
      image: ipfsUrl
    };

    const filePath = path.join(process.cwd(), 'build', 'metadata.json');

    fs.writeFile(filePath, JSON.stringify(metadata, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to write metadata', error: err });
      }
      res.status(200).json({ message: 'Metadata saved successfully' });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
