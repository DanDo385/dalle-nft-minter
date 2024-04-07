// pages/api/image.js
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error parsing form data.' });
      }

      // Assuming 'prompt' is a text field and the image file will be handled here
      const prompt = fields.prompt;
      let image;
      if (files.image) {
        // Example of how you might handle the file, such as reading it into memory
        image = fs.readFileSync(files.image.filepath);
        // Here you would typically upload the image to your API or include it in your API request
      }

      try {
        const apiKey = process.env.DALLE_API_KEY; // Access the API key from environment variables
        const apiResponse = await fetch("DALL-E API URL", {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt, // Include other necessary data based on your API's requirements
            // For file handling, refer to your API's documentation as you may need to encode the file or use a different content type
          })
        });

        if (!apiResponse.ok) {
          throw new Error('Failed to fetch from the DALL-E API');
        }

        const data = await apiResponse.json();

        // Respond with the data from the DALL-E API
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to generate image.' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
