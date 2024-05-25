import React, { useState } from "react";
import Image from 'next/image';

export default function CloudinaryUploader({imageurl}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nombre, setNombre] = useState(null);

  // Manejador de cambios en el input
  const handleChange = (event) => {
    const newValue = event.target.value;
    setNombre(newValue); // Actualizar el estado local
    console.log(newValue); // Escribir el valor en la consola
};

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setLoading(true);

    try {
      // Create a FormData object and append data to it
      const formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
      formData.append('public_id', 'espanolcone_spanish_learning_'+nombre);

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
        <div className="p-4">
        <input 
                type="text" 
                value={nombre} 
                placeholder={'Ingresa un nombre asociado a la imagen a cargar'}
                onChange={handleChange} 
                style={{ width:'40%',border: '1px solid #ccc', padding: '18px', borderRadius: '14px' }}
            /></div>
            {nombre?.length < 4 && <p style={{ width:'30%', paddingLeft: '58px',  }}> minimo cuatro 4 caracteres </p>}
        {nombre?.length > 3 &&<input
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />}
     
      </div>
    </div>
  );
}
