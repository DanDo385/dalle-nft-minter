// pages/api/proxy.js
export default async function handler(req, res) {
    // Destructure the URL of the image from the query parameters
    const { imageUrl } = req.query;
  
    try {
      // Fetch the image using the provided URL
      const imageRes = await fetch(imageUrl);
      
      // Throw an error if the response status is not OK
      if (!imageRes.ok) {
        throw new Error(`Image fetch failed with status: ${imageRes.status}`);
      }
      
      // Get the blob from the response
      const blob = await imageRes.blob();
      
      // Convert the blob to a buffer
      const buffer = await blob.arrayBuffer();
      
      // Send the buffer in the response with the correct content type
      res.setHeader('Content-Type', 'image/png');
      res.send(Buffer.from(buffer));
    } catch (error) {
      // Handle any errors by sending a response with a 500 status code
      res.status(500).json({ error: error.message });
    }
  }
  