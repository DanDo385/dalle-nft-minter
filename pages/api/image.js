// pages/api/image.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const apiKey = process.env.DALLE_API_KEY; // Access the API key from environment variables
        const response = await fetch("DALL-E API URL", {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req.body) // Ensure the body is stringified if sending JSON
        });
        const data = await response.json();
  
        // Respond with the data from the DALL-E API
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to generate image.' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  