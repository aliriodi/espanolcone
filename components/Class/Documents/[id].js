import { useRouter } from 'next/router';
import * as pdfjsLib from 'pdfjs-dist';
import React, { useEffect, useState } from 'react'
import BodyGeneric from '../../../components/GenericsElements/BodyGeneric';
import axios from 'axios';
import ModalPagoABLE from '../../../components/ModalPagoAbleDocuments';
import ActivityTemplate from '../../../components/GenericsElements/Activity/ActivityTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faAngleLeft, faAngleRight, faCirclePlus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import PdfViewer from '../../../components/Class/PDFview';
import { element } from 'prop-types';
import { useSession } from "next-auth/react"
import data2 from './libros.json'
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
export default function LoadUnit() {
    const { data: session, status } = useSession();
    const [totalPages, setTotalPages] = useState(0);
    const [image, setImage] = useState("null");
    const [currentClass, setCurrentClass] = useState(null)
    const [copiado, setCopiado] = useState(null)
    const [newClass, setNewClass] = useState(null)
    const [newPg, setNewPage] = useState('1')
    const [newWidth, setnewWidth] = useState('760')
    const [newHeight, setnewHeight] = useState('750')
    const [currentSheetError, setCurrentSheetError] = useState(false)
    const [currentSheet, setCurrentSheet] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
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

    const [loadUpdate, setLoadUpdate] = useState(false)

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        /// getClass()
        const libro = data2.libros.find(element => element.ubicacion == id);
        //console.log(libro, id)
        if (libro) {
            getPdfPageCount(libro.url).then(numPages => {
                setTotalPages(numPages);
            });
            let originalUrl = libro.image;

            // Reemplazar los parámetros
            let modifiedUrl = originalUrl
                .replace(/pg_\d+/, `pg_${newPg}`)
                .replace(/w_\d+/, `w_${newWidth}`)
                .replace(/h_\d+/, `h_${newHeight}`);
            setImage(modifiedUrl)

        }
    }, [id, totalPages])

    useEffect(() => {

        // Actualiza la nueva clase en caso de ser null y tener la clase actual
        // Y actualisa "currentSheet" 
        if (currentClass && !newClass) {
            setNewClass(currentClass)
            setCurrentSheet(JSON.stringify(currentClass.sheets[currentPage], null, 2))
        }

    }, [currentClass])

    useEffect(() => {
        let originalUrl = image;

        // Reemplazar los parámetros
        let modifiedUrl = originalUrl
            .replace(/pg_\d+/, `pg_${newPg}`)
            .replace(/w_\d+/, `w_${newWidth}`)
            .replace(/h_\d+/, `h_${newHeight}`);
        setImage(modifiedUrl)
        // Actualiza "currentSheet" al cambiar de pagina
        if (newClass) setCurrentSheet(JSON.stringify(newClass.sheets[currentPage], null, 2))

    }, [currentPage, newClass, newPg])


    async function getClass() {
        // Metodo encargado de obtener la clase del "id" Especificado por query 

        try {
            if (id) {
                let result = await axios.get(`/api/class/${id}`)
                setCurrentClass(result?.data?.class1)

            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const copiarUrl = (url) => {
        var aux = document.createElement("input")
        aux.setAttribute("value", url)
        document.body.appendChild(aux)
        aux.select()
        document.execCommand("copy")
        document.body.removeChild(aux)
        setCopiado(true)

    }
    //Funcion para cambiar de pagina manualmente en la lectura de un libro
    const handlePageChange = (e) => {
        const value = e.target.value;

        if (value >= 1 && value <= totalPages) {
            setNewPage(value); // Actualiza el estado si el valor está en el rango permitido
        }
    };

    return (
        <BodyGeneric>

            <div className='pt-4'>
                {session && session.user.pay && <div>

                    <div className='pl-20 pt-4'>


                        {/* Atras */}

                        <button className={'text-warning '} onClick={() => newPg > 1 ? setNewPage(page => --page) : setNewPage(1)}>
                            <FontAwesomeIcon
                                className="text-violet_dark text-[20px] w-[20px]"
                                icon={faArrowLeft}
                            />
                        </button>

                        {/* Numeracion */}
                        <span className={'text-warning pl-20'}>{newPg}/{totalPages}</span>
                        {/* AdELANTE */}
                        <button className={'text-warning pl-20'} onClick={() => totalPages > newPg ? setNewPage(page => ++page) : setNewPage(totalPages)}>
                            <FontAwesomeIcon
                                className="text-violet_dark text-[20px] w-[20px]"
                                icon={faArrowRight} />
                        </button>
                    </div>
                    <div className={'text-warning pt-10 pl-20'}>
                    <label htmlFor="pageInput">Pagina actual: </label>
                            <input
                                id="pageInput"
                                type="number"
                                value={newPg}
                                min={1}
                                max={totalPages}
                                onChange={handlePageChange}
                            />
                            
                    </div>
                    <div className=' text-warning flex'>

                    <div className="mt-6 mb-12 flex flex-col items-center md:items-start">
                            
                            {data2.libros.map(element =>
                                element.ubicacion == id ?<div key={id}>
                                    <div key={id} className="w-full grid grid-cols-1 gap-4 md:w-1/3 lg:w-1/3 px-4 mb-8">
                                        {/* <div className=''> */}
                                        {/* <PdfViewer setTotalPages={setTotalPages} totalPages={totalPages} data={{ value: element.url }}></PdfViewer> */}
                                        {/* </div> */}

                                        {/*Seccion de COPIAR URL*/}
                                        {session.user.role.includes('admin') &&
                                            <div>
                                                {/*element?.url*/}

                                                <button className='bg-violet_dark hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => copiarUrl(element.url)}>Copiar Url</button>
                                                {copiado && <div ><br></br>Copiada la URL</div>}
                                            </div>

                                        }</div>
                                        <div  >
                                        <img
                                            src={image}
                                          //  height={'100%'}
                                          //  width={'100%'}
                                           className="w-full h-auto"
                                            alt='logo2' />
                                    </div> </div> : null
                            )
                            }
                        </div>
                    </div>
                </div>}
                {/*Seccion de no han pagado*/}
                {session && !session.user.pay &&
                    <div className={'text-warning pt-6'}>
                        <ModalPagoABLE open={true} modalPay={() => console.log()} />
                        <div>Seccion restringida solo para usuarios que han pagado</div>
                        <div>Refresque la pagina si desea ver como adquirir los libros o si ya reporto su adquisicion</div>
                        <div>comuniquese al +543516132710</div>
                    </div>}
            </div>



        </BodyGeneric>
    )
}
