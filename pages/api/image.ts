// pages/api/image.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const OPENAI_API_KEY = process.env.DALLE_API_KEY; // Make sure this is set in your .env.local file
/**
 * The endpoint URL for the OpenAI API.
 * Update this with the correct endpoint provided by OpenAI.
 */
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/YOUR_ENDPOINT'; // Update this with the correct endpoint

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    // Only POST method is accepted
    return res.status(405).end('Method Not Allowed');
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const response = await fetch(OPENAI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        // Your request payload goes here
        prompt: prompt,
        // other required fields...
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from OpenAI API');
    }

    const data = await response.json();

    // Handle the data from the OpenAI response
    res.status(200).json({ imageUrl: data.choices[0].image_url }); // Adjust according to the actual response structure
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
