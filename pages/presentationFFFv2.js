import React from 'react'
import PDFReader from '../components/Class/Documents/PDFReader2'
export default function PresentationFFF() {
  return (
    <div>
        <PDFReader data={{url:'https://res.cloudinary.com/dfddh08q8/image/upload/v1731033098/images/Espanol_con_E_PresentacionFFF-112024v3.pdf',
                          pages:6,
                          type:'pdf',
                          images:'https://res.cloudinary.com/dfddh08q8/image/upload/f_auto,q_auto,pg_1/v1731029170/images/Espanol_con_E_PresentacionFFF-112024v3.pdf'}}></PDFReader>
    </div>
  )
}
