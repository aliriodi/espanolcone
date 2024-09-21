import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

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

createPdf();
