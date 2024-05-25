import { useEffect, useState } from "react";
import Menu from "../../../../components/Menu";
import NavBarAdmin from "../../../../components/admin/NavBarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router';

export default function Units() {
    const router = useRouter();
    const [recentReviews, setRecentReviews] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!recentReviews) getAllReviews()
    }, [])
    async function getAllReviews() {

        setIsLoading(true);
        try {

            const response = await fetch(`/api/review/unit/get/all`);
            // const response = await fetch(`/api/review/unit/get/all?${currentPage}&maxResults=${maxResults}`);

            if (!response.ok) {
                throw new Error(`Error en la respuesta de la API: ${response.status} - ${response.statusText}`);
            }

            const reviews = await response.json();

            setIsLoading(false);

            console.log("reviews ", reviews)
            setRecentReviews(reviews?.reviews);
            // setTotalUsersResult(users.totalUsers);
        }
        catch (error) {
            setIsLoading(false);
            console.error('Error al cargar los datos:', error);
        }
    }

    function goToUnitsEdit() {
        router.push('/inicio/admin/units/edit/unit')
    }

    return (
        <>
            <Menu />

            <div className="px-[60px] py-[119px]    md:px-[25px]">

                <NavBarAdmin />

                <div className="bg-white rounded-[7px] shadow-[0px_4px_24px_#0000000F] text-violet_dark">
                    {/* go to /edit/unit */}
                    <p className="text-[18px]  text-white font-medium  pb-[05px] pt-[26px] px-[35px]">
                        <button className='bg-primary w-[200px]  border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 hover:shadow-success' onClick={goToUnitsEdit}>Editar unidades</button>
                    </p>

                    {/* Titulo */}
                    <p className="text-[18px] text-title_color font-medium border-b-2 pb-[25px] pt-[26px] px-[35px]">Reseñas recientes</p>

                    {/* Reseñas recientes */}
                    {
                        recentReviews?.length > 0 &&
                        <ul>
                            {
                                recentReviews?.map(
                                    (review, index) =>
                                        <li
                                            className="px-[35px] py-[20px]"
                                            key={index}>

                                            {/* Datos de usuario */}
                                            <div
                                                className="flex justify-between">

                                                {/* Email */}
                                                <p>{review?.user_email}</p>

                                                {/* Puntage */}
                                                <div className="flex">

                                                    {/* Puntage */}
                                                    <p className="mr-2">{review?.score}</p>

                                                    {/* Estrellas */}
                                                    <ul className=" text-light flex">

                                                        <li className={`${review?.score >= 1 && "text-info"} mx-[1px]`}>
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </li>

                                                        <li className={`${review?.score >= 2 && "text-info"} mx-[1px]`}>
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </li>

                                                        <li className={`${review?.score >= 3 && "text-info"} mx-[1px]`}>
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </li>

                                                        <li className={`${review?.score >= 4 && "text-info"} mx-[1px]`}>
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </li>

                                                        <li className={`${review?.score >= 5 && "text-info"} mx-[1px]`}>
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Comentario */}
                                        </li>
                                )
                            }
                        </ul>
                    }
                </div>

            </div>
        </>
    )
}