// pages/api/image.js
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { config } from 'dotenv';

// Load environment variables
config();

export const apiConfig = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error parsing form data.' });
      }

      const prompt = fields.prompt;

      // Assuming you're still handling an image upload as before
      let imageData;
      if (files.image) {
        imageData = fs.readFileSync(files.image.filepath);
      }

      // Use the DALL-E API key from the environment variables
      const apiKey = process.env.DALLE_API_KEY;

      try {
        const response = await fetch('https://api.dalle.service.com/generate', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: prompt,
            // Include image data as needed
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to generate image: ${response.statusText}`);
        }

        const data = await response.json();

        res.status(200).json({ imageUrl: data.imageUrl });
      } catch (error) {
        console.error('API call failed:', error);
        res.status(500).json({ success: false, message: 'Failed to call DALL-E API.' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
