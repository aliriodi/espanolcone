import Image from 'next/image';
import Menu from '../../../components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Profile(){
    const { data: session, status } = useSession();

    const [currentSection, setCurrentSection] = useState("cuenta")

    const [canBeUpdated, setCanBeUpdated] = useState(false);
    
    const [updates, setUpdates] = useState({
        first_name:session?.user?.first_name,
        last_name:session?.user?.last_name,
        country:session?.user?.country,
        email:session?.user?.email
    })

    const [updatePasseword, setUpdatePasseword] = useState({
        currentPaseword:"",
        newPasseword:"",
        newPassewordConfirm:""
    })

    const [ errorPassword, setErrorPassword ] = useState({
        currentPaseword:false,
        newPasseword:false,
        newPassewordConfirm:false
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

    useEffect(()=>console.log(session?.user),[]) 

    useEffect(()=>{
        // Este UseEffect se va a encargar de verificar si hay cambios en los inputs en el formulario de "Cuenta"
        // para activar el boton de "Guardar cambios" 

        let currentDates ={
            first_name:session?.user?.first_name,
            last_name:session?.user?.last_name,
            country:session?.user?.country,
            email:session?.user?.email
        }

        if(!areEquals(currentDates, updates))setCanBeUpdated(true);
        else setCanBeUpdated(false);

    },[updates, currentSection])

    useEffect(()=>{
        // Este UseEffect se va a encargar de verificar si hay cambios en los inputs en el formulario de "Seguridad"
        // para activar el boton de "Guardar cambios" 

        if(updatePasseword.currentPaseword.length > 0 &&
            updatePasseword.newPasseword.length > 0 &&
            updatePasseword.newPassewordConfirm.length > 0 )setCanBeUpdated(true);
        else setCanBeUpdated(false)

    },[updatePasseword, currentSection])

    useEffect(()=>{
        setUpdates({
        first_name:session?.user?.first_name,
        last_name:session?.user?.last_name,
        country:session?.user?.country,
        email:session?.user?.email
        })

    },[session])
    
    async function updateDates(updates) {
        // Esta funcion se encarga de actualizar los datos del usuario 
        // en funcion de lo que se le pase por el parametro "updates"
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

    function changePasseword(){
        // Se encarga de verificar el formulario de seguridad y actualizar la contraseña del usuario
        // si todo esta correto

        let errors = {
            currentPaseword:false,
            newPasseword:false,
            newPassewordConfirm:false
        };

        if (updatePasseword.currentPaseword !== session?.user?.password)errors.currentPaseword = true;
        else errors.currentPaseword = false

        if(updatePasseword.newPasseword.length < 8)errors.newPasseword = true;
        else errors.newPasseword = false

        if(updatePasseword.newPasseword !== updatePasseword.newPassewordConfirm)errors.newPassewordConfirm = true;
        else errors.newPassewordConfirm = false

        setErrorPassword(errors);
        if(errors.currentPaseword ||
            errors.newPassewordConfirm)return;
        
        
        updateDates({
            password: updatePasseword.newPasseword
        })
    }
    
    function returnChanges(e){
        e.preventDefault()
        setUpdates({
            first_name:session?.user?.first_name,
            last_name:session?.user?.last_name,
            country:session?.user?.country,
            email:session?.user?.email
        })

        setUpdatePasseword({
            currentPaseword:"",
            newPasseword:"",
            newPassewordConfirm:""
        })
    }

    return(
        <>
        <Menu/>

        <section className='py-[119px] px-[60px]
        md:px-[25px]'>

            <div className='mb-[24px] flex'>
                <button
                onClick={()=>setCurrentSection("cuenta")}
                className={`text-title_color px-[22px] py-[10px] ${currentSection == "cuenta" && "btn-success-active"}`}>
                    <FontAwesomeIcon
                    className='mr-[5px]' 
                    icon={faUser}/> Cuenta
                </button>

                <button
                onClick={()=>setCurrentSection("seguridad")}
                className={`text-title_color px-[22px] py-[10px] ${currentSection == "seguridad" && "btn-success-active"}`}>
                    <FontAwesomeIcon
                    className='mr-[5px]' 
                    icon={faLock}/>Seguridad
                </button>

            </div>
            
            
            {/* Secion de Cuenta */}
            {
                currentSection == "cuenta" &&
                
                // Formulario de edicion 
                <div className=' rounded-[10px] overflow-hidden shadow-[0px_4px_24px_#0000000F]'>
                        
                        <div className='bg-white relative px-[22px] py-[26px]'>

                            {/* Titulo */}
                            <p className='text-[18px] text-title_color font-medium border-b-2 pb-[25px]'>Detalles del usuario</p>

                            {/* Imagen */}
                            <div className='flex items-center'>
                                
                                <div className='py-[26px]'>
                                    {session?.user?.image?.url ?
                                        <Image
                                        className='bg-[#B9B9C3] w-[125px] h-[125px] relative rounded-[10px] object-cover'
                                        src={session?.user?.image?.url}
                                        width={125}
                                        height={125}/>
                                        :
                                        <span className='bg-[#B9B9C3] w-[125px] h-[125px] relative rounded-[10px] flex justify-center items-center'>
                                            <FontAwesomeIcon className='text-violet_dark text-[3em]' icon={faUser}/>
                                        </span>
                                    }
                                </div>
                                
                                <button className='btn-primary py-[8px] px-[19px] ml-[22px]'>
                                    Actualizar
                                </button>
                            </div>

                            {/* Formulario */}
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                updateDates(updates)
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
            }

            
            {/* Secion de Seguridad */}
            {
                currentSection == "seguridad" &&
                <div className=' rounded-[10px] overflow-hidden shadow-[0px_4px_24px_#0000000F]'>
                    <div className='bg-white relative px-[22px] py-[26px]'>
                        <p className='text-[18px] text-title_color font-medium border-b-2 pb-[25px]'>Detalles del usuario</p>

                        {/* Formulario */}
                        <form onSubmit={(e)=>{
                                e.preventDefault()
                                changePasseword()
                                }}>
                                
                                {/* Campos */}
                                <div className='flex justify-between relative
                                md:flex-col md:hidden'>

                                {/* Campo de la Izquierda */}
                                <div className='w-full pr-5 md:p-0'>
                                    
                                    {/* Campo Contraseña actual */}
                                    <div className="flex flex-col mt-[18px]
                                    md:mt-[10px]"
                                    style={{ width:'100%', flexGrow:1}}>
                                        
                                        <div style={{ margin: '8px 0' }}>
                                            <label htmlFor="current_password" className="md:text-[12px]">Contraseña actual</label>
                                        </div>

                                        <input
                                        className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorPassword.currentPaseword ? "border-danger" :"border-gray-clear"}
                                        md:text-[12px]`}
                                        type="text"
                                        id="current_password"
                                        placeholder='Ingresa tu contraseña actual'
                                        value={updatePasseword.currentPaseword}
                                        onChange={(e) => setUpdatePasseword({...updatePasseword, currentPaseword: e.target.value})}
                                        />
                                        
                                        {/* Error */}
                                        {errorPassword.currentPaseword && (
                                            <p className='text-danger'>La contraseña ingresada no coinside con la contraseña actual</p>
                                        )}
                                    </div>

                                    {/* Campo Nueva contraseña */}
                                    <div className="flex flex-col mt-[18px]
                                    md:mt-[10px]"
                                    style={{ width:'100%', flexGrow:1}}>

                                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                                            <label htmlFor="new_password" className="md:text-[12px]">Nueva contraseña</label>
                                        </div>

                                        <input
                                        className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorPassword.newPasseword ? "border-danger" :"border-gray-clear"}
                                        md:text-[12px]`}
                                        type="text"
                                        id="new_password"
                                        placeholder='Ingresa tu nueva contraseña'
                                        value={updatePasseword.newPasseword}
                                        onChange={(e) => setUpdatePasseword({...updatePasseword, newPasseword: e.target.value})}
                                        />

                                        {/* Error */}
                                        {errorPassword.newPasseword && (
                                            <p className='text-danger'>La contraseña tiene menos de 8 caracteres</p>
                                        )}
                                    </div>
                                    
                                </div>

                                {/* Campo de la Derecha */}
                                <div className='w-full pl-5 flex items-end md:p-0'>
                                    

                                    {/* Campo Confirma tu nueva contraseña */}
                                    <div className="flex flex-col mt-[18px]
                                    md:mt-[10px]"
                                    style={{ width:'100%', flexGrow:1}}>

                                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                                            <label htmlFor="new_password_confirm" className='md:text-[12px]'>Confirma tu nueva contraseña</label>
                                        </div>

                                        <input
                                        className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorPassword.newPassewordConfirm ? "border-danger" :"border-gray-clear"}
                                        md:text-[12px]`}
                                        type="text"
                                        id="new_password_confirm"
                                        placeholder='Confirma tu nueva contraseña'
                                        value={updatePasseword.newPassewordConfirm}
                                        onChange={(e) => setUpdatePasseword({...updatePasseword, newPassewordConfirm: e.target.value})}
                                        />
                                        
                                        {/* Error */}
                                        {errorPassword.newPassewordConfirm && (
                                            <p className='text-danger md:text-[12px]'>Las contraseñas no coinsiden</p>
                                        )}
                                    </div>
                                    
                                </div>

                                </div>


                                {/* Responsive Campos */}
                                <div className='justify-between relative hidden
                                md:flex-col md:flex'>

                                    {/* Campo de la Izquierda */}
                                    <div className='w-full pr-5 md:p-0'>

                                        {/* Campo Contraseña actual */}
                                        <div className="flex flex-col mt-[18px]
                                        md:mt-[10px]"
                                        style={{ width:'100%', flexGrow:1}}>
                                            
                                            <div style={{ margin: '8px 0' }}>
                                                <label htmlFor="current_password" className="md:text-[12px]">Contraseña actual</label>
                                            </div>

                                            <input
                                            className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorPassword.currentPaseword ? "border-danger" :"border-gray-clear"}
                                            md:text-[12px]`}
                                            type="text"
                                            id="current_password"
                                            placeholder='Ingresa tu contraseña actual'
                                            value={updatePasseword.currentPaseword}
                                            onChange={(e) => setUpdatePasseword({...updatePasseword, currentPaseword: e.target.value})}
                                            />
                                            
                                            {/* Error */}
                                            {errorsForm.name && (
                                                <p className='text-danger'>{t("warningname")}</p>
                                            )}
                                        </div>

                                        
                                        {/* Campo Nueva contraseña */}
                                        <div className="flex flex-col mt-[18px]
                                        md:mt-[10px]"
                                        style={{ width:'100%', flexGrow:1}}>

                                            <div className="flex justify-between" style={{ margin: '8px 0' }}>
                                                <label htmlFor="new_password" className='md:text-[12px]'>Nueva contraseña</label>
                                            </div>

                                            <input
                                            className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorPassword.newPasseword ? "border-danger" :"border-gray-clear"}
                                            md:text-[12px]`}
                                            type="text"
                                            id="new_password"
                                            placeholder='Ingresa tu nueva contraseña'
                                            value={updatePasseword.newPasseword}
                                            onChange={(e) => setUpdatePasseword({...updatePasseword, newPasseword: e.target.value})}
                                            />

                                            {/* Error de Apellido */}
                                            {errorsForm.last_name && (
                                                <p className='text-danger md:text-[12px]'>{t("warningLastname")}</p>
                                            )}
                                        </div>

                                        {/* Campo Confirma tu nueva contraseña */}
                                        <div className="flex flex-col mt-[18px]
                                        md:mt-[10px]"
                                        style={{ width:'100%', flexGrow:1}}>

                                            <div className="flex justify-between" style={{ margin: '8px 0' }}>
                                                <label htmlFor="new_password_confirm" className="md:text-[12px]">Confirma tu nueva contraseña</label>
                                            </div>

                                            <input
                                            className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorPassword.newPassewordConfirm ? "border-danger" :"border-gray-clear"}
                                            md:text-[12px]`}
                                            type="text"
                                            id="new_password_confirm"
                                            placeholder='Confirma tu nueva contraseña'
                                            value={updatePasseword.newPassewordConfirm}
                                            onChange={(e) => setUpdatePasseword({...updatePasseword, newPassewordConfirm: e.target.value})}
                                            />

                                            {/* Error */}
                                            {errorsForm.country && (
                                                <p className='text-danger'>{t("warningCountry")}</p>
                                            )}
                                        </div>
                                        
                                    </div>

                                </div>
                                
                                <div className='flex mt-[30px]
                                md:flex-col md:mt-[40px]'>
                                    {/* Guardar Cambios */}
                                    <input
                                    type='submit'
                                    value={"Guardar cambios"}
                                    className={`btn-primary py-[10px] px-[22px] mr-[10px] ${!canBeUpdated && "pointer-events-none opacity-50"}
                                    md:w-full md:mb-3`}/>

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
            }

        </section>
        </>
    )
}