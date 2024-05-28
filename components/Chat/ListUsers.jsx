import { useEffect, useRef, useState } from "react";
import ModalGeneric from "../GenericsElements/ModalGeneric";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faEllipsisVertical, faMagnifyingGlass, faPeopleGroup, faPersonHiking, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Spinner from "../Spinner";
import { useSession } from "next-auth/react";


export default function ListUsers({ open, closeModal, currentContacts, createChat }) {

    const [listUsers, setListUsers] = useState(null)
    const [totalUsers, setTotalUsers] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)
    const [role, setRole] = useState("guide")

    const [loadList, setLoadList] = useState(false)
    const [load, setLoad] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)

    const containerRef = useRef(null); 
    
    const { data: session, status, update } = useSession();

    useEffect(()=>{
        
        
        // Obtiene los usuarios en un pricipio
        if(!listUsers){
            setLoad(true)
            getListUsers(true)
        }

    },[])

    useEffect(()=>{
        // Lazy load
        const handleScroll = () => {

            if (!containerRef.current) return;
      
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            console.log(scrollHeight)
            if (scrollTop + clientHeight >= scrollHeight) {

                console.log("finalLLLLLLLLLLLLLLLLLLLLLS")
                addListUsers()

            }
        };
      
        const container = containerRef.current;
            if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) { 
                container.removeEventListener('scroll', handleScroll);
            }
        };

    },[containerRef, listUsers])

    useEffect(()=>{
        setLoad(true)
        setCurrentPage(1)
        getListUsers()
    },[role, searchTerm])

    async function getListUsers(){

        let finaSearchTerm = searchTerm == "" ? null : searchTerm
        let response = await fetch(`/api/users/getBySearchTerm/${finaSearchTerm}?page=1&maxResults=${15}&selects=first_name,last_name,image,email,role${ role ? `&role=${role}`:"" }`)
        let results = await response.json()
        console.log("///////////// ",results," /////////////")

        setTotalUsers(results?.totalResults)
        setListUsers(results?.results)
        setLoadList(false)
        setLoad(false)
    }
    
    async function addListUsers(){

        // En caso de que ya este el maxmo de usuarios no se ejecuta el resto del metodo
        if(listUsers && listUsers?.length == totalUsers) return

        setLoadList(true)

        // Busca a los usuarios con sus especificaciones
        let finaSearchTerm = searchTerm == "" ? null : searchTerm
        let response = await fetch(`/api/users/getBySearchTerm/${finaSearchTerm}?page=${currentPage + 1}&maxResults=${15}&selects=first_name,last_name,image,email,role`)
        let results = await response.json()

        if(results?.results.length > 0 && listUsers?.length){

            setListUsers([...listUsers, ...results?.results])

        }

        setLoadList(false)
        setLoad(false)
        setCurrentPage(currentPage + 1)
    }

    async function handleCreateChat(contactID){
        console.log("Mi ID ",session?.user?._id)
        console.log("Contacto ID ",contactID)

        setSearchTerm("")
        createChat(session?.user?._id, contactID)
        
    }

    return (
        <ModalGeneric open={open} changeModal={closeModal}>

            <div
            className="w-[700px]">

                {/* Titulo */}
                <p className="text-[18px] text-title_color font-medium border-b-2 pb-[25px] pt-[26px] px-[35px]">
                    Encuentra
                </p>

                {/* Barra de busqueda */}
                <div className="w-[400px] flex justify-center bg-white rounded-[7px] p-1 border-2 my-[20px] mx-[25px] relative">

                    {/* Input */}
                    <input
                        className=" flex-grow-[1] outline-none"
                        placeholder='Busca por "Nombre", "Apellido" o "Email"'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text" />

                    {/* Icono */}
                    <div className=" w-6">
                        <FontAwesomeIcon className=" text-violet_dark" icon={faMagnifyingGlass} />
                    </div>
                </div>

                {/* Filtros*/}
                <div
                className="flex py-6 px-3">

                    {/* Guia */}
                    <button
                    onClick={()=>setRole("guide")}
                    className={`font-medium rounded-[5px] px-[22px] py-[10px] ${ role == "guide" ? "btn-success-active text-white" : " text-violet_dark"} mr-4`}>

                        {/* Icono */}
                        <FontAwesomeIcon className="mr-2" icon={faPersonHiking}/>

                        {/* Texto */}
                        Guide
                    </button>

                    {/* Profesores */}
                    <button
                    onClick={()=>setRole("teacher")}
                    className={`font-medium rounded-[5px] px-[22px] py-[10px] ${ role == "teacher" ? "btn-primary-active text-white" : " text-violet_dark"} mr-4`}>

                        {/* Icono */}
                        <FontAwesomeIcon className="mr-2" icon={faChalkboardTeacher}/>

                        {/* Texto */}
                        Teacher

                    </button>
                    
                    {/* Todos */}
                    <button
                    onClick={()=>setRole(null)}
                    className={`font-medium rounded-[5px] px-[22px] py-[10px] ${ !role ? "btn-secondary-active text-white" : " text-violet_dark"}`}>

                        {/* Icono */}
                        <FontAwesomeIcon className="mr-2" icon={faPeopleGroup}/>

                        {/* Texto */}
                        All
                        
                    </button>

                    
                </div>

                {/* Lista de usuarios */}
                <div className="relative">

                    <ul
                    ref={containerRef}
                    className="mt-[20px] relative max-h-[70vh] overflow-auto px-3">
                        
                        {
                            listUsers &&
                            listUsers?.map( (user, index) =>
                                <li
                                key={index}
                                className="w-full grid grid-cols-5 text-violet_dark items-center px-2 py-3">

                                    {/* Imagen */}
                                    <div
                                    className="w-[50px] h-[50px] bg-gray_light overflow-hidden flex justify-center items-end rounded-full">

                                        {
                                            user?.image ?
                                            <Image src={user?.image?.url} className="w-full h-full object-cover" height={50} width={50}/>
                                            :
                                            <FontAwesomeIcon className="text-light text-[39px]" icon={faUser}/>
                                        }
                                    </div>

                                    {/* Nombre y apellido */}
                                    <div
                                    className=" col-span-2">
                                        {`${user?.first_name ? user?.first_name : ""} ${user?.last_name ? user?.last_name : ""}`}
                                    </div>

                                    {/* Rol */}
                                    <div>
                                        {
                                            user?.role &&
                                            ( 
                                                user?.role.includes("admin") ||
                                                user?.role.includes("guide")  ||
                                                user?.role.includes("teacher")
                                            ) &&

                                            <p className={` text-sm rounded-[5px] px-2 w-fit
                                                ${user?.role.includes("admin") && "bg-info text-semibold"}
                                                ${user?.role.includes("guide") && "bg-success_light text-success"}
                                                ${user?.role.includes("teacher") &&  "bg-primary_flat_hover text-primary"}
                                            `}>
                                                {user?.role}
                                            </p>
                                        }
                                    </div>

                                    {/* Agregar */}
                                    <div
                                    className=" ml-auto">

                                        {
                                            currentContacts && !currentContacts[user?._id] &&
                                            <button
                                            onClick={()=>handleCreateChat(user?._id)}
                                            className="bg-primary text-white px-2 py-1 rounded-[7px]">
                                                Agregar
                                            </button>
                                        }
                                    </div>
                                    
                                </li>
                            )
                        }

                        {
                            loadList && 
                            <div
                            className=" bottom-0 bg-[#fffa] h-[200px] flex justify-center items-center">
                                <Spinner/>
                            </div>
                        }
                    </ul>

                    {/* Pantalla de carga */}
                    {
                        load && 
                        <div
                        className="absolute bg-[#fffa] w-full h-full top-0 left-0 flex justify-center items-center rounded-[0_0_7px_7px]">

                            <Spinner/>
                            
                        </div>
                    }

                </div>

                
            </div>

        </ModalGeneric>
    )
}
