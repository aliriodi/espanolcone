import fetch from 'node-fetch';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { writeFile, createWriteStream } from 'fs';
import { resolve as _resolve } from 'path';
import { fileURLToPath } from 'url';
// Configuración de la URL base y el número total de imágenes
const urlBase = 'https://image.slidesharecdn.com/escueladebolsa1-240125204824-92d94bc3/75/Escuela-de-Bolsa-1-pdf-';
const totalImages = 162; // Cambia este valor según el número total de imágenes
const resolution = '2048'; // Resolución de las imágenes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadImage(url, filename) {
  const response = await fetch(url);
  const buffer = await response.buffer();

  return new Promise((resolve, reject) => {
    writeFile(filename, buffer, (err) => {
      if (err) reject(err);
      console.log(`Saved to ${filename}`);
      resolve();
    });
  });
}

async function downloadAllImages() {
  for (let i = 1; i <= totalImages; i++) {
    const imageUrl = `${urlBase}${i}-${resolution}.jpg`;
    const filename = _resolve(__dirname, 'images', `image-${i}.jpeg`);
    console.log(`Downloading ${imageUrl}`);
    await downloadImage(imageUrl, filename);
  }
}
const imagesDir = 'C:/Users/aliri/Desktop/Busqueda/nuevoEspanolconE/trader/pages/inicio/documents/images';
const outputFilename = 'C:/Users/aliri/Desktop/Busqueda/nuevoEspanolconE/trader/pages/inicio/documents/book.pdf';

async function createPdf() {
  const pdfDoc = await PDFDocument.create();
  const files = fs.readdirSync(imagesDir);
  files.sort((a, b) => {
    const aNum = parseInt(a.match(/\d+/), 10);
    const bNum = parseInt(b.match(/\d+/), 10);
    return aNum - bNum;
  });
  for (const file of files) {
    const imagePath = path.join(imagesDir, file);

    try {
      // Convertir la imagen a JPEG usando sharp
      const imageBuffer = await sharp(imagePath).jpeg().toBuffer();
      const image = await pdfDoc.embedJpg(imageBuffer);

      // Añadir la imagen a una nueva página en el PDF
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });

      console.log(`Added ${file} to PDF`);
    } catch (error) {
      console.error(`Error processing image ${imagePath}:`, error);
    }
  }

  // Guardar el PDF generado
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputFilename, pdfBytes);
  console.log(`PDF created successfully at ${outputFilename}`);
}




downloadAllImages()
  .then(() => {
    console.log('All images downloaded, now creating PDF...');
   // createPdf();
  })
  .catch((err) => console.error('Error downloading images:', err));
