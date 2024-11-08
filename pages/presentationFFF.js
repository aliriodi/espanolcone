import React from 'react'
import PDFReader from '../components/Class/Documents/PDFReader'
export default function PresentationFFF() {
  return (
    <div>
        <PDFReader data={{url:'https://res.cloudinary.com/dfddh08q8/image/upload/v1731032342/images/Espanol_con_E_PresentacionFFF-112024v3.pdf',
                          pages:17,
                          type:'pdf',
                          images:'https://res.cloudinary.com/dfddh08q8/image/upload/f_auto,q_auto,pg_1/v1731029170/images/Espanol_con_E_PresentacionFFF-112024v3.pdf'}}></PDFReader>
    </div>
  )
}
