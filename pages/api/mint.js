// pages/api/mint.js

import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/uploads";
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: "Error parsing the form" });
            return;
        }

        const metadata = {
            name: fields.name,
            description: fields.description,
            image: fields.ipfsUrl, // Store IPFS URL provided by the user
        };

        fs.writeFileSync(path.resolve('./build/metadata.json'), JSON.stringify(metadata, null, 2));
        res.status(200).json({ message: "Metadata saved successfully" });
    });
}
