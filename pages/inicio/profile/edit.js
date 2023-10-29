import Image from 'next/image';
import Menu from '../../../components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Profile(){
    const { data: session, status } = useSession();

    const [canBeUpdated, setCanBeUpdated] = useState(false);
    
    const [updates, setUpdates] = useState({
        first_name:session?.user?.first_name,
        last_name:session?.user?.last_name,
        country:session?.user?.country,
        email:session?.user?.email
    })
    
    const [errorsForm, setErrorsForm] = useState({
        name:false,
        last_name:false,
        country:false,
        email:false,
        password:false,
        confirm_password:false,
        existing_user:false
    })

    useEffect(()=>{
        // Este UseEffect se va a encargar de verificar si hay cambios en los inputs
        // para activar el boton de "Guardar cambios" 

        let currentDates ={
            first_name:session?.user?.first_name,
            last_name:session?.user?.last_name,
            country:session?.user?.country,
            email:session?.user?.email
        }

        if(!areEquals(currentDates, updates))setCanBeUpdated(true);
        else setCanBeUpdated(false);

    },[updates])

    useEffect(()=> setUpdates({
        first_name:session?.user?.first_name,
        last_name:session?.user?.last_name,
        country:session?.user?.country,
        email:session?.user?.email
    }),[session])
    
    async function updateDates() {
        try {
          const response = await fetch('/api/users/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:session?.user?.email, updates: updates}),
          });
      
          if (response.ok) {
            const data = await response.json();
            if (data.message) {
                console.log(data)
              console.log('Usuario actualizado con éxito');
            } else {
              console.error('Error al actualizar el usuario:', data.error);
            }
          } else {
            console.error('Error al realizar la solicitud:', response.status);
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
    }

    function areEquals(objetoA, objetoB) {
        // Compara si dos objetos son iguales y devuelbe un booleano dependiendo de 
        // la resouesta

        const keysA = Object.keys(objetoA);
        const keysB = Object.keys(objetoB);
      
        if (keysA.length !== keysB.length) {
          return false;
        }
      
        for (const key of keysA) {
          if (objetoA[key] !== objetoB[key]) {
            return false;
          }
        }
      
        return true;
    }

    function returnChanges(){
        setUpdates({
            first_name:session?.user?.first_name,
            last_name:session?.user?.last_name,
            country:session?.user?.country,
            email:session?.user?.email
        })
    }

    return(
        <>
        <Menu/>

        <section className='py-[119px] px-[60px]
        md:px-[25px]'>

            <div className='mb-[24px]'>
                <button className='text-title_color px-[22px] py-[10px]'>Cuenta</button>
                <button className='text-title_color px-[22px] py-[10px]'>Seguridad</button>
            </div>
            
            {/* Formulario de edicion */}
            <div className=' rounded-[10px] overflow-hidden shadow-[0px_4px_24px_#0000000F]'>
                    
                    <div className='bg-white relative px-[22px] py-[26px]'>

                        {/* Titulo */}
                        <p className='text-[18px] text-title_color font-medium border-b-2 pb-[25px]'>Detalles del usuario</p>

                        {/* Imagen */}
                        <div className='flex items-center'>
                            
                            <div className='py-[26px]'>
                                <Image
                                className='bg-gray_clear w-[125px] h-[125px] relative rounded-[10px] object-cover'
                                src={session?.user?.image?.url}
                                width={125}
                                height={125}/>
                            </div>
                            
                            <button className='btn-primary py-[8px] px-[19px] ml-[22px]'>
                                Actualizar
                            </button>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={(e)=>{
                            e.preventDefault()
                            updateDates()
                            }}>
                            
                            {/* Campos */}
                            <div className='flex justify-between relative
                            md:flex-col md:hidden'>

                            {/* Campo de la Izquierda */}
                            <div className='w-full pr-5 md:p-0'>
                                
                                {/* Campo Nombre */}
                                <div className="flex flex-col mt-[18px]
                                md:mt-[10px]"
                                style={{ width:'100%', flexGrow:1}}>
                                    
                                    <div style={{ margin: '8px 0' }}>
                                        <label htmlFor="name" className="md:text-[12px]">Nombre</label>
                                    </div>

                                    <input
                                    className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.name ? "border-danger" :"border-gray-clear"}
                                    md:text-[12px]`}
                                    type="text"
                                    id="name"
                                    placeholder='John'
                                    value={updates.first_name}
                                    onChange={(e) => setUpdates({...updates, first_name: e.target.value})}
                                    />
                                    
                                    {/* Error de Nombre */}
                                    {errorsForm.name && (
                                        <p className='text-danger'>{t("warningname")}</p>
                                    )}
                                </div>

                                {/* Campo Pais */}
                                <div className="flex flex-col mt-[18px]
                                md:mt-[10px]"
                                style={{ width:'100%', flexGrow:1}}>

                                    <div className="flex justify-between" style={{ margin: '8px 0' }}>
                                        <label htmlFor="country" className="md:text-[12px]">Pais</label>
                                    </div>

                                    <input
                                    className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.country ? "border-danger" :"border-gray-clear"}
                                    md:text-[12px]`}
                                    type="text"
                                    id="country"
                                    placeholder='U.S.A.'
                                    value={updates.country}
                                    onChange={(e) => setUpdates({...updates, country: e.target.value})}
                                    />

                                    {/* Error de Pais */}
                                    {errorsForm.country && (
                                        <p className='text-danger'>{t("warningCountry")}</p>
                                    )}
                                </div>
                                
                            </div>

                            {/* Campo de la Derecha */}
                            <div className='w-full pl-5 md:p-0'>
                                
                                {/* Campo Apellido */}
                                <div className="flex flex-col mt-[18px]
                                md:mt-[10px]"
                                style={{ width:'100%', flexGrow:1}}>

                                    <div className="flex justify-between" style={{ margin: '8px 0' }}>
                                        <label htmlFor="last_name" className='md:text-[12px]'>Apellido</label>
                                    </div>

                                    <input
                                    className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.last_name ? "border-danger" :"border-gray-clear"}
                                    md:text-[12px]`}
                                    type="text"
                                    id="last_name"
                                    placeholder='Doe'
                                    value={updates.last_name}
                                    onChange={(e) => setUpdates({...updates, last_name: e.target.value})}
                                    />

                                    {/* Error de Apellido */}
                                    {errorsForm.last_name && (
                                        <p className='text-danger md:text-[12px]'>{t("warningLastname")}</p>
                                    )}
                                </div>

                                {/* Campo Email */}
                                <div className="flex flex-col mt-[18px]
                                md:mt-[10px]"
                                style={{ width:'100%', flexGrow:1}}>

                                    <div className="flex justify-between" style={{ margin: '8px 0' }}>
                                        <label htmlFor="email" className='md:text-[12px]'>Email</label>
                                    </div>

                                    <input
                                    className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.email ? "border-danger" :"border-gray-clear"}
                                    md:text-[12px]`}
                                    type="text"
                                    id="email"
                                    placeholder='johndoe@gmail.com'
                                    value={updates.email}
                                    onChange={(e) => setUpdates({...updates, email: e.target.value})}
                                    />
                                    
                                    {/* Error de Email */}
                                    {errorsForm.email && (
                                        <p className='text-danger md:text-[12px]'>{t("warningEmail")}</p>
                                    )}
                                </div>
                                
                            </div>

                            </div>


                            {/* Responsive Campos */}
                            <div className='justify-between relative hidden
                            md:flex-col md:flex'>

                                {/* Campo de la Izquierda */}
                                <div className='w-full pr-5 md:p-0'>
                                    {/* Campo Nombre */}
                                    <div className="flex flex-col mt-[18px]
                                    md:mt-[10px]"
                                    style={{ width:'100%', flexGrow:1}}>
                                        
                                        <div style={{ margin: '8px 0' }}>
                                            <label htmlFor="name" className="md:text-[12px]">Nombre</label>
                                        </div>

                                        <input
                                        className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.name ? "border-danger" :"border-gray-clear"}
                                        md:text-[12px]`}
                                        type="text"
                                        id="name"
                                        placeholder='John'
                                        value={updates.first_name}
                                        onChange={(e) => setUpdates({...updates, first_name: e.target.value})}
                                        />
                                        
                                        {/* Error de Nombre */}
                                        {errorsForm.name && (
                                            <p className='text-danger'>{t("warningname")}</p>
                                        )}
                                    </div>

                                    
                                    {/* Campo Apellido */}
                                    <div className="flex flex-col mt-[18px]
                                    md:mt-[10px]"
                                    style={{ width:'100%', flexGrow:1}}>

                                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                                            <label htmlFor="last_name" className='md:text-[12px]'>Apellido</label>
                                        </div>

                                        <input
                                        className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.last_name ? "border-danger" :"border-gray-clear"}
                                        md:text-[12px]`}
                                        type="text"
                                        id="last_name"
                                        placeholder='Doe'
                                        value={updates.last_name}
                                        onChange={(e) => setUpdates({...updates, last_name: e.target.value})}
                                        />

                                        {/* Error de Apellido */}
                                        {errorsForm.last_name && (
                                            <p className='text-danger md:text-[12px]'>{t("warningLastname")}</p>
                                        )}
                                    </div>

                                    {/* Campo Pais */}
                                    <div className="flex flex-col mt-[18px]
                                    md:mt-[10px]"
                                    style={{ width:'100%', flexGrow:1}}>

                                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                                            <label htmlFor="country" className="md:text-[12px]">Pais</label>
                                        </div>

                                        <input
                                        className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.country ? "border-danger" :"border-gray-clear"}
                                        md:text-[12px]`}
                                        type="text"
                                        id="country"
                                        placeholder='U.S.A.'
                                        value={updates.country}
                                        onChange={(e) => setUpdates({...updates, country: e.target.value})}
                                        />

                                        {/* Error de Pais */}
                                        {errorsForm.country && (
                                            <p className='text-danger'>{t("warningCountry")}</p>
                                        )}
                                    </div>
                                    
                                    {/* Campo Email */}
                                    <div className="flex flex-col mt-[18px]
                                    md:mt-[10px]"
                                    style={{ width:'100%', flexGrow:1}}>

                                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                                            <label htmlFor="email" className='md:text-[12px]'>Email</label>
                                        </div>

                                        <input
                                        className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.email ? "border-danger" :"border-gray-clear"}
                                        md:text-[12px]`}
                                        type="text"
                                        id="email"
                                        placeholder='johndoe@gmail.com'
                                        value={updates.email}
                                        onChange={(e) => setUpdates({...updates, email: e.target.value})}
                                        />
                                        
                                        {/* Error de Email */}
                                        {errorsForm.email && (
                                            <p className='text-danger md:text-[12px]'>{t("warningEmail")}</p>
                                        )}
                                    </div>
                                    
                                </div>

                            </div>
                            
                            <div className='flex mt-[30px]'>
                                {/* Guardar Cambios */}
                                <input
                                type='submit'
                                value={"Guardar cambios"}
                                className={`btn-primary py-[10px] px-[22px] mr-[10px] ${!canBeUpdated && "pointer-events-none opacity-50"}`}/>

                                {/* Descartar Cambios */}
                                <button
                                onClick={returnChanges}
                                className={`border-danger border-[2px] rounded-[5px] text-danger py-[10px] px-[22px] font-medium ${!canBeUpdated && "pointer-events-none opacity-50"}`}>
                                    Descartar cambios
                                </button>
                            </div>
                        </form>
                    </div>
            </div>

        </section>
        </>
    )
}