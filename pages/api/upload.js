// pages/api/upload.js

import ipfsClient from 'ipfs-http-client';

const ipfs = ipfsClient('http://localhost:5001'); // Update with your IPFS node address

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file } = req.body;

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
