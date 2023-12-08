import { useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faBookOpen, faCheck, faListCheck, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "../../../../components/Menu";
import Select from 'react-select'
import { setClassPage } from '../../../../redux/ECEActions'
import { useSelector,useDispatch } from "react-redux";
import Result from "postcss/lib/result";
import Confetti from '../../../../components/Confetti'
import { useRouter } from 'next/router';
import Spinner from "../../../../components/Spinner";


export default function Unidad(){
    const {data: session, status, update} = useSession();
    const router = useRouter();

    const [maxSessionReached, setMaxSessionReached] = useState(-1)
    const [numbersOfSections, setNumbersOfSections] = useState([])

    const [congratulationsModal, setCongratulationsModal] = useState(false)

    const [currentClass, setCurrentClass] = useState(null)
    const [unit, setUnit] = useState(null)

    const [level, setLevel] = useState(null)
    const [nextLevelLabel, setNextLevelLabel] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();
    
    const { classId } = router.query;
    
    // const classId = useSelector((state) => state.datos.classid);

    async function updateUser(updates) {
        // Esta funcion se encarga de actualizar las "classes" del usuario
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
                    // Se Actualiza el usuario
                    await update({
                        ...session?.user,
                        accessToken:"dddd"
                    })

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

    async function setSection(section){
        // Esta Funcion Busca la clase actual y asigna 
        // la section correspondiente en el redux 

        await fetch(`/api/class/${classId}`)
        .then((response) => response.json())
        .then((json) =>{

            let sheets = json.class1.sheets; 

            for(let i = 0;i < sheets.length; i++){

                if(sheets[i].section.number == section){

                    session &&
                    classId &&
                    section == 5 &&
                    session?.user?.position?.id == classId &&
                    i < session?.user?.position?.index ? dispatch(setClassPage(session?.user?.position?.index)) : dispatch(setClassPage(i))

                    break;
                }
                
            }

        })
        .catch((error) => console.log(error));
    }

    async function updatePosition(){
        // Esta funcion se encarga de actualizar el position a la siguiente unidad 
        // y actualizar la unidad actual marcandola como echa
        let newUpdatesUser = {...session?.user};

        let currentLevel;
        let currentUnit;

        // Busca al actual unidad y nivel
        newUpdatesUser?.classes.map((level)=>{
            level?.units?.map((unit)=>{
                if(unit?.unitID == classId){
                    currentLevel =level;
                    currentUnit = unit;
                    unit.done=true
                    unit.enable=true
                }
            })
        })
        
        // Se declaran las nuevas variables  
        let newID;
        let newIndexUnit = 0;
        let newIndexlevel = newUpdatesUser?.classes?.indexOf(currentLevel);

        // En caso de llegar al final del nivel se asigna el siguiente nivel
        if(currentLevel?.units?.length -1 == currentLevel?.units?.indexOf(currentUnit)){
            newIndexlevel = newIndexlevel ==  newUpdatesUser?.classes?.length - 1 ? newIndexlevel :  newIndexlevel + 1
        }
        // De lo contrario se asigna la siguiente unidad
        else{
            newIndexUnit = currentLevel?.units?.indexOf(currentUnit) + 1
        }

        // Obtengo la Nueva unidad
        let newUnit = newUpdatesUser?.classes[newIndexlevel].units[newIndexUnit];
        newUnit.enable = true;// Habilita la siguiente unidad

        // Asigna el valor al nuevo ID de "position" en caso de no haber mas niveles se le asigna "null"
        newID = newIndexlevel == newUpdatesUser?.classes?.length - 1 ? null : newUnit?.unitID

        // Obtiene la cantidad de paginas que tien la Nueva Clase
        let newClassLength = fetch(`/api/class/${newUnit?.unitID}`).then((response) => response.json())
        .then(async (json) =>{return json.class1.sheets.length;})
        .catch((error) => console.log(error));
        
        // Se le aplican los cambios al "newUpdatesUser"
        newUpdatesUser = {
            ...newUpdatesUser,
            position:{
                ...newUpdatesUser.position,
                id: newID,
                index: 0,
                maxpages: await newClassLength > 0 ? await newClassLength - 1 : 0
            }
        }

        // Se asigna el siguiente Nivel
        setNextLevelLabel(newUpdatesUser?.classes[newIndexlevel]?.level?.slice(newUpdatesUser?.classes[newIndexlevel]?.level?.length - 2, newUpdatesUser?.classes[newIndexlevel]?.level?.length))

        await updateUser(newUpdatesUser)
        setCongratulationsModal(true)
    }

    useEffect(()=>{
        // En este useEffect se va a comprobar hasta que seccion esta realizada

        // Primero se comprueba si la ultima clase realizada es igual a la ultima que hizo el usuario
        // en caso de ser asi a maxSessionReached se le asigna hasta que seccion llego el usuario
        if(session && classId && session?.user?.position?.id == classId){
            setIsLoading(true)

            fetch(`/api/class/${classId}`)
            .then((response) => response.json())
            .then((json) =>{ 

                if(session?.user?.position?.index == session?.user?.position?.maxpages)updatePosition()
                
                setCurrentClass(json.class1.sheets)
                setMaxSessionReached(session?.user?.position?.index > 0 ? json.class1.sheets[(session?.user?.position?.index)]?.section?.number : session?.user?.position?.index)
                
                setIsLoading(false)

                return;
            })
            .catch((error) =>{
                console.log(error)

                setIsLoading(false)
            });
        }

        // De lo contrario se busca en el resto de clases comprobando el valor de la propiedad done
        else{
            let currentClasses = [];
            let currentClass;
            
            for(let i = 0; session?.user?.classes.length > i; i++){
                // Se ponen todas las clases en un mismo array 
                currentClasses = [...currentClasses, ...session?.user?.classes[i]?.units]
            }
            
            currentClass = currentClasses.find((c)=> c.unitID == classId)// Se busca en que clase estamos
            
            // En caso de ser "True" se le pone el numero de seccion maxima  En caso de ser "False" se le pone -1
            setMaxSessionReached(currentClass?.done ? 6 : -1)
        }


        // Comprueba si todas las unidades estan echas
        console.log(session?.user)
        console.log("maxSessionReached ",maxSessionReached)

    },[session])

    useEffect(()=>{
        
        // Este fetch se encarga de actualizar "currentClass"
        if(classId){
            fetch(`/api/class/${classId}`)
                .then((response) => response.json())
                .then((json) =>{ 
                    setCurrentClass(json.class1.sheets)
                    return;
                })
            .catch((error) => console.log(error));
        }

        // Comprueba si session.user.position tiene asignada la clase correcta
        let currentUnit = {};
        session?.user?.classes?.map((level)=>{
            level?.units?.find((unit)=>{
                if(unit?.unitID == classId){
                    currentUnit = unit;            
                    setLevel(level);
                    setUnit(unit)
                    console.log(unit?.name)
                }
            })
        })

        // En caso de no tener la clase correcta se actualiza a la correspondiente
        if(!currentUnit?.done && currentUnit?.enable && session?.user?.position?.id != classId && currentClass){

            let newUser = {
                ...session?.user,
                position:{
                    ...session?.user.position,
                    id:currentUnit?.unitID,
                    index:0,
                    maxpages:currentClass?.length > 0 ? currentClass?.length - 1 : 0,
                }
            }

            updateUser(newUser);
        }



    },[classId])

    useEffect(()=>{
        // En este useEffect se va a comprobar que secciones hay en la unidad

        let newNumbersOfSections = [];
        if(currentClass && currentClass.length > 0){
            currentClass.map((sheet)=> !newNumbersOfSections.includes(sheet?.section?.number) && newNumbersOfSections.push(sheet?.section?.number))
        } 

        setNumbersOfSections(newNumbersOfSections)
    },[currentClass])

    return(
        <>

        {/* Modal de Felitaciones */}
        {
            congratulationsModal &&

            <div
            onClick={()=>setCongratulationsModal(false)}
            className={`bg-[#000a] fixed w-screen h-screen z-[400] flex justify-center items-center ${congratulationsModal ? "opacity-[1]": "opacity-0"} transition-all`}>

                {/* Modal */}
                <div className={`bg-white rounded-[5px] relative overflow-hidden z-[600]`}>
                    {/* Titulo */}
                    <div>
                        
                        <h4
                        style={{background:'linear-gradient(239.79deg, #33BB99 0.92%, #8438FF 68.4%)'}}
                        className="text-white py-[20px] px-[170px] bg-gradient-to-r font-medium text-[24px] text-center
                        md:text-[18px] md:p-4">
                            ¡FELICIDADES, {session?.user?.first_name?.toUpperCase()}!
                        </h4>

                    </div>

                    {/* Contenido */}
                    <div className="p-[27px] flex justify-center items-center w-full flex-col">
                        <p className="text-center mb-6 text-[21px] text-violet_dark font-medium
                        md:text-[14px]">
                            Finalizaste la <b>{unit?.name}</b> del <b>{level?.level}</b>
                        </p>

                        <Link href={`/inicio/curso?level=${nextLevelLabel}`} className="btn-primary p-2 w-full text-[21px]
                        md:text-[14px]">
                            Continuar
                        </Link>
                    </div>
                </div>
                
                {/* Confeti :D */}
                <Confetti active={true}/>
            </div>
        }     

        <div className="flex">
            <Menu/>

            <section className="relative py-[119px] px-[40px] w-full
            md:ml-0 md:px-[25px]">
                
                {/* Bienvenido */}
                <div
                className='flex justify-center py-[30px] rounded-[8.12px] items-center flex-col relative mx-[20px]
                md:mx-0'
                style={{background:'linear-gradient(38.12deg, #7834E4 40.17%, #0E98B6 122.83%)'}}>
                    {/* Icono */}
                    <FontAwesomeIcon
                    className='text-[28px] text-white p-[21px] bg-primary rounded-full mb-[28px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040] z-10'
                    icon={faMedal}
                    />

                    {/* Titulo */}
                    {session ?
                    <h1 className="text-white text-[28px]
                    md:text-[24px]">Felicidades, {session.user.first_name}</h1>
                    :
                    <h1 className="text-white text-[28px]
                    md:text-[24px]">Felicidades</h1>
                    }

                    {/* Texto */}
                    <p className='text-white text-[21px] mt-[21px] text-center
                    md:text-[14px]'>Has tenido un excelente progreso en tus clases y tu nivel de español.</p>

                    {/* Imagen de la Derecha */}
                    <Image
                    className="absolute top-0 right-0"
                    width={178}
                    height={75}
                    alt=""
                    src={'https://res.cloudinary.com/dfddh08q8/image/upload/v1696941677/images/imagen_2023-10-10_094118748_tgzx2o.png'}/>

                    {/* Imagen de la Izquierda */}
                    <Image
                    className="absolute top-0 left-0"
                    width={178}
                    height={75}
                    alt=""
                    src={'https://res.cloudinary.com/dfddh08q8/image/upload/v1696941779/images/imagen_2023-10-10_094259869_dhejox.png'}/>
                </div>


                {
                    classId !== undefined
                    ?
                    // Unidades
                    <div className=" mx-[20px] my-[32px] flex relative justify-between flex-wrap
                    md:mx-0">
                        
                        {/* Loader */}
                        {
                            isLoading &&
                            <div className="min-h-[312px] w-full h-full absolute top-0 left-0 bg-[#f5f5f599] flex justify-center items-center z-30">
                                <Spinner/>
                            </div>
                        }

                        {/* Mis Metas */}
                        {numbersOfSections.includes(0) &&
                        <Link
                        onClick={(e)=>setSection(0)}
                        href={`/inicio/curso/unidad/${classId}`}
                        className={`
                        ${(maxSessionReached) < 0 && "opacity-[50%]"}
                        ${(maxSessionReached) < 0 && session && !session?.user?.role?.includes("admin") && "pointer-events-none"}
                        mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative
                        hover:bg-[#3331] transition-colors
                        md:w-full`}>
                            
                                {/* Contenido */}
                                <div className="flex items-center">
                                    {/* Icono */}
                                    <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                        <Image
                                            alt=""
                                            width={36}
                                            height={36}
                                            src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1697119384/images/aprender-en-linea_7_cqjjwh.png"}/>
                                    </span>

                                    {/* Texto */}
                                    <p className="ml-[32px] text-[24px] font-medium text-violet_dark
                                    md:text-[16px]">
                                        Mis metas
                                    </p>
                                </div>

                                {/* Check */}
                                {maxSessionReached > 0 && (
                                    <span>
                                        <FontAwesomeIcon
                                        className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                                        icon={faCheck}/>
                                    </span>
                                )}
                        </Link>
                        }
                        
                        {/* Comencemos */}
                        {numbersOfSections.includes(1) &&
                        <Link
                        onClick={()=>setSection(1)}
                        href={`/inicio/curso/unidad/${classId}`}
                        className={`
                        ${(maxSessionReached) < 1 && "opacity-[50%]"}
                        ${(maxSessionReached) < 1 && session && !session?.user?.role?.includes("admin") && "pointer-events-none"}
                        mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative
                        hover:bg-[#3331] transition-colors
                        md:w-full`}>
                            
                                {/* Contenido */}
                                <div className="flex items-center">
                                    {/* Icono */}
                                    <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                        <Image
                                            alt=""
                                            width={36}
                                            height={36}
                                            src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1696970606/images/book_kvtyqe.png"}/>
                                    </span>

                                    {/* Texto */}
                                    <p className="ml-[32px] text-[24px] font-medium text-violet_dark
                                    md:text-[16px]">
                                        Comencemos
                                    </p>
                                </div>

                                {/* Check */}
                                {maxSessionReached > 1 && (
                                    <span>
                                        <FontAwesomeIcon
                                        className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                                        icon={faCheck}/>
                                    </span>
                                )}
                        </Link>
                        }

                        {/* Aprendemos */}
                        {numbersOfSections.includes(2) &&
                        <Link
                        onClick={()=>setSection(2)}
                        href={`/inicio/curso/unidad/${classId}`}
                        className={`
                        ${(maxSessionReached) < 2 && "opacity-[50%]"}
                        ${(maxSessionReached) < 2 && session && !session?.user?.role?.includes("admin") && "pointer-events-none"}
                        mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative
                        hover:bg-[#3331] transition-colors
                        md:w-full`}>
                            
                                {/* Contenido */}
                                <div className="flex items-center">
                                    {/* Icono */}
                                    <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                        <Image
                                            alt=""
                                        width={36}
                                        height={36}
                                        src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1696961818/images/head_ddujqx.png"}/>
                                    </span>

                                    {/* Texto */}
                                    <p className="ml-[32px] text-[24px] font-medium text-violet_dark
                                    md:text-[16px]">
                                        Aprendemos
                                    </p>
                                </div>

                                {/* Check */}
                                {maxSessionReached > 2 && (
                                    <span>
                                        <FontAwesomeIcon
                                        className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                                        icon={faCheck}/>
                                    </span>
                                )}
                        </Link>
                        }
                        
                        {/* Practiquemos */}
                        {numbersOfSections.includes(3) &&
                        <Link
                        onClick={()=>setSection(3)}
                        href={`/inicio/curso/unidad/${classId}`}
                        className={`
                        ${(maxSessionReached) < 3 && "opacity-[50%]"}
                        ${(maxSessionReached) < 3 && session && !session?.user?.role?.includes("admin") && "pointer-events-none"}
                        mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative
                        hover:bg-[#3331] transition-colors
                        md:w-full`}>
                            
                                {/* Contenido */}
                                <div className="flex items-center">
                                    {/* Icono */}
                                    <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                        <Image
                                            alt=""
                                            width={36}
                                            height={36}
                                            src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1697119720/images/hacer-clic_1_zr9rai.png"}/>
                                    </span>

                                    {/* Texto */}
                                    <p className="ml-[32px] text-[24px] font-medium text-violet_dark
                                    md:text-[16px]">
                                        Practiquemos
                                    </p>
                                </div>

                                {/* Check */}
                                {maxSessionReached > 3 && (
                                    <span>
                                        <FontAwesomeIcon
                                        className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                                        icon={faCheck}/>
                                    </span>
                                )}
                        </Link>
                        }
                        
                        {/* Mis retos */}
                        {numbersOfSections.includes(4) &&
                        <Link
                        onClick={()=>setSection(4)}
                        href={`/inicio/curso/unidad/${classId}`}
                        className={`
                        ${(maxSessionReached) < 4 && "opacity-[50%]"}
                        ${(maxSessionReached) < 4 && session && !session?.user?.role?.includes("admin") && "pointer-events-none"}
                        mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative
                        hover:bg-[#3331] transition-colors
                        md:w-full`}>
                            
                                {/* Contenido */}
                                <div className="flex items-center">
                                    {/* Icono */}
                                    <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                        <Image
                                            alt=""
                                            width={36}
                                            height={36}
                                            src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1697119604/images/aprobacion_2_tne492.png"}/>
                                    </span>

                                    {/* Texto */}
                                    <p className="ml-[32px] text-[24px] font-medium text-violet_dark
                                    md:text-[16px]">
                                        Mis retos
                                    </p>
                                </div>

                                {/* Check */}
                                {maxSessionReached > 4 && (
                                    <span>
                                        <FontAwesomeIcon
                                        className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                                        icon={faCheck}/>
                                    </span>
                                )}
                        </Link>
                        }
                        
                        {/* Evaluemos */}
                        {numbersOfSections.includes(5) &&
                        <Link
                        onClick={()=>setSection(5)}
                        href={`/inicio/curso/unidad/${classId}`}
                        className={`
                        ${maxSessionReached != 5 && "opacity-[50%]"}
                        ${maxSessionReached < 5 || maxSessionReached > 5 && session && !session?.user?.role?.includes("admin") && "pointer-events-none"}
                        mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative
                        hover:bg-[#3331] transition-colors
                        md:w-full`}>
                            
                                {/* Contenido */}
                                <div className="flex items-center">
                                    {/* Icono */}
                                    <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                        <Image
                                            alt=""
                                            width={36}
                                            height={36}
                                            src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1697119795/images/idea_1_sxrdhn.png"}/>
                                    </span>

                                    {/* Texto */}
                                    <p className="ml-[32px] text-[24px] font-medium text-violet_dark
                                    md:text-[16px]">
                                        Evaluemos
                                    </p>
                                </div>

                                {/* Check */}
                                {maxSessionReached > 5 && (
                                    <span>
                                        <FontAwesomeIcon
                                        className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                                        icon={faCheck}/>
                                    </span>
                                )}

                        </Link>
                        }

                    </div>
                    :

                    // En caso de NO haber Unidades
                    <div className="flex justify-center items-center min-h-[400px] mt-8 flex-col text-light text-[21px]">

                        <FontAwesomeIcon icon={faBookOpen} className="mb-4 text-[2em]"/>
                        
                        <p className="text-light text-[21px] text-center
                        md:text-[14px] ">
                            Aún no tienen clases disponibles
                        </p>
                    </div>
                }
            </section>
        </div>


        </>
    )
}