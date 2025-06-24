// pages/api/cloudinary/list.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
//prefix: '', // opcional si querés filtrar
      max_results: 1000,
    });

    const images = result.resources.map((img) => ({
      public_id: img.public_id,
      url: img.secure_url,
    }));

    res.status(200).json({ images });
  } catch (error) {
    console.error('Error al listar imágenes:', error);
    res.status(500).json({ error: 'Error al listar imágenes' });
  }
}
