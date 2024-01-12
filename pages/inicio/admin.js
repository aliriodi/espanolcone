import { useEffect, useState } from "react"
import Menu from "../../components/Menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faEllipsisVertical, faFilter } from "@fortawesome/free-solid-svg-icons"
import Spinner from "../../components/Spinner"
import MenuUsers from "../../components/admin/MenuUser"
import { useSession } from "next-auth/react"

export default function Admin() {
    const [currentUsers, setCurrentUsers] = useState(null)
    const [totalUsers, setTotalUsers] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const { data: session, status } = useSession();

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

    // Metodos de Usuarios
    async function getAllUsers() {
        setIsLoading(true);
        try {

            const response = await fetch(`/api/users/getAll/${currentPage}`);
            if (!response.ok) {
                throw new Error(`Error en la respuesta de la API: ${response.status} - ${response.statusText}`);
            }

            const users = await response.json();
            setIsLoading(false);
            setCurrentUsers(users.users);
            // setTotalUsers(users.totalUsers);
        }
        catch (error) {
            setIsLoading(false);
            console.error('Error al cargar los datos:', error);
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
            console.log(response)
            if (response.ok) {
                const data = await response.json();

                if (data) {
                    console.log('te envio datos del' + data.role);
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

        let newUser2 = { ...await getUser(newUser.calendar[0].id) }
        console.log(newUser2)
        await newUser2.userid.calendar.map(meet => {
            if (newUser.calendar[0].startDatetime === meet.startDatetime) { meet['assigned'] = true; }
        })


        updateUser(newUser)
        updateUser(newUser2.userid)
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

        let newUser2 = { ...await getUser(newUser.calendar[0].id) }
        console.log(newUser2)
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

            <div className="px-[60px] py-[119px]
            md:px-[25px]">
                <div></div>

                {/* Usuarios */}
                <div className="bg-white rounded-[7px] shadow-[0px_4px_24px_#0000000F] text-violet_dark">

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
                            currentUsers &&
                            currentUsers?.map((user, index) =>
                                <MenuUsers loading={isLoading} key={index} user={user} validZeller={validZeller} InvalidZeller={InvalidZeller} updateUser={updateUser} />
                            )
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
                    <button
                        onClick={nextPage}
                        className=" w-[42px] h-[42px] flex justify-center items-center bg-white rounded-full text-violet_dark shadow-[0px_4px_24px_#0000002F] font-semibold transition-all
                    hover:bg-[#F3F2F7]">
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>

                </div>
            </div>
        </>
    )
}