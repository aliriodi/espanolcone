import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
import BodyGeneric from '../../GenericsElements/BodyGeneric';
import Image from 'next/image';
import { useSession } from "next-auth/react"
import Logo from '../../../public/imgs/Logo-2.jpg'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import data2 from './libros.json'
import ModalPagoABLE from '../../../components/ModalPagoAbleDocuments';

export default function Index() {
  const [totalPages, setTotalPages] = useState({});
  const { data: session, status } = useSession();
  const router = useRouter();
  const [classResume, SetClass] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getPdfPageCount = async (pdfUrl) => {
    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdfDocument = await loadingTask.promise;
      const numPages = pdfDocument.numPages;
      return numPages;
    } catch (error) {
      console.error('Error al cargar el documento PDF:', error);
      return null;
    }
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    if (selectedCategory) {
      const filteredElements = data2.libros.filter(element => element.type === selectedCategory);
      SetClass(filteredElements);
    }
    if (selectedCategory === 'Todos') {
      SetClass(data2.libros);
    }
  }, [selectedCategory]);

  useEffect(() => {
    async function getResume() {
      try {
        await fetch(`/api/class/getResume`)
          .then(response => response.json())
          .then(res => SetClass(data2.libros));
      } catch (error) {
        console.log(error);
      }
    }
    getResume();
  }, []);

  useEffect(() => {
    if (classResume) {
      classResume.forEach(async (element) => {
        const numPages = await getPdfPageCount(element.url);
        setTotalPages(prevState => ({
          ...prevState,
          [element.ubicacion]: numPages
        }));
      });
    }
  }, [classResume]);

  return (
    <BodyGeneric>
      <div
        className='flex justify-center py-[30px] rounded-[100px_0_100px_0] items-center flex-col relative border-2 border-primary
        md:mx-0 '
        style={{ background: 'linear-gradient(38.12deg, #0f1112 40.17%, #FF54A5 122.83%)' }}>

        <div
          className='text-[28px] text-white bg-primary rounded-full overflow-hidden mb-[28px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]'
        >
          <Image
            src={Logo}
            height={50}
            width={50}
            alt='logo' />
        </div>

        {session && session.user ?
          <h1 className="text-primary text-[28px]
           md:text-[24px]">¡Hola {session.user.first_name}!</h1>
          :
          <h1 className="text-primary text-[28px]
           md:text-[24px]">¡Hola!</h1>
        }

        <p className='text-primary text-[21px] mt-[21px] text-center
       md:text-[14px]'>Te mostramos unos documentos para tu lectura en Traders Winner</p>
      </div>
      <br></br>
      {session && session.user.pay &&
        <div>
          <h2>Selecciona una Categoría</h2>
          <select value={selectedCategory} onChange={handleChange}>
            <option value="" disabled>Selecciona una categoría</option>
            {data2.categorias.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
            
          </select></div>}

      <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {session && session.user.pay && classResume ? classResume.map(
          (element, index) =>
            <div
              className=' text-violet_dark rounded-[7px] 
              md:h-[240px] md:w-[100px] 
              lg:h-[280px] lg:w-[220px] 
                          flex flex-col items-center 
                          justify-center text-center cursor-pointer hover:shadow-[0px_4px_14px_0px_#3CBBD6aF] hover:border-primary_hover  transition duration-300' key={index}>

              <div
                key={element.ubicacion}
                onClick={() => router.push('/inicio/documents/' + element.ubicacion)}
                className="  w-full h-full flex flex-col items-center justify-between">

                <Image src={element.image} className='mb-6 w-full' width='150' height='100' alt={element.title} />

                <div className='h-full '>

                  <p className="font-bold w-full">Titulo: {element.title}</p>

                  <p className="md:hidden ">Tipo: {element.type}</p>
                  <p>Paginas: {totalPages[element.ubicacion] !== undefined ? totalPages[element.ubicacion] : 'Cargando...'}</p>

                </div>
              </div>
            </div>
        ) : null}


      </div>
      {/*Seccion de no han pagado*/}
      {session && !session.user.pay &&
        <div className={'text-warning pt-6'}>
          <ModalPagoABLE open={true} modalPay={() => console.log()} />
          <div>Seccion restringida solo para usuarios que han pagado</div>
          <div>Refresque la pagina si desea ver como adquirir los libros o si ya reporto su adquisicion</div>
          <div>comuniquese al +543516132710</div>
        </div>}
    </BodyGeneric>
  );
}
