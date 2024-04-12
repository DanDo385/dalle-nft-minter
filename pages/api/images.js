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

      // Simulated image conversion to JPG
      const imageUrl = imageResponse.data[0].url.replace(/\.png|\.webp/, '.jpg');
      const metadata = {
        name: `Art for: ${prompt}`,
        description: `Generated art based on the prompt: ${prompt}`,
        image: imageUrl
      };

      res.status(200).json({ metadata });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
