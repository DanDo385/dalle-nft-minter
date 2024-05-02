// pages/api/upload.js

import { create } from 'ipfs-http-client';

// Update to connect to the IPFS node on the correct port
const ipfs = create({ url: 'http://localhost:5003' });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = await parseFormData(req);
    const file = data.files.file[0]; // Assuming file is uploaded under the 'file' key

    try {
      const ipfsResponse = await ipfs.add(file);
      const ipfsHash = ipfsResponse.cid.toString();
      
      res.status(200).json({ ipfsHash });
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      res.status(500).json({ error: 'Failed to upload to IPFS' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
