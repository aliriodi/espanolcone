import { useEffect, useState } from "react"
import Menu from "../../../components/Menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faBook, faEllipsisVertical, faFilter, faMagnifyingGlass, faMoneyBillTrendUp, faNewspaper, faUsers } from "@fortawesome/free-solid-svg-icons"
import Spinner from "../../../components/Spinner"
import MenuUsers from "../../../components/admin/MenuUser"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import NavBarAdmin from "../../../components/admin/NavBarAdmin"
import axios from "axios"

export default function Admin() {
    const [currentUsers, setCurrentUsers] = useState(null)

    const [totalUsersResult, setTotalUsersResult] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)

    const [maxResults, setMaxResults] = useState(18)

    const [isLoading, setIsLoading] = useState(false)

    const [searchInput, setSearchInput] = useState("")

    const { data: session, status } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (!currentUsers) getAllUsers()
    }, [])

    useEffect(() => {
        if (status && status != "loading" && !session?.user?.role?.includes('admin')) window.location.href = "/inicio/home";
    }, [status])

    useEffect(() => {
        window.scrollTo({ top: 0 });
        getAllUsers();
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(1)
        if (searchInput?.length > 0) getUserBySearchTerm(searchInput)
        else getAllUsers()
    }, [searchInput])

    // Metodos de Usuarios
    async function getAllUsers() {
        setIsLoading(true);
        try {

            const response = await fetch(`/api/users/getAll/${currentPage}?maxResults=${maxResults}`);
            if (!response.ok) {
                throw new Error(`Error en la respuesta de la API: ${response.status} - ${response.statusText}`);
            }

            const users = await response.json();
            setIsLoading(false);
            setCurrentUsers(users.users);
            setTotalUsersResult(users.totalUsers);
        }
        catch (error) {
            setIsLoading(false);
            console.error('Error al cargar los datos:', error);
        }
    }

    async function getUserBySearchTerm(searchTerm) {
        setIsLoading(true)
        try {

            const response = await fetch(`/api/users/getBySearchTerm/${searchTerm}?page=1&maxResults=${maxResults}`);
            if (!response.ok) {
                throw new Error(`Error en la respuesta de la API: ${response.status} - ${response.statusText}`);
            }

            const users = await response.json();
            setCurrentUsers(users.results);
            setTotalUsersResult(users.totalResults);
            setIsLoading(false)

        }
        catch (error) {
            setIsLoading(false);
            console.error('Error al cargar los datos:', error);
            setIsLoading(false)
        }
    }

    async function updateUser(updates) {
        // Esta funcion se encarga de actualizar los datos del usuario 
        // en funcion de lo que se le pase por el parametro "updates"

        setIsLoading(true);

        try {

            const response = await fetch('/api/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: updates?.email, updates: updates }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.message) {
                    // Se Actualiza el usuario
                    // await update({
                    //     ...session?.user,
                    //     accessToken:"dddd"
                    // })

                    console.log('Usuario actualizado con éxito');
                } else {
                    console.error('Error al actualizar el usuario:', data.error);
                }
            } else {
                console.error('Error al realizar la solicitud:', response.status);
            }

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error('Error al realizar la solicitud:', error);
        }
    }


    async function getUser(id) {
        try {

            const response = await fetch('/api/users/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            });
          //  console.log(response)
            if (response.ok) {
                const data = await response.json();

                if (data) {
           //         console.log('te envio datos del' + data.role);
                    return data
                } else {
                    console.error('Error al actualizar el usuario:', data.error);
                }
            } else {
                console.error('Error al realizar la solicitud:', response.status);
            }

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error('Error al realizar la solicitud:', error);
        }


    }

    //funcion para valdiar zelle
    async function validZeller(user) {
        let newUser = { ...user }

        newUser.planSync[newUser?.planSync?.length - 1] = {
            ...newUser.planSync[newUser?.planSync?.length - 1],
            valid: true,
            classview: 1,
            planing: 1
        }

        newUser.calendar[0] = {
            ...newUser.calendar[0],
            assigned: true
        }

        let newUser2 = { ...await getUser(newUser?._id) }
        console.log(newUser2)
        await newUser2.userid.calendar.map(meet => {
            if (newUser.calendar[0].startDatetime === meet.startDatetime) { meet['assigned'] = true; }
        })

        // Envia emails
        let email = {
            to: newUser?.email,
            subject: "Confirmación de pago validado por Zelle",
            title: "Confirmación de pago validado por Zelle",
            content:`<p>Es un placer confirmar que hemos recibido exitosamente su pago a través de Zelle. Queremos agradecerle por su pronta atención y colaboración en este proceso de pago.</p>
            <p>Saludos cordiales,</p>`
        }

        await axios.post('/api/mail/template/1', email)

        updateUser(newUser)
        // updateUser(newUser2.userid)
    }

    //funcion para INvalidar zelle
    async function InvalidZeller(user) {
        let newUser = { ...user }
        newUser.planSync[newUser?.planSync?.length - 1] = {
            ...newUser.planSync[newUser?.planSync?.length - 1],
            valid: true,
            classview: 4,
            planing: 4
        }
        newUser.calendar.shift();

        console.log("newUser ",newUser)
        let newUser2 = { ...await getUser(newUser?._id) }
        console.log("newUser2 213 ",newUser2)
        await newUser2.userid.calendar.map(meet => {
            if (newUser.calendar[0].startDatetime === meet.startDatetime) {
                meet['assigned'] = false;
                meet['preassgined'] = false;
                meet['preassigned'] = false;
                meet.first_name = '';
                meet.last_name = '';
                meet.nameuser = '';
                meet.image = '';
            }
        })

        // Envia emails
        let email = {
            to: newUser?.email,
            subject: "Notificación de pago invalidado por Zelle",
            title: "Notificación de pago invalidado por Zelle",
            content:`<p>Lamentamos informarle que el pago que intentó realizar a través de Zelle ha sido invalidado. Queremos asegurarle que estamos comprometidos a brindarle asistencia y resolver cualquier problema que pueda surgir en el proceso de pago.</p>
            <p>Nuestro equipo ha revisado la transacción y hemos determinado que, por razones específicas, el pago no pudo ser procesado con éxito. Por favor, tenga en cuenta que su solicitud de pago ha sido anulada y no se ha registrado ningún cargo en su cuenta.</p>
            <p>Si tiene alguna pregunta o necesita asistencia adicional para completar su pago, por favor no dude en ponerse en contacto con nosotros. Estamos aquí para ayudarlo y encontrar una solución adecuada para resolver este inconveniente.</p>
            <p>Apreciamos su comprensión y paciencia mientras trabajamos para resolver este problema. Valoramos su negocio y esperamos poder servirle de manera efectiva en el futuro.</p>
            <p>Saludos cordiales</p>`
        }

        await axios.post('/api/mail/template/1', email)


        updateUser(newUser)
        updateUser(newUser2.userid)
    }



    // Paginado
    function nextPage() {
        setCurrentPage(currentPage + 1)
    }

    function prevPage() {
        setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1)
    }

    return (
        <>
            <Menu />

            <div className="px-[60px] py-[119px]    md:px-[25px]">

                {/* Opciones */}
                <NavBarAdmin/>
                    
                {/* Contador de Usuarios */}
                {
                    currentUsers?.length > 0 &&
                    <p className=" text-light my-2">
                        {
                            totalUsersResult > 1 ?
                                `Se encontraron ${totalUsersResult} usuarios`
                                :
                                `Se encontro ${totalUsersResult} usuario`
                        }
                    </p>
                }

                {/* Usuarios */}
                <div className="bg-white rounded-[7px] shadow-[0px_4px_24px_#0000000F] text-violet_dark">

                    {/* Titulo */}
                    <p className="text-[18px] text-title_color font-medium border-b-2 pb-[25px] pt-[26px] px-[35px]">Administracion de usuarios</p>
                    
                    {/* Barra de busqueda */}
                    <div className="w-[400px] flex justify-center bg-white rounded-[7px] p-1 border-2 my-[20px] mx-[25px] relative">

                        {/* Input */}
                        <input
                            className=" flex-grow-[1] outline-none"
                            placeholder='Busca por "Nombre", "Apellido" o "Email"'
                            onChange={(e) => setSearchInput(e.target.value)}
                            type="text" />

                        {/* Icono */}
                        <div className=" w-6">
                            <FontAwesomeIcon className=" text-violet_dark" icon={faMagnifyingGlass} />
                        </div>
                    </div>

                    {/* Encabezado */}
                    <ul className="bg-[#F3F2F7] w-full flex py-[19px] px-[35px] font-semibold justify-between">

                        {/* Nombre y apellido */}
                        <li className="w-[220px]">
                            NOMBRE Y APELLIDO
                        </li>

                        {/* Email */}
                        <li className="w-[220px]">
                            EMAIL
                        </li>

                        {/* rol */}
                        <li className="w-[120px]">
                            ROL
                        </li>

                        {/* Filter */}
                        <li>
                            <FontAwesomeIcon icon={faFilter} />
                        </li>
                    </ul>

                    {/* Listado de Usuarios */}
                    <ul className="relative min-h-[500px]">
                        {
                            currentUsers?.length > 0 ?

                                // Usuarios
                                currentUsers?.map((user, index) =>
                                    <MenuUsers loading={isLoading} key={index} user={user} validZeller={validZeller} InvalidZeller={InvalidZeller} updateUser={updateUser} />
                                )
                                :

                                // No se Encontraron usuarios
                                !isLoading &&
                                <div className="h-full w-full justify-center items-center flex absolute top-0 left-0 text-light text-[18px]">
                                    No se encontraron usuarios
                                </div>
                        }

                        {/* Loader */}
                        {
                            isLoading &&
                            <div className="bg-[#fff7] top-0 left-0 w-full h-full absolute flex justify-center items-center">
                                <Spinner />
                            </div>
                        }
                    </ul>

                </div>

                {/* Botones Paginado */}
                <div className="flex justify-between mt-3">
                    {/* previo */}
                    {
                        currentPage > 1 ?
                            <button
                                onClick={prevPage}
                                className=" w-[42px] h-[42px] flex justify-center items-center bg-white rounded-full text-violet_dark shadow-[0px_4px_24px_#0000002F] font-semibold transition-all
                        hover:bg-[#F3F2F7]">
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                            :
                            <span className="flex w-[42px] h-[42px]"></span>
                    }

                    {/* Pagina Actual */}
                    <p className=" w-[42px] h-[42px] bg-primary text-white flex justify-center items-center rounded-full font-semibold">{currentPage}</p>

                    {/* Siguiente */}
                    {
                        (maxResults * currentPage + 1) < totalUsersResult ?
                            <button
                                onClick={nextPage}
                                className=" w-[42px] h-[42px] flex justify-center items-center bg-white rounded-full text-violet_dark shadow-[0px_4px_24px_#0000002F] font-semibold transition-all
                        hover:bg-[#F3F2F7]">
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                            :
                            <span className="flex w-[42px] h-[42px]"></span>
                    }

                </div>
            </div>
        </>
    )
}