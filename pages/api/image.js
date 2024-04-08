// pages/api/images.js
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.DALLE_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Extract the prompt from the request body
      const { prompt } = req.body;
      
      // Make the API call to OpenAI's DALL·E to generate an image
      const response = await openai.createImage({
        model: "dall-e-3", // Use "dall-e-2" for DALL·E 2 operations
        prompt: prompt,
        size: "1024x1024",
        quality: "standard", // Set to "hd" for high definition
        n: 1, // Number of images to generate
      });

      // Extract the URL of the generated image from the response
      const imageUrl = response.data[0].url;

      // Send the image URL back in the response
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ message: 'Failed to generate image' });
    }
  } else {
    // Handle non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
