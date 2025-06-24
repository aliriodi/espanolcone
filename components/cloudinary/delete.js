//import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfddh08q8',
  api_key: '895177157582541',
  api_secret: 'mWvmdXZTPOQcjsGi_4ylotDWSzc',
});


function getPublicIdFromUrl(url) {
  // Extrae la parte después del "/upload/v<timestamp>/"
  const parts = url.split('/upload/');
  if (parts.length < 2) return null;
  // Ejemplo: "v1687700000/espanolcone_spanish_learning_nombre123.jpg"
  const pathAfterUpload = parts[1];

  // Quitamos la versión (v1687700000/) si existe
  const withoutVersion = pathAfterUpload.replace(/^v\d+\//, '');

  // Quitamos la extensión (jpg, png, etc)
  const publicId = withoutVersion.replace(/\.[^/.]+$/, '');

  return publicId;
}


async function deleteImageByUrl(url) {
  const publicId = getPublicIdFromUrl(url);
  if (!publicId) {
    throw new Error('No se pudo extraer el public_id de la URL');
  }

  try {
    //const result = await cloudinary.uploader.destroy(publicId);
    const result = await cloudinary.uploader.destroy('images/cqcxbwato0wreku7u4gd');
    console.log('Resultado eliminación:', result);
    return result;
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    throw error;
  }
}
deleteImageByUrl('https://res.cloudinary.com/dfddh08q8/image/upload/s--BYvWNWNJ--/v1715612064/images/cqcxbwato0wreku7u4gd.png')