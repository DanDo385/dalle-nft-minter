// pages/api/image.ts


import { Configuration, OpenAI } from 'openai';

// Importing the Next.js API types for TypeScript users (optional)
import type { NextApiRequest, NextApiResponse } from 'next';

// Initializing the OpenAI client with your API key
const configuration = new Configuration({
  apiKey: process.env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { action, prompt, image } = req.body;

    try {
      let response;

      switch (action) {
        case 'generate':
          // Call the appropriate OpenAI method to generate an image
          response = await openai.createImage({
            model: "dall-e-3",
            prompt: prompt,
            // Include additional parameters as necessary
          });
          break;
        case 'edit':
          // Assuming 'edit' and 'createVariation' operations require an image
          if (!image) {
            return res.status(400).json({ message: 'Image data is required for editing or variations.' });
          }
          // Handle image editing (DALL-E 2 only)
          response = await openai.editImage({
            // Include necessary parameters
          });
          break;
        case 'variation':
          // Handle creating variations of an image
          response = await openai.createImageVariation({
            // Include necessary parameters
          });
          break;
        default:
          return res.status(400).json({ message: 'Invalid action specified.' });
      }

      // Assuming the response structure contains a URL to the generated image
      const imageUrl = response.data[0].url;
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('OpenAI operation failed:', error);
      res.status(500).json({ message: 'Failed to process the image.' });
    }
  } else {
    // Only allow POST requests to this endpoint
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
