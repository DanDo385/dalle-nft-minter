// pages/api/image.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const OPENAI_API_KEY = process.env.DALLE_API_KEY;
const OPENAI_GENERATIONS_ENDPOINT = 'https://api.openai.com/v1/images/generations';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { prompt, model = 'dall-e-3', n = 1, size = "1024x1024", quality = "standard", style = "vivid" } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const response = await fetch(OPENAI_GENERATIONS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        model,
        n,
        size,
        quality,
        style,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from OpenAI API: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error contacting the OpenAI API or processing its response.' });
  }
}
