import React, { useState } from "react";
import Image from 'next/image';

export default function CloudinaryUploader({imageurl}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setLoading(true);

    try {
      // Create a FormData object and append data to it
      const formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

      // Send the FormData to Cloudinary
      const response = await fetch("https://api.cloudinary.com/v1_1/" + process.env.NEXT_PUBLIC_CLOUDINARY_NAME + "/upload", {
        
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.secure_url);
        if(imageurl){imageurl(data.secure_url)}
        console.log(data.secure_url)
        setLoading(false);
        setError(null);
      } else {
        throw new Error('Error uploading image');
      }
    } catch (error) {
      setError("Error uploading image. Please try again.");
      setLoading(false);
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <div className='text-violet_dark'>
        {loading ? <p>cargando....</p> : null}
        {error ? <p>{error}</p> : null}
        {imageUrl ? <Image src={imageUrl} width={300}  crop={"scale"} height={100}  alt='cloudinary' /> : null}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>
    </div>
  );
}
