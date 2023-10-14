import React ,  { useState, useEffect }from 'react';
import { useSession } from "next-auth/react";
import Menu from "../Menu"
const modelos = require("./modelos.json");

export default function CargarclaseFE() {
  const {data: session,status} = useSession();
  
  const [pages, setPages] = useState({
    page1: {
      type: "tipo1",
      section: { number: 0, value: "Mis Metas" },
      templae:"",
      data: [{type:"image",value:"https://res.cloudinary.c…/logo-primary_qoagkg.png",alt:"Espanol con E", className:"Portadaimg"}],
    }    
  });

 // Función para agregar una nueva página
 const agregarPagina = () => {
  const newPageNumber = Object.keys(pages).length + 1;
  const newPage = {
    type: `tipo${newPageNumber}`,
    section: { index: 0, value: "Portada", template: `url${newPageNumber}` },
    data: [],
  };
  setPages((prevPages) => ({
    ...prevPages,
    [`page${newPageNumber}`]: newPage,
  }));

};

async function cargarpagina(){
  console.log('iniciando carga')

  let nuevaclase=[];
  const numberOfPages = Object.keys(pages).length;
 
  //cargo las nuevas clases las primeras 11 paginas
  for(let i=1;i<numberOfPages;i++){
  //mapeo el objeto de clases por numero de paginas 
  //es un OBJETO
      nuevaclase.push(pages['page'+i])
  
  }

  await fetch('/api/class/add/', 
  {  //redirect: 'follow',
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     credentials: 'same-origin', // include, *same-origin, omit
      headers: {
                 'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
               },
      body: JSON.stringify({
                           level:"Nivel A1",
                            unit:"Unidad 6",
                            description:'nivela2 del MVP con ejemplos de ppopppus2 1 2 3 4 5 6 7',
                            sheets:nuevaclase})
                            
                            //mando por el body la nueva clase

  }
   )
   // Convierte el objeto 'pages' en una cadena JSON
const jsonString = JSON.stringify(pages, null,  Object.keys(pages).length);

//fs.writeFileSync('pages.json', jsonString, 'utf-8');
   console.log('elemento cargado')
   setPages({
    page1: {
      type: "tipo1",
      section: { number: 0, value: "Mis Metas" },
      templae:"",
      data: [{type:"image",value:"https://res.cloudinary.c…/logo-primary_qoagkg.png",alt:"Espanol con E", className:"Portadaimg"}],
    }    
  })
}



  return (
    <>
      <Menu />
     
       {session && session.user ?
       <div className='origin-top'>
             
              <div className="translate-x-1/2 w-1/2 h-2  block bg-[--primary] border-[--orange] border-4 p-10">
                <h1 className="translate-x-px -translate-y-full text-black text-[28px]">¡Hola {session.user.first_name}!</h1>
                <h2 className="translate-x-px -translate-y-full  text-black text-[28px]">Tu rol es: {(session.user.role[0])}</h2>
                {session.user.role.includes('admin')?
                   <div>
               

               {console.log(pages)}


             {/* Boton para agregar pagina */}
               <button  style={{
                  
                  width:'30%',
                  padding: '10px 20px',     // Ajusta el espaciado interno del botón
                  color: 'white',           // Cambia el color del texto
                }}
                className= 'bg-primary text-white px-5 py-2 rounded mr-5'
               onClick={agregarPagina}>Agregar Página</button>

             {/* Boton para cargar Pagina a BD    */}
             <button  style={{
                  
                  width:'30%',
                  padding: '10px 20px',     // Ajusta el espaciado interno del botón
                  color: 'white',           // Cambia el color del texto
                }}
                className= 'bg-primary text-white px-5 py-2 rounded mr-5'
               onClick={cargarpagina}>Cargar Clase a BD</button>

                   </div>
                
                







                :<h1>Su rol no cumple con el perfil para entrar en esta seccion, sus datos han sido enviados al adminitrador de la pagina</h1>}

              </div>
              </div>
             
             
             :
             
             
             <h1 className="">¡Hola!</h1>
            }

    </>
  )
}
