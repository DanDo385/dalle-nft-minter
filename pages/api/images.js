// pages/api/images.js
import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    try {
      const imageResponse = await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        response_format: 'url',
      });

      const imageUrl = imageResponse.data[0].url; // Assuming the response format provides a direct URL
      res.status(200).json({ url: imageUrl });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
