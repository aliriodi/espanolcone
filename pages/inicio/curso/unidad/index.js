import { useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faBookOpen, faCheck, faListCheck, faPuzzlePiece, faRotateRight, faStar } from '@fortawesome/free-solid-svg-icons';
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
import Head from 'next/head'
import Copyright from "../../../../components/Class/Copyright";
import axios from 'axios';


export default function Unidad(){
    const {data: session, status, update} = useSession();
    const router = useRouter();

    const [maxSessionReached, setMaxSessionReached] = useState(-1)
    const [numbersOfSections, setNumbersOfSections] = useState([])

    const [congratulationsModal, setCongratulationsModal] = useState(false)
    const [failedModal, setFailedModal] = useState(false)
    const [reviewModal, setReviewModal] = useState(false)

    const [currentClass, setCurrentClass] = useState(null)
    const [unit, setUnit] = useState(null)

    const [level, setLevel] = useState(null)
    const [nextLevelLabel, setNextLevelLabel] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const [resetIsLoading, setResetIsLoading] = useState(false)

    const [currentEvaluetionDone, setCurrentEvaluetionDone] = useState(null)
    const [reviewPoint, setReviewPoint] = useState(0)
    const [reviewComment, setReviewComment] = useState("")

    const dispatch = useDispatch();
    
    const { classId, currentLevelIndex, currentUnitIndex } = router.query;
    
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
                
                if(sheets[i]?.section?.number == section){
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
                    // toPay
                    // unit = {
                    //     ...unit,
                    //     done:true,
                    //     enable:true
                    // }
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

    async function retryEvaluation(sheets){

        let newUser = {...session?.user}
        setFailedModal(true)
        
        let newUnit = { ...(newUser?.classes[currentLevelIndex]?.units[currentUnitIndex] || {}) };
        
        newUnit = {
            ...newUnit,
            currentPage: sheets?.indexOf(sheets?.find(sheet => sheet?.section?.number == 5))
        };
        
        newUser.classes[currentLevelIndex].units[currentUnitIndex] = newUnit;
        // newUser.position.index = sheets?.indexOf(sheets?.find(sheet => sheet?.section?.number == 5))
        
        // console.log("MALLLL", newUser)
        updateUser(newUser)
        setMaxSessionReached(5)
    }

    async function resetUnits(){
        // esta funcion se encarga de resetar todas las unidades hasta en la que se encuentra actualmente el usuario 

        setResetIsLoading(true)
        let newUser = {...session?.user}
        let currentIndexLevel;
        let currentAmountPageUnit = fetch(`/api/class/${classId}`).then((response) => response.json()).then(async (json) =>{return json.class1.sheets.length;}).catch((error) => console.log(error));
        let currentLevel;
        let currentUnit;

        // Busca al actual unidad y nivel
        newUser?.classes.map((level)=>{
            level?.units?.map((unit)=>{
                if(unit?.unitID == classId){
                    currentLevel =level;
                    currentUnit = unit;
                }
            })
        })

        currentIndexLevel = newUser?.classes?.indexOf(newUser?.classes?.find((l)=> l?._id == level?._id))

        // Este mapeo se encarga de definir que unidades van a estar habilitadas y cuales desabilitadas
        newUser?.classes?.map((mapLevel, levelIndex)=>{

            // En caso de estar en el nivel actual
            if (currentIndexLevel == levelIndex) 
            {
                let currentIndexUnit = mapLevel?.units?.indexOf(mapLevel?.units?.find((u)=> u?._id == unit?._id))

                mapLevel?.units?.map((mapUnit, unitIndex)=>{

                    // En la unidad Actual
                    if(unitIndex == currentIndexUnit){
                        mapUnit.done=false
                        mapUnit.enable=true
                        mapUnit.maxPoints = 0
                        mapUnit.points = 0
                        mapUnit.currentPage = 0
                    }

                    // Unidades por debajo de la Unidad Actual
                    if(unitIndex < currentIndexUnit){
                        mapUnit.done=true
                        mapUnit.enable=true
                    }
                    
                    // Unidades por ensima de la Unidad Actual
                    if(unitIndex > currentIndexUnit){
                        mapUnit.done=false
                        mapUnit.enable=false
                        mapUnit.maxPoints = 0
                        mapUnit.points = 0
                        mapUnit.currentPage = 0
                    }
                })
            }

            else if(currentIndexLevel < levelIndex){
                mapLevel?.units?.map((unit)=>{
                    unit.done=false
                    unit.enable=false
                })
            }

            else if(currentIndexLevel > levelIndex){
                mapLevel?.units?.map((unit)=>{
                    unit.done=true
                    unit.enable=true
                })
            }

        })

        // Asigna los valores correctos para el position
        newUser.position.id = classId,
        newUser.position.index = 0,
        newUser.position.maxpages = await currentAmountPageUnit
        
        await updateUser(newUser)

        setResetIsLoading(false)
    }

    function correctEvaluation(sheets, evaluationDone){

        setCurrentEvaluetionDone(evaluationDone)

        let unit = { ...(session?.user?.classes[currentLevelIndex]?.units[currentUnitIndex] || {}) };
        if(unit?.madeReview != true)setReviewModal(true)
        
        if(evaluationDone) updatePosition();
        else retryEvaluation(sheets);
    }

    async function addReview(){
        // Este metodo se encarga de agregar una review
        // Primero marca en la unidad del usuario que ya se realizo una review
        let newUser = {...session?.user}

        let newUnit = { ...(newUser?.classes[currentLevelIndex]?.units[currentUnitIndex] || {}) };

        newUnit = {
            ...newUnit,
            madeReview: true
        }

        newUser.classes[currentLevelIndex].units[currentUnitIndex] = newUnit;
        
        updateUser(newUser)

        // Y luego se crea una review
        let newReview = {
            user_ID: session?.user?._id,               
            user_first_name: session?.user?.first_name,        
            user_last_name: session?.user?.last_name,        
            user_email: session?.user?.email,        
            user_picture: session?.user?.image?.url,
            unit_ID: newUnit?.unitID,
            unit_number: newUnit?.number,
            level:newUser.classes[currentLevelIndex]?.level,        
            score: reviewPoint,        
            comment: reviewComment
        }
        
        try{
            await axios.post('/api/review/unit/add', newReview);
        }
        catch (error) {
            console.error("No se pudo hacer la reseña: ",error);
        }

        setReviewModal(false)

        
    }

    useEffect(()=>{
        // En este useEffect se va a comprobar hasta que seccion esta realizada
        let currentUnit = unit
        
        if(!currentUnit || session?.user?.classes[currentLevelIndex]?.units[currentUnitIndex]){
            currentUnit = session?.user?.classes[currentLevelIndex]?.units[currentUnitIndex]
            setUnit(currentUnit)
        }
        
        // En caso de tener que pagar la unidad y aceder a esta seccion se lo redirige
        if (status && status != "loading" && currentUnit?.toPay == true) window.location.href = "/inicio/curso";

        // ----------------------------------------------- Unidades Dependientes del position ----------------------------------------------- //
        // Primero se comprueba si la ultima clase realizada es igual a la ultima que hizo el usuario
        // en caso de ser asi a maxSessionReached se le asigna hasta que seccion llego el usuario
        // if(session && classId && session?.user?.position?.id == classId){
        //     setIsLoading(true)

        //     fetch(`/api/class/${classId}`)
        //     .then((response) => response.json())
        //     .then((json) =>{ 
        //         setCurrentClass(json.class1.sheets)
        //         setMaxSessionReached(session?.user?.position?.index > 0 ? json.class1.sheets[(session?.user?.position?.index)]?.section?.number : session?.user?.position?.index)

        //         // En caso de concretar correctamente la evaluacion pasa a la siguiente unidad
        //         if(session?.user?.position?.index == session?.user?.position?.maxpages && currentUnit?.maxPoints > 0 && currentUnit?.points >= 18 )updatePosition()
                
        //         // En caso de que haga mal la evaluacion obliga al usuario a reintentarlo 
        //         if(session?.user?.position?.index == session?.user?.position?.maxpages && currentUnit?.maxPoints > 0 && currentUnit?.points < 18) retryEvaluation(json.class1.sheets)
                
        //         setIsLoading(false)

        //         return;
        //     })
        //     .catch((error) =>{
        //         console.log(error)

        //         setIsLoading(false)
        //     });
        // }

        // // De lo contrario se busca en el resto de clases comprobando el valor de la propiedad done
        // else{
        //     let currentClasses = [];
        //     let currentClass;
            
        //     for(let i = 0; session?.user?.classes.length > i; i++){
        //         // Se ponen todas las clases en un mismo array 
        //         currentClasses = [...currentClasses, ...session?.user?.classes[i]?.units]
        //     }
            
        //     currentClass = currentClasses.find((c)=> c.unitID == classId)// Se busca en que clase estamos
            
        //     // En caso de ser "True" se le pone el numero de seccion maxima  En caso de ser "False" se le pone -1
        //     setMaxSessionReached(currentClass?.done ? 6 : -1)
        // }


        // ----------------------------------------------- Unidades Independientes ----------------------------------------------- //
        // Primero se comprueba si la clase no esta terminada pero esta habilitada
        // en tal caso comprueba hasta que pagina llego
        if(session && !currentUnit.done && currentUnit.enable){
            
            // En caso de que la unidad no tenga asignado "maxPages"(el numero maximo de paginas), se le asignan
            setIsLoading(true)
            
            fetch(`/api/class/${classId}`)
            .then((response) => response.json())
            .then(async (json) =>{ 
                
                // Asignan la actual clase(currentClass) junto al numero de la ultima seccion(maxSessionReached)
                setCurrentClass(json.class1.sheets)

                // Asigna hasta donde llego el usuario 
                setMaxSessionReached(currentUnit?.currentPage && currentUnit?.currentPage > 0 ? json.class1.sheets[(currentUnit?.currentPage)]?.section?.number : 0)

                // "Corrige" la Evaluacion 
                // if(currentUnit?.currentPage == currentUnit?.maxPages && currentUnit?.maxPoints > 0){

                //     // En caso de concretar correctamente la evaluacion pasa a la siguiente unidad
                //     if(currentUnit?.currentPage == currentUnit?.maxPages && currentUnit?.maxPoints > 0 && currentUnit?.points >= 18 )updatePosition()
                    
                //     // En caso de que haga mal la evaluacion obliga al usuario a reintentarlo 
                //     if(currentUnit?.currentPage == currentUnit?.maxPages && currentUnit?.maxPoints > 0 && currentUnit?.points < 18) retryEvaluation(json.class1.sheets)

                // }

                
                // "Corrige" la Evaluacion 
                if(currentUnit?.currentPage == currentUnit?.maxPages && currentUnit?.maxPoints > 0){
                    let evaluationDone;
                    
                    // En caso de concretar correctamente la evaluacion pasa a la siguiente unidad
                    if(currentUnit?.points >= 18 ) evaluationDone = true
                    
                    // En caso de que haga mal la evaluacion obliga al usuario a reintentarlo 
                    if(currentUnit?.points < 18) evaluationDone = false
            
                    
                    correctEvaluation(json.class1.sheets, evaluationDone)
                }

                                    
                setIsLoading(false)
            })
            .catch((error) =>{
                console.log(error)

                setIsLoading(false)
            });
        }

        // De lo contrario se busca en el resto de clases comprobando el valor de la propiedad done
        else{
            console.log("ELSE ",currentUnit)
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
    },[session])

    useEffect(()=>{
        // Actualiza le unidad y le asigna las variables faltantes(maxPages)
        let currentUnit = unit 
        if(!currentUnit || session?.user?.classes[currentLevelIndex]?.units[currentUnitIndex]){
            currentUnit = session?.user?.classes[currentLevelIndex]?.units[currentUnitIndex]
            setUnit(currentUnit)
        }

        if(session && (!currentUnit.done && currentUnit.enable) && !currentUnit?.maxPages){
            
            // En caso de que la unidad no tenga asignado "maxPages"(el numero maximo de paginas), se le asignan
            setIsLoading(true)
            
            fetch(`/api/class/${classId}`)
            .then((response) => response.json())
            .then(async (json) =>{ 
                // Asignan correctamente las nuevas variables a la Unidad actual en caso de no tenerlas
                let newUser = { ...session?.user };

                
                let newUnit = { ...(newUser?.classes[currentLevelIndex]?.units[currentUnitIndex] || {}) };

                newUnit = {
                    ...newUnit,
                    maxPages: json.class1.sheets.length,
                    // currentPage: 0
                };

                newUser.classes[currentLevelIndex].units[currentUnitIndex] = newUnit;
                

                await updateUser(newUser)

                setIsLoading(false)
            })
            .catch((error) =>{
                console.log(error)

                setIsLoading(false)
            });
        }
    },[])

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
                }
            })
        })

        // En caso de no tener la clase correcta se actualiza a la correspondiente
        // if(!currentUnit?.done && currentUnit?.enable && session?.user?.position?.id != classId && currentClass){

        //     let newUser = {
        //         ...session?.user,
        //         position:{
        //             ...session?.user.position,
        //             id:currentUnit?.unitID,
        //             index:0,
        //             maxpages:currentClass?.length > 0 ? currentClass?.length - 1 : 0,
        //         }
        //     }

        //     updateUser(newUser);
        // }

        

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
        <Head>
            <title>{unit?.name} - {level?.level} | Español con E</title>
        </Head>

        {/* Modal de Felitaciones */}
        {
            congratulationsModal && !reviewModal &&

            <div
            onClick={()=>setCongratulationsModal(false)}
            className={`bg-[#000a] fixed w-screen h-screen z-[400] flex justify-center items-center ${congratulationsModal ? "opacity-[1]": "opacity-0"} transition-all`}>

                {/* Modal */}
                <div className={`bg-white rounded-[5px] relative overflow-hidden z-[600]
                md:w-[90%]`}>
                    {/* Titulo */}
                    <div
                    style={{background:'linear-gradient(239.79deg, #33BB99 0.92%, #8438FF 68.4%)'}}
                    className="relative overflow-hidden">

                        {/* Confetti Izquierda */}
                        <Image
                        className="absolute top-0 left-0 z-[10] w-[100px]
                        md:w-[70px]"
                        width={178}
                        height={75}
                        alt=""
                        src={'https://res.cloudinary.com/dfddh08q8/image/upload/s--y88ZHUWd--/v1703277573/images/yuarudsoljjpyj1kxyen.png'}/>
                        
                        {/* Titulo */}
                        <h4
                        className="text-white py-[20px] px-[170px] bg-gradient-to-r font-medium text-[24px] text-center z-[20] relative
                        md:text-[18px] md:p-4">
                            ¡FELICIDADES, {session?.user?.first_name?.toUpperCase()}!
                        </h4>
                        
                        {/* Confetti Derecha */}
                        <Image
                        className="absolute top-0 right-0 z-[10] w-[100px]
                        md:w-[70px]"
                        width={178}
                        height={75}
                        alt=""
                        src={'https://res.cloudinary.com/dfddh08q8/image/upload/s--y88ZHUWd--/v1703277573/images/yuarudsoljjpyj1kxyen.png'}/>

                    </div>

                    {/* Contenido */}
                    <div className="p-[27px] flex justify-center items-center w-full flex-col">
                        <p className="text-center mb-2 text-[21px] text-violet_dark font-medium
                        md:text-[14px]">
                            Completaste de forma correcta <b>{unit?.points}</b> puntos de <b>{unit?.maxPoints}</b>. 
                        </p>

                        
                        <p className="text-center mb-6 text-[21px] text-violet_dark font-medium
                        md:text-[14px]">
                            Finalizaste la <b>{unit?.name}</b> del <b>{level?.level}</b>
                        </p>

                        <Link
                        href={`/inicio/curso?level=${nextLevelLabel}`}
                        className="btn-primary p-2 w-full text-[21px]
                        md:text-[14px]">
                            Continuar
                        </Link>
                    </div>
                </div>
                
                {/* Confeti :D */}
                <Confetti active={true}/>
            </div>
        }

        {/* Modal de Evaluacopin fallada */}
        {
            failedModal && !reviewModal &&
            
            <div
            onClick={()=>setFailedModal(false)}
            className={`bg-[#000a] fixed w-screen h-screen z-[400] flex justify-center items-center ${failedModal ? "opacity-[1]": "opacity-0"} transition-all`}>

                {/* Modal */}
                <div className={`bg-white rounded-[5px] relative overflow-hidden z-[600]
                md:w-[90%]`}>
                    {/* Titulo */}
                    <div
                    // style={{background:'linear-gradient(239.79deg, #33BB99 0.92%, #8438FF 68.4%)'}}
                    className="relative overflow-hidden">
                        
                        {/* Titulo */}
                        <h4
                        className=" text-violet_dark font-semibold pt-[20px] px-[170px] bg-gradient-to-r text-[24px] text-center z-[20] relative
                        md:text-[18px] md:p-4">
                            Esta vez no pudiste lograrlo
                        </h4>

                    </div>

                    {/* Contenido */}
                    <div className="p-[27px] flex justify-center items-center w-full flex-col">

                        <p className="text-center mb-2 text-[21px] text-violet_dark font-medium
                            md:text-[14px]">
                            Completaste de forma correcta <b>{unit?.points}</b> puntos de <b>{unit?.maxPoints}</b>. 
                        </p>

                        <p className="text-center mb-6 text-[21px] text-violet_dark font-medium
                        md:text-[14px]">
                            ¿Deseas  volver a intentarlo?
                        </p>

                        <Link
                        onClick={()=>setSection(5)}
                        href={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
                        as={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
                        className="btn-primary p-2 w-full text-[21px] mb-3
                        md:text-[14px]">
                            ¡Si!
                        </Link>

                        
                        <button
                        onClick={()=>setFailedModal(false)}
                        className="btn-primary-border p-2 w-full text-[21px]
                        md:text-[14px]">
                            Mas tarde
                        </button>
                    </div>
                </div>
                
            </div>
        }

        {/* Modal de Reviews */}
        {
            reviewModal &&
            <div
            onClick={()=>setReviewModal(false)}
            className={`bg-[#000a] fixed w-screen h-screen z-[400] flex justify-center items-center transition-all`}>

                {/* Modal */}
                <div
                onClick={(e)=>e.stopPropagation()}
                className={`bg-white rounded-[20px] relative overflow-hidden z-[600] w-[475px] h-[551px] flex justify-center items-center flex-col px-[50px]
                md:w-[90%]`}>

                    {/* Encabezado */}
                    <div className="">
                        <p className="text-[#4F4F4F] text-[24px] font-bold">¿Que te parecio esta unidad?</p>
                    </div>

                    {/* Extrellas */}
                    <div className=" text-light text-[45px] flex w-full justify-between mt-[37px] pb-[15px]">

                        {/* Estrella 1 */}
                        <FontAwesomeIcon
                        icon={faStar} onClick={()=> setReviewPoint(1)}
                        className={`transition-all duration-75 cursor-pointer ${1 <= reviewPoint && "text-info"}`} />

                        {/* Estrella 2 */}
                        <FontAwesomeIcon
                        icon={faStar} onClick={()=> setReviewPoint(2)}
                        className={`transition-all duration-75 cursor-pointer ${2 <= reviewPoint && "text-info"}`} />

                        {/* Estrella 3 */}
                        <FontAwesomeIcon
                        icon={faStar} onClick={()=> setReviewPoint(3)}
                        className={`transition-all duration-75 cursor-pointer ${3 <= reviewPoint && "text-info"}`} />

                        {/* Estrella 4 */}
                        <FontAwesomeIcon
                        icon={faStar} onClick={()=> setReviewPoint(4)}
                        className={`transition-all duration-75 cursor-pointer ${4 <= reviewPoint && "text-info"}`} />

                        {/* Estrella 5 */}
                        <FontAwesomeIcon
                        icon={faStar} onClick={()=> setReviewPoint(5)}
                        className={`transition-all duration-75 cursor-pointer ${5 <= reviewPoint && "text-info"}`} />
                    </div>

                    {/* Campo */}
                    <div className={`overflow-hidden w-full transition-all ${reviewPoint == 0 && "h-0"}`}>
                        <input
                        value={reviewComment}
                        onChange={(e)=> setReviewComment(e.target.value)}
                        className=" px-[10px] py-[15px] w-full rounded-[6px] border-[1px] border-[#9F9F9F] outline-none"
                        type="text"
                        placeholder="¡Deja tu comentario!"/>
                    </div>

                    {/* Button */}
                    <button
                    onClick={reviewPoint > 0 && addReview}
                    className={`btn-primary p-2 w-full text-[21px] mb-3  mt-[25px] ${reviewPoint == 0 && " opacity-[60%] pointer-events-none"}
                    md:text-[14px]`}>
                        Continuar
                    </button>
                    
                </div>

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
                        href={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
                        as={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
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
                        href={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
                        as={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
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
                        href={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
                        as={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
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
                        href={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
                        as={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
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
                        href={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
                        as={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
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
                        href={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}
                        as={`/inicio/curso/unidad/${classId}?currentLevelIndex=${currentLevelIndex}&currentUnitIndex=${currentUnitIndex}`}

                        // Condicion para bloquear solo "Evaluemos" al terminar la unidad
                        // ${maxSessionReached < 5 || maxSessionReached > 5 && session && !session?.user?.role?.includes("admin") && "pointer-events-none"}
                        className={`
                        ${(maxSessionReached) <= 5 && "opacity-[50%]"}
                        ${(maxSessionReached) <= 5 && session && !session?.user?.role?.includes("admin") && "pointer-events-none"}
                        mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative
                        hover:bg-[#3331] transition-colors
                        md:w-full`}>
                            
                                {/* Contenido */}
                                <div
                                // Condicion para bloquear solo "Evaluemos" al terminar la unidad
                                // ${maxSessionReached != 5 && "opacity-[50%]"}`}
                                className={`flex items-center`}>
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
                                {maxSessionReached >= 5 && unit?.maxPoints > 0 && (
                                    <span className={`
                                    ${!unit?.points && "bg-danger"}
                                    ${unit?.maxPoints == 0 && "bg-danger"}
                                    ${unit?.maxPoints > 0 && (unit?.maxPoints / 3) >= unit?.points && "bg-danger"}
                                    ${unit?.maxPoints > 0 && (unit?.maxPoints / 3 < unit?.points && 18 > unit?.points) && "bg-info"}
                                    ${unit?.maxPoints > 0 && (18 <= unit?.points && unit?.maxPoints >= unit?.points) && "bg-secondary"}
                                     text-white rounded-full py-[6px] px-[7px] text-[19px] font-semibold`}>

                                        <p>{unit?.points ? unit?.points : 0} / {unit?.maxPoints ? unit?.maxPoints : 0}</p>
                                        
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

            {
                session && session?.user?.role?.includes("admin") &&
                <button
                title="Resetear unidades hasta la actual"
                onClick={resetUnits}
                className={`bg-white rounded-full text-violet_dark absolute top-44 right-20 shadow-lg w-16 h-16 text-[21px] flex justify-center items-center ${resetIsLoading && "animate-spin"}
                md:right-5`}>
                    <FontAwesomeIcon icon={faRotateRight}/>
                </button>
            }
        </div>
        
        <Copyright/>
        </>
    )
}