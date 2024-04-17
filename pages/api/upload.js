// pages/api/upload.js
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = await req.formData();
    const file = data.get('file');
    data.append('pinataMetadata', JSON.stringify({ name: 'File to upload' }));

    try {
      const pinataResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: data,
      });
      const pinataJson = await pinataResponse.json();
      if (!pinataResponse.ok) throw new Error(pinataJson.error);

      res.status(200).json({ IpfsHash: pinataJson.IpfsHash });
    } catch (error) {
      console.error('Failed to upload to IPFS:', error);
      res.status(500).json({ error: 'Failed to upload to IPFS' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
