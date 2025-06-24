const fetchImageNames = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/cloudinary/list');
      const data = await res.json();
  
      if (res.ok) {
        console.log('Imágenes:', data.images);
        return data.images;
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error('Error al traer nombres de imágenes:', err);
    }
  };
  
  fetchImageNames();
  