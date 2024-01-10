import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import ClassAssignmentList from "./ClassAssignmentList";
import Spinner from "../Spinner";
import { set } from "date-fns/esm/fp";

export default function MenuUsers({ user, validZeller, updateUser, loading }){
    const [openMenu, setOpenMenu] = useState(false)
    const [openModalClass, setOpenModalClass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [currentClasses, setCurrentClasses] = useState(null)
    const [currentPosition, setCurrentPosition] = useState(null)

    const menuRef = useRef(null);

    useEffect(() => {
        
        // setCurrentPathName(window.location.pathname)

        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        }

        // Agregar el event listener cuando se monta el componente
        document.addEventListener('click', handleClickOutside);

        // Limpiar el event listener cuando se desmonta el componente
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(()=>{
        setIsLoading(loading)
    },[loading])

    useEffect(()=>{
        if(openModalClass && !currentClasses)getAllClass()
    },[openModalClass])

    // useEffect(()=>{
    //     console.log(user)
    //     if(currentPosition && user?.position)setCurrentPosition(user.position)
    // },[user])
    
    async function getAllClass(){
        try {
    
            await fetch(`/api/class/get`)
                .then(classes=>classes.json())
                .then(classes=>{
                    let levels = []
                    let levelsUser = [] 
                    user?.classes?.map((level)=>{
                        levelsUser[level?.level] = level;
                    })
                    
                    classes?.class1?.map((unit, index) =>{
                        let userUnit = levelsUser[unit?.level]?.units?.find(unitUser => unitUser?.unitID == unit._id)
                        // En caso de no encontrar el nivel de la unidad lo agrega junto a la nueva unidad
                        if(!levels[unit?.level]){
                            let newLevel = {
                                level : unit?.level,
                                units: [
                                    {
                                        number: parseInt(unit.unit.match(/\d+/), 10) ? parseInt(unit.unit.match(/\d+/), 10) : -1,
                                        name: unit.unit ? unit.unit : "¯\_(ツ)_/¯",
                                        unitID:unit._id,
                                        description: unit?.description,
                                        done: userUnit?.done ? userUnit?.done : false,
                                        enable: userUnit?.enable ? userUnit?.enable : false,
                                        assigned: userUnit != undefined
                                    }
                                ],
                                assigned: levelsUser[unit?.level] != null
                            }
                            levels[newLevel.level] = newLevel
                        }
                        else{
                            levels[unit?.level].units.push({
                                number: parseInt(unit.unit.match(/\d+/), 10) ? parseInt(unit.unit.match(/\d+/), 10) : -1,
                                name: unit.unit ? unit.unit : "¯\_(ツ)_/¯",
                                unitID:unit._id,
                                description: unit.description,
                                done: userUnit?.done ? userUnit?.done : false,
                                enable: userUnit?.enable ? userUnit?.enable : false,
                                assigned: userUnit != undefined
                            })                       
                        }
                    })

                    const orderedLevel = [...Object.values(levels)].sort((a, b) => {
                        // Comparar los nombres de los niveles para ordenar
                        if (a.level < b.level) {
                          return -1;
                        }
                        if (a.level > b.level) {
                          return 1;
                        }
                        return 0;
                    }).map(level => ({
                        ...level,
                        units: [...level.units].sort((unitA, unitB) => {
                          // Comparar las unidades dentro de cada objeto
                          if (unitA.name < unitB.name) {
                            return -1;
                          }
                          if (unitA.name > unitB.name) {
                            return 1;
                          }
                          return 0;
                        }),
                    }));

                    setCurrentClasses(orderedLevel)
                })
        }
        catch (error) {
            console.error('Error al cargar los datos de profesores:', error);
        }
    }

    function classesAssignment(){

        if(isLoading)return
        
        let newUser = user;
        let finalClasses = [...currentClasses]
        finalClasses = finalClasses?.map(
            (level)=>{
                if(level.assigned){

                    let newLevel = {...level};

                    newLevel.units = newLevel.units.map(
                        (unit)=>{

                            if(unit.assigned){
                                let newUnit = {...unit}
                                delete newUnit.assigned
                                // console.log("Unit ",unit)
                                return newUnit
                            }
                            return null;
                        }
                    ).filter(Boolean);

                    delete newLevel.assigned
                    console.log(`${level.level} `,newLevel)
                    
                    return newLevel
                }

                return null;
            }
        ).filter(Boolean);
        
        newUser.classes = finalClasses;
        if(currentPosition)newUser.position = currentPosition;

        console.log("newUser ",newUser)
        updateUser(newUser)
    }

    // Handlers
    function handlerValidZeller(){
        validZeller(user)
    }

    function handlerModalClass(value){
        setOpenModalClass(value)
    }

    function handlerChangeUnit(indexLevel, indexUnit, newUnit){
        let newClasses = currentClasses;
        
        
        newClasses[indexLevel].units[indexUnit] = newUnit;

        setCurrentClasses(newClasses)
    }
    
    function handlerLastUnitDone(indexLevel, indexUnit, Unit,maxPages){
        let newClasses = [...currentClasses];

        newClasses.map((level, currentIndexLevel)=>{

            // En caso que el nivel este antes de la unidad actual, se marca como completo todas las unidades
            if(currentIndexLevel < indexLevel && level.assigned){
                level.units = level.units?.map(currentUnit=>{
                    return{
                        ...currentUnit,
                        done: true,
                        enable:true
                    }
                })
            }
            
            // En caso que el nivel este despues de la unidad actual, se desabilitan todas las unidades
            if(currentIndexLevel > indexLevel && level.assigned){
                level.units = level.units?.map(currentUnit=>{
                    return{
                        ...currentUnit,
                        done: false,
                        enable:false
                    }
                })
                
            }

            // En caso
            if(currentIndexLevel == indexLevel && level.assigned){
                level.units = level.units?.map((currentUnit,index)=>{

                    if(index < indexUnit && currentUnit?.assigned)return {...currentUnit,done: true,enable:true}

                    if(index == indexUnit && currentUnit?.assigned)return{...currentUnit,done: false,enable:true}

                    if(index > indexUnit && currentUnit?.assigned)return{...currentUnit,done: false,enable:false}

                    return currentUnit
                })
            }
        })

        setCurrentClasses(newClasses)
        setCurrentPosition({id:Unit.unitID,index:0,maxpages:maxPages})
        // position
    }
    
    function handlerChangeLevel(indexLevel, newLevel){
        let newClasses = currentClasses;
        
        
        newClasses[indexLevel] = newLevel;
        console.log("newClasses ",newClasses)

        setCurrentClasses(newClasses)
    }


    return(
        <>
        <li
        className="border-b-2 last-of-type:border-0">
            <div className="flex py-[19px] px-[35px] justify-between">
                {/* Nombre y apellido */}
                {
                    user?.first_name != null ?
                    <p className="w-[220px]">{user?.first_name} {user?.last_name}</p>:
                    <p className="w-[220px]">Sin nombre</p>
                }

                {/* Email */}
                <p className="w-[220px]">{user?.email}</p>

                {/* Role */}
                <p className="w-[120px]">{user?.role}</p>

                {/* Menu */}
                <div className="relative">

                    {/* Indicador de Zeller */}
                    {
                        user?.planSync?.length > 0 && !user?.planSync[user?.planSync?.length - 1]?.valid && 
                        <span className=" rounded-full bg-success w-[6px] h-[6px] absolute top-0 left-full"></span>
                    }

                    {/* Icono */}
                    <FontAwesomeIcon
                    ref={menuRef}
                    className=" cursor-pointer px-2"
                    onClick={()=>{
                        console.log(openModalClass)
                        setOpenMenu(true)
                    }}
                    icon={faEllipsisVertical}/>

                    {/* Opciones */}
                    {
                        openMenu &&
                        <ul className="absolute top-[50%] shadow-[0px_4px_24px_#0000002F] right-0 bg-white w-max z-20 overflow-hidden rounded-[7px]">
                            {/* Actualizar rol */}
                            <li className=" py-[8px] px-[20px] border-b-[1px] cursor-pointer transition-all
                            hover:bg-primary_flat_hover">
                                Actualizar rol
                            </li>

                            {/* Asignar Clases */}
                            <li
                            onClick={()=>setOpenModalClass(true)}
                            className=" py-[8px] px-[20px] border-b-[1px] cursor-pointer transition-all
                            hover:bg-primary_flat_hover">
                                Asignar clases
                            </li>

                            {/* Validar Zeller */}
                            <li
                            onClick={handlerValidZeller}
                            className={`relative py-[8px] px-[20px] cursor-pointer transition-all ${user?.planSync?.length > 0 && !user?.planSync[user?.planSync?.length - 1]?.valid ? "opacity-1": "opacity-50 pointer-events-none"}
                            hover:bg-primary_flat_hover`}>

                                {/* Indicador de Zeller */}
                                {
                                    user?.planSync?.length > 0 && !user?.planSync[user?.planSync?.length - 1]?.valid && 
                                    <span className=" rounded-full bg-success w-[6px] h-[6px] absolute top-2 right-2"></span>
                                }

                                Validar pago de Zeller
                            </li> 

                        </ul>
                    }
                </div>
            </div>

        </li>

        {/* Modal de Clases */}
        {
            openModalClass &&
            <div
            onClick={()=>setOpenModalClass(false)}
            className="fixed top-0 left-0 w-screen h-screen bg-[#3333] z-[999] py-[100px] flex justify-center items-center">

                <div
                onClick={(e)=>e.stopPropagation()}
                className=" rounded-[7px] bg-white w-[90%] min-h-[500px] max-h-full overflow-auto relative flex flex-col justify-between">
                    <h2 className="border-b-2 p-4 font-semibold">Asignar clase</h2>

                    <div className="p-3 flex-grow-[1]">
                        {
                            currentClasses && currentClasses?.length > 0 ?
                            currentClasses?.map((level, index)=>
                                <ClassAssignmentList key={index} indexLevel={index} level={level} handlerChangeUnit={handlerChangeUnit} handlerChangeLevel={handlerChangeLevel} handlerLastUnitDone={handlerLastUnitDone}/>
                            )
                            :
                            <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
                                <Spinner/>
                            </div>
                        }
                    </div>

                    <div className="m-4">
                        <button
                        onClick={classesAssignment}
                        className=" btn-primary py-2 px-10 w-full text-[18px]">
                            Asignar clases
                        </button>
                    </div>

                    {/* Loader */}
                    {
                        isLoading &&
                        <div className="fixed w-full h-full bg-[#fffa] top-0 left-0 z-50 flex justify-center items-center">
                            <Spinner/>
                        </div>
                    }
                </div>

            </div>
        }
        </>
    )
}