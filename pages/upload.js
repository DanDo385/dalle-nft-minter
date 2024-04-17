// pages/upload.js
import { useState, useRef } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef(null);

  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", fileToUpload);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const resData = await res.json();
      setCid(resData.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.error('Trouble uploading file:', e);
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
  };

  return (
    <div className="container mx-auto mt-10">
      <input type="file" ref={inputFile} onChange={handleChange} style={{ display: 'none' }} />
      <button onClick={() => inputFile.current.click()} disabled={uploading}>
        {uploading ? "Uploading..." : "Choose File"}
      </button>
      {cid && (
        <div>
          <p>CID: {cid}</p>
          <img src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`} alt="Uploaded to IPFS" />
        </div>
      )}
    </div>
  );
}
