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
    setUrlPDF(data.url);
    setTotalPages(data.pages)
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
    if (NumPageNow > 1) { setNumPageNow(--NumPageNow) }
  }
  function NextPage() {
    if (NumPageNow < totalPages) { setNumPageNow(++NumPageNow) }
  }

  console.log(data)
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
       <b> <span className={'text-primary pl-20'}> {NumPageNow} / {totalPages} </span></b>
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


