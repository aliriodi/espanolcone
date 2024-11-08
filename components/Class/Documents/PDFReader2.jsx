import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faAngleLeft, faAngleRight, faCirclePlus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function PDFReader({ data }) {
  // const { data: session, status } = useSession();
  const [totalPages, setTotalPages] = useState(0);
  const [totalPages2, setTotalPages2] = useState(0);
  const [PageNow, setPageNow] = useState('');
  const [urlPDF, setUrlPDF] = useState(null);
  let [NumPageNow, setNumPageNow] = useState(1);

  //Parametros iniciales
  useEffect(() => {
    setPageNow(data.images);
    setNumPageNow(14)
    setUrlPDF(data.url);
    setTotalPages(data.pages)
   // async function getPDFPageCount(pdfUrl) {
    //   let pageCount = 0;
    //   let pageExists = true;
    
    //   while (pageExists) {
    //     try {
    //       const response = await fetch(`${pdfUrl}.jpg`);
    //       if (response.ok) {
    //         pageCount++;
    //       } else {
    //         pageExists = false; // No hay más páginas
    //       }
    //     } catch (error) {
    //       console.error('Error fetching page:', error);
    //       pageExists = false;
    //     }
    //   }
    
    //   return pageCount;
    // }
    
    // Usar la función

    //getPDFPageCount(data.url).then(pageCount => console.log(`Número de páginas: ${pageCount}`));
    



  },
    [])


  useEffect(() => {
    if (PageNow) {
      // Reemplazar los parámetros
      let modifiedUrl = PageNow
        .replace(/pg_\d+/, `pg_${NumPageNow}`)
      //  .replace(/w_\d+/, `w_${newWidth}`)
      //  .replace(/h_\d+/, `h_${newHeight}`);
      setPageNow(modifiedUrl)
    }
  }, [NumPageNow])


  useEffect(() => { },
    [])
  function PreviosPage() {
    
      if(NumPageNow===10){setNumPageNow(14)}
      if(NumPageNow===11){setNumPageNow(10)}
      if(NumPageNow===12){setNumPageNow(11)}
      if(NumPageNow===13){setNumPageNow(12)}
      if(NumPageNow===15){setNumPageNow(13)}
  }
  function NextPage() {
         
      if(NumPageNow===14){setNumPageNow(10)}
      if(NumPageNow===10){setNumPageNow(11)}
      if(NumPageNow===11){setNumPageNow(12)}
      if(NumPageNow===12){setNumPageNow(13)}
      if(NumPageNow===13){setNumPageNow(15)}

    
  }

  //console.log(data)
  return (
    data.type == 'pdf' &&
    <div style={data.style}>

      <div className='pt-4 '>

      <div className="flex justify-center items-center mt-4">
        {/* Atras */}

        <button className={'text-primary '} onClick={() => PreviosPage()}>
          <FontAwesomeIcon
            className="text-violet_dark text-[20px] w-[20px]"
            icon={faArrowLeft}
          />
        </button>

        {/* Numeracion */}
       <b> <span className={'text-primary pl-20'}> {NumPageNow===14?1:null} 
       {NumPageNow===10?2:null}  
       {NumPageNow===11?3:null}  
       {NumPageNow===12?4:null}  
       {NumPageNow===13?5:null}  
       {NumPageNow===15?6:null}      
                                     / 
        {totalPages} </span></b>
        {/* AdELANTE */}
        <button className={'text-warning pl-20'} onClick={() => NextPage()}>
          <FontAwesomeIcon
            className="text-violet_dark text-[20px] w-[20px]"
            icon={faArrowRight} />
        </button>
        </div>  </div>
      <div className="flex justify-center items-center mt-1">
        <img className="max-w-full" src={PageNow} alt='Pagina Actual'></img>
        {/* {PageNow} */}
      </div>
    </div>

  )
}


