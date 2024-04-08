// pages/api/images.js
import { NextApiRequest, NextApiResponse } from 'next';

// Import the OpenAI package correctly according to its documentation
// This assumes the official OpenAI Node.js package; adjust if you're using a different package
import { Configuration, OpenAIApi } from 'openai';

// Initialize the OpenAI client with your API key
const configuration = new Configuration({
    apiKey: process.env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { prompt } = req.body;
            
            // Adjust the method call as necessary based on the actual API and operation you intend to use
            const response = await openai.createImage({
                model: "text-davinci-003", // Update this model identifier based on your requirements
                prompt: prompt,
                n: 1,
                // Add other parameters as necessary
            });

            // Assuming the API returns a direct URL or you process the response to get one
            const imageUrl = response.data.choices[0].image_url; // Adjust based on actual response structure

            res.status(200).json({ imageUrl });
        } catch (error) {
            console.error('Error generating image:', error);
            res.status(500).json({ message: 'Failed to generate image.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
