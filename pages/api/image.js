import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error parsing form data.' });
      }

      const prompt = fields.prompt;

      let imageBase64 = '';
      if (files.image) {
        // Assuming the 'image' field is used for the file upload
        const imagePath = files.image.filepath;
        const imageBuffer = fs.readFileSync(imagePath);
        imageBase64 = imageBuffer.toString('base64');

        // Depending on the API, you might also need MIME type information
        const mimeType = path.extname(files.image.originalFilename).replace('.', '');
        imageBase64 = `data:image/${mimeType};base64,${imageBase64}`;
      }

      // Use environment variable for the API key
      const apiKey = process.env.DALLE_API_KEY;

      try {
        // Replace 'YOUR_DALLE_API_ENDPOINT' with the actual endpoint URL
        const response = await fetch('YOUR_DALLE_API_ENDPOINT', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: prompt,
            image: imageBase64, // Assuming the API accepts a base64-encoded image string
          }),
        });

        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'API call failed.' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
