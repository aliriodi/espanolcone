import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CloudinaryBookViewer = ({ folderName }) => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Obtener las imágenes de Cloudinary
    const fetchImages = async () => {
      const cloudName = 'dvy9qircy';
      const url = `https://res.cloudinary.com/dvy9qircy/image/upload/v1724205001/forex/ELSECRETO.json`;

      try {
        const response = await axios.get(url);
        
        const imageUrls = response.data.resources.map(
          (image) => `https://res.cloudinary.com/${cloudName}/image/upload/${image.public_id}.${image.format}`
        );
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images from Cloudinary:', error);
      }
    };

    fetchImages();
  }, []);
  // [folderName]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div>
      {images.length > 0 ? (
        <>
          <img src={images[currentPage]} alt={`Page ${currentPage + 1}`} />
          <div>
            <button onClick={prevPage} disabled={currentPage === 0}>
              Previous
            </button>
            <button onClick={nextPage} disabled={currentPage === images.length - 1}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p  className=' text-warning'>Loading images...</p>
      )}
    </div>
  );
};

export default CloudinaryBookViewer;
