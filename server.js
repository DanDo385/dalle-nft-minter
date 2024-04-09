const express = require('express');
const next = require('next');
const FormData = require('form-data');
const fetch = require('node-fetch'); // Use compatible version with CommonJS
const fs = require('fs');
const { OpenAIApi, Configuration } = require('openai');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.prepare().then(() => {
  const server = express();

  // Body parser middleware
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // API route for generating an image
  server.post('/api/generate-image', async (req, res) => {
    const { prompt } = req.body;

    try {
      const response = await openai.createImage({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024"
      });

      // Assuming the response structure matches what you expect from OpenAI
      if (response.data && response.data.length > 0) {
        res.status(200).json({ imageUrl: response.data[0].url });
      } else {
        throw new Error('No image returned from OpenAI');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).send({ error: 'Error generating image.' });
    }
  });

  // Pass all other requests to Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
