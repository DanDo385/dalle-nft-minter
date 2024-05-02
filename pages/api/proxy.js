// pages/api/proxy.js
export default async function handler(req, res) {
  // Destructure the URL of the image from the query parameters
  const { imageUrl } = req.query;

  try {
    // Fetch the image using the provided URL
    const imageResponse = await fetch(imageUrl);

    // Throw an error if the response status is not OK
    if (!imageResponse.ok) {
      throw new Error(`Image fetch failed with status: ${imageResponse.status}`);
    }

    // Get the Buffer from the image response
    const imageBuffer = await imageResponse.arrayBuffer();

    // Set the content type based on the image response's content type
    res.setHeader('Content-Type', imageResponse.headers.get('content-type') || 'application/octet-stream');
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    // Handle any errors by sending a response with a 500 status code
    res.status(500).json({ error: `Failed to fetch image: ${error.message}` });
  }
}
