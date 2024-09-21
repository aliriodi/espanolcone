import React, { useState } from "react";

export default function CloudinaryUploader({ pdfUrl }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [nombreRuta, setNombreRuta] = useState(null);
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
      // Crear un objeto FormData y añadir datos
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET);
      formData.append('public_id', 'Espanol_con_E_' + nombre);

      // Enviar el FormData a Cloudinary
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/' + process.env.NEXT_PUBLIC_CLOUDINARY_NAME + '/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (pdfUrl) pdfUrl(data.secure_url);
        console.log(data.secure_url)
        setNombreRuta(data.secure_url)
        setLoading(false);
        setError(null);
      } else {
        throw new Error('Error uploading PDF');
      }
    } catch (error) {
      setError('Error uploading PDF. Please try again.');
      setLoading(false);
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <div>
      <div className="text-black">
        {loading ? <p>cargando....</p> : null}
        {error ? <p>{error}</p> : null}
        <div className="p-4">
          <input
            type="text"
            value={nombre}
            placeholder={'Ingresa un nombre asociado al PDF a cargar'}
            onChange={handleChange}
            style={{
              width: '40%',
              border: '1px solid #ccc',
              padding: '18px',
              borderRadius: '14px',
            }}
          />
        </div>
        {nombre?.length < 4 && (
          <p style={{ width: '30%', paddingLeft: '58px' }}>
            {' '}
            mínimo cuatro 4 caracteres{' '}
          </p>
        )}
        {nombre?.length > 3 && (
          <input
            type="file"
            accept="application/pdf" // Acepta solo archivos PDF
            onChange={handleUpload}
          />
        )}
        <p className="text-warning">{nombreRuta}</p>
      </div>
    </div>
  );
}
