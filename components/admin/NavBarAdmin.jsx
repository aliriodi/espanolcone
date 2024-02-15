// import { faBook, faMoneyBillTrendUp, faNewspaper, faUsers } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import Link from 'next/link';
// import { useEffect, useState } from "react";

// export default function NavBarAdmin(){
//     const [currentPathName, setCurrentPathName] = useState("")

//     useEffect(()=> setCurrentPathName(window.location.pathname) ,[])
//     return(
//         <div className="flex">

//             {/* Usuarios */}
//             <Link
//             href={'/inicio/admin/'}
//             className={`text-title_color px-[22px] py-[10px] cursor-pointer ${currentPathName == "/inicio/admin" && "btn-success-active"}`}>
//                 <FontAwesomeIcon className="mr-[5px]" icon={faUsers}/>
//                 Usuarios
//             </Link>

//             {/* Unidades */}
//             <Link
//             href={'#'}
//             // onClick={()=>router.push('/inicio/admin/')}
//             className={`text-title_color px-[22px] py-[10px] cursor-pointer ${currentPathName == "/inicio/admin/units" && "btn-success-active"}`}>
//                 <FontAwesomeIcon className="mr-[5px]" icon={faBook}/>
//                 Unidades
//             </Link>

            
//             {/* Boton para ir a seccion de Blogs */}
//             <Link
//             href={'/inicio/blog/'}
//             className={`text-title_color px-[22px] py-[10px] cursor-pointer ${currentPathName == "/inicio/blog" && "btn-success-active"}`}>
//                 <FontAwesomeIcon className="mr-[5px]" icon={faNewspaper}/>
//                 Blogs
//             </Link>

//             {/* Boton para ir a seccion de recibos */}
//             <Link
//             href={'/inicio/facturacion/'}
//             className={`text-title_color px-[22px] py-[10px] cursor-pointer ${currentPathName == "/inicio/facturacion" && "btn-success-active"}`}>
//                 <FontAwesomeIcon className="mr-[5px]" icon={faMoneyBillTrendUp}/>
//                 Facturacion
//             </Link>
//         </div>
//     )
// }