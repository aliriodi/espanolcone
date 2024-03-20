import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import BodyGeneric from '../../../../../../components/GenericsElements/BodyGeneric';
import axios from 'axios';
import ActivityTemplate from '../../../../../../components/GenericsElements/Activity/ActivityTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCirclePlus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import AdminPage from '../../../../../../components/GenericsElements/Admin/AdminPage';

export default function LoadUnit() {
    const [currentClass, setCurrentClass] = useState(null)
    const [newClass, setNewClass] = useState(null)

    const [currentSheetError, setCurrentSheetError] = useState(false)
    const [currentSheet, setCurrentSheet] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const [loadUpdate, setLoadUpdate] = useState(false)

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        getClass()
    }, [id])

    useEffect(() => {

        // Actualiza la nueva clase en caso de ser null y tener la clase actual
        // Y actualisa "currentSheet" 
        if (currentClass && !newClass) {
            setNewClass(currentClass)
            setCurrentSheet(JSON.stringify(currentClass.sheets[currentPage], null, 2))
        }

    }, [currentClass])

    useEffect(() => {

        // Actualiza "currentSheet" al cambiar de pagina
        if (newClass) setCurrentSheet(JSON.stringify(newClass.sheets[currentPage], null, 2))

    }, [currentPage, newClass])


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

    async function updateClass() {
        setLoadUpdate(true)

        try {
            await axios.post(`/api/class/update`, newClass)

            setLoadUpdate(false)
            // alert("clase actualizada correctamente")
        }
        catch (e) {
            setLoadUpdate(false)
            console.log(e)
            alert("se produjo un error al actualizar la clase")
        }
    }


    function addSheet() {

        // Este metodo se encargan de "agregar paginas"
        let newSheet = {
            type: "text",
            section: {
                number: newClass?.sheets[currentPage].section?.number,
                value: newClass?.sheets[currentPage].section?.value
            },
            template: "template-title-top-1",
            data: [
                {
                    type: "title",
                    value: "Nueva pagina",
                    className: "title-white"
                },
                {
                    type: "paragraph",
                    value: "NIVEL B2",
                    className: "paragraph-default"
                }
            ]
        }

        // Clonar el array original para no mutarlo directamente
        let neoClass = { ...newClass }

        // Insertar el nuevo elemento en la posición deseada usando splice()
        neoClass?.sheets?.splice(currentPage, 0, newSheet)

        // Actualizar el estado con el nuevo array
        setNewClass(neoClass)
    }

    function deleteSheet() {

        // Este metodo se encargan de "eliminar paginas"
        let neoClass = { ...newClass }

        neoClass?.sheets?.splice(currentPage, 1);

        setNewClass(neoClass)
    }


    function handleChangeSheet(e) {

        // Este metodo se encarga de actualizar la pagina actual
        setCurrentSheet(e.target.value)

        try {
            // En caso de que no haya errores actualiza 
            let neoClass = newClass;
            neoClass.sheets[currentPage] = JSON.parse(e.target.value)

            setNewClass(neoClass)
            setCurrentSheetError(false)
        }
        catch (e) {
            console.log(e)
            setCurrentSheetError(true)
        }
    }

    return (
        <BodyGeneric>

            <AdminPage>

                {
                    newClass &&

                    <>
                        {/* Opciones de pagina */}
                        <div className='mt-[60px] mb-[12px] flex justify-between items-end'>

                            <div className=' text-[31px] font-medium text-violet_dark flex'>

                                <span className='mr-2 text-warning font-semibold'>{currentPage + 1}.</span>
                                <p>{newClass?.sheets[currentPage].section?.value}</p>

                            </div>


                            <div className='flex'>

                                {/* Agregar Pagina */}
                                <button
                                    className='bg-secondary text-white font-medium w-[170px] py-2 rounded-[7px] flex items-center justify-center'
                                    onClick={addSheet}>
                                    Agregar Pagina <FontAwesomeIcon className='ml-2' icon={faCirclePlus} />
                                </button>

                                {/* Eliminar Pagina */}
                                <button
                                    className='bg-danger text-white font-medium w-[170px] py-2 rounded-[7px] ml-2 flex items-center justify-center'
                                    onClick={deleteSheet}>
                                    Eliminar Pagina <FontAwesomeIcon className='ml-2' icon={faTrash} />
                                </button>

                            </div>

                        </div>

                        {/* Vista de Pagina */}
                        <div className='border-2 overflow-hidden mb-5 rounded-[7px] relative'>

                            {/* Template */}

                            <ActivityTemplate sheetsOfSection={newClass?.sheets[currentPage]} />

                            {/* Pagina Actual */}
                            {/* <div className='absolute z-[999] top-2 right-2 p-3 rounded-full shadow-[0px_4px_24px_#18292F1A] bg-white font-medium text-violet_dark'>
                                pag. <span className=' text-warning font-semibold'>{currentPage + 1}</span>
                            </div> */}

                            {/* Pagina Previo */}
                            {
                                currentPage != 0 &&
                                <button
                                    className={`
                                transition-all absolute bottom-0 left-0 z-[90] bg-white rounded-full py-8 px-10 shadow-[0px_4px_26px_#00000040] text-title_color text-left text-[18px]
                                hover:bg-primary_hover hover:text-white
                                md:text-[16px] md:px-7`}

                                    onClick={() => setCurrentPage(currentPage - 1)}>

                                    <FontAwesomeIcon icon={faAngleLeft} />

                                </button>
                            }
                            {/* Paginación */}
                            <div className='flex  justify-center'>
                                {newClass?.sheets?.map((item, index) =>
                                    <button
                                        key={index}
                                        className={` transition-all  bottom-0  z-[90]  bg-white rounded-full py-2 px-3 ml-2 mb-6 shadow-[0px_4px_26px_#00000040] text-title_color text-right text-[18px]
                                        hover:bg-primary_hover hover:text-white
                                        md:text-[16px] md:px-7     
                                        ${currentPage === index ? 'bg-primary text-white' : ''}`}  

                                        onClick={() => setCurrentPage(index)}>
                                        {`${(index+1).toString().padStart(2, '0')}`}
                                    </button>
                                )}
                            </div>

                            {/* Pagina Siguiente */}
                            {
                                currentPage < newClass?.sheets?.length - 1 &&
                                <button
                                    className={`
                                transition-all absolute bottom-0 right-0 z-[90]  bg-white rounded-full py-8 px-10 shadow-[0px_4px_26px_#00000040] text-title_color text-right text-[18px]
                                hover:bg-primary_hover hover:text-white
                                md:text-[16px] md:px-7`}

                                    onClick={() => setCurrentPage(currentPage + 1)}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                            }

                        </div>

                        {/* Vista de Codigo */}
                        <div className='relative'>

                            {/* Codigo */}
                            <textarea
                                className={`w-full p-5 h-[1000px] outline-none rounded-[15px] border-2 ${currentSheetError && "border-danger"}`}
                                // value={JSON.stringify(currentClass.sheets[currentPage]?.data, null, 2)}
                                value={currentSheet}
                                onChange={handleChangeSheet}
                                rows={10} // Puedes ajustar el número de filas según sea necesario
                                cols={50} // Puedes ajustar el número de columnas según sea necesario
                            />

                        </div>


                        {/* Actualizar */}
                        <div>
                            <button className={`btn-primary text-[18px] font-medium w-[160px] py-2 rounded-[7px] ${currentSheetError && "opacity-[70%] pointer-events-none"}`} onClick={updateClass}>
                                {
                                    loadUpdate ?
                                        <div
                                            className="inline-block  h-6 w-6 animate-spin rounded-full border-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                            role="status"
                                        ></div>
                                        :
                                        "Actualiza"
                                }
                            </button>

                        </div>
                    </>
                }

            </AdminPage>



        </BodyGeneric>
    )
}
