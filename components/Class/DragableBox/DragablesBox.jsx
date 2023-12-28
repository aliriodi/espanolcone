import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors, PointerSensor, DragOverlay  } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy, rectSortingStrategy, verticalListSortingStrategy} from '@dnd-kit/sortable';
import { useEffect, useState, useMemo } from 'react';
import DragBox from './DragBox';
import DropContainer from './DropContainer';

import { createPortal } from "react-dom";


export default function DragableBox( props ){
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    // Opciones
    const [options, setOptions] = useState([
        {value: "tímida",id: "value1", dropUpId:"container", done:false},
        {value: "guapo",id: "value2", dropUpId:"container", done:false},
        {value: "perezoso",id: "value3", dropUpId:"container", done:false},
        {value: "jóvenes",id: "value4", option:"container", done:false}
    ])

    const [currentOptionDrag, setCurrentOptionDrag] = useState({})

    // Contenedores donde se van a poder poner las opciones
    const [dropUpContainer, setDropUpContainer] = useState([
        {value: "tímida",id: "1", type:"image"},
        {value: "guapo",id: "2", type:"image"},
        {value: "perezoso",id: "3", type:"image"},
        {value: "jóvenes",id: "4", type:"image"},
        {value: "container",id: "container", type:"container"}
    ])

    const [canCheck, setCanCheck] = useState(false)
    
    const dropUpContainerId = useMemo(() => dropUpContainer.map((drag) => drag.id), [dropUpContainer]);
    
    useEffect(()=> {

        // En caso de que "props?.done" es "true" se resuelve el ejersicio
        if(props?.done){
            setOptions( 
                props?.options?.DragBoxs?.map(option =>{
                    return {
                        ...option,
                        done:true,
                        dropUpId: props?.options?.DropUps?.filter(dropUp=> dropUp?.value == option?.value)[0]?.id
                    }
                })
            )
        }
        // En caso contrario se todas las opciones se quedan en "container"
        else setOptions(props?.options?.DragBoxs?.map(dragBox =>{ return{...dragBox ,dropUpId:"container", done:false} }))

    },[props?.options?.DragBoxs])

    useEffect(()=>{
        setDropUpContainer([...props?.options?.DropUps, {value:"container",id:"container", type:"container"}])
    },[props?.options?.DropUps])
    
    useEffect(()=>{
        
        if(options.filter((option)=>option.dropUpId != "container").length == options.length){
            activityCheck()
            
            setCanCheck(true)
        }

        else setCanCheck(false)

    },[options])

    useEffect(()=>{
        if(!canCheck)props.onChangeActivityDone(props.id, null, null)
    },[canCheck])
    

    function handleDragOver(event){
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveADragBox = active.data.current?.type === "DragBox";
        const isOverADragBox = over.data.current?.type === "DragBox";
        
        if (!isActiveADragBox) return;

        // Se suelta una DragBox sobre otra DragBox
        if (isActiveADragBox && isOverADragBox) {
            
            setOptions((options) => {
            const activeIndex = options.findIndex((t) => t.id === activeId);
            const overIndex = options.findIndex((t) => t.id === overId);


            if (options[activeIndex].dropUpId != options[overIndex].dropUpId) {
                
                let overDropContainer = dropUpContainer?.filter((dropUp)=> dropUp.id == options[overIndex].dropUpId)[0]

                // En caso de estar dobre otro DragBox y no estar en el contenedor
                if(overDropContainer?.id != "container")
                {
                    let activeId = options[activeIndex].dropUpId;
                    let overId = options[overIndex].dropUpId;

                    options[activeIndex].dropUpId = overId;
                    options[overIndex].dropUpId = activeId;

                    return arrayMove(options, activeIndex, overIndex - 1);
                }
                
                options[activeIndex].dropUpId = options[overIndex].dropUpId;
                return arrayMove(options, activeIndex, overIndex - 1);
            }

            return arrayMove(options, activeIndex, overIndex);
            });
        }

        // Se suelta una DragBox sobre otro DropContainer
        const isOverADropContainer = over.data.current?.type === "DropUp";

        if (isActiveADragBox && isOverADropContainer) {

            // se asegura que en caso de ser un DropContainer diferente de "container" solo se pueda poner una opcion
            if(options.filter((op)=> op.dropUpId == over.data.current.dropUp.id).length > 0 && over.data.current.value != "container") return;
            
            // se asignan el nuevo dropUpId de opciones
            setOptions((options) => {
                const activeIndex = options.findIndex((t) => t.id === activeId);

                options[activeIndex].dropUpId = overId;
                return arrayMove(options, activeIndex, activeIndex);
            });
        }
    }

    function handleDragEnd(event){
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveADragBox = active.data.current?.type === "DragBox";
        const isOverADragBox = over.data.current?.type === "DragBox";
    }

    function handleDragStart(event){
        // Se encarga de asignar el valor actual a currentOptionDrag
        const {active} = event;

        const activeId = active.id;

        const activeIndex = options.findIndex((t) => t.id === activeId);

        setCurrentOptionDrag(options[activeIndex])
    }


    function handleDoneOption(value, id){
        // Esta funcion se encarga de actualizar el valor de done de la opcion indicada por el parametro "id"
        
        if(value == null || !id) return;

        let newOptions = options;
        
        newOptions = newOptions.map((option)=>{

            if(option.id == id) return {... option, done:value}

            return option;
        })
        
        setOptions(newOptions);
    }

    function activityCheck(){      
        let activityDone = true;
        let totalActivitysDone = 0

        options.map((option)=>{
            if(option.done == false) activityDone = false
            else totalActivitysDone = totalActivitysDone + 1
        })

        console.log("Actividad Hechas ", totalActivitysDone)
        if(activityDone || props?.inEvaluation) props.onChangeActivityDone(props.id, activityDone, totalActivitysDone)
    }

    
    if(dropUpContainer?.length < 0) return(null)

    return(

        <DndContext 
            sensor={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}>

                
                <div className='w-full mb-[100px] flex flex-wrap
                md:mb-0'>
                    

                    <div className={`flex flex-wrap relative justify-between w-full
                    ${dropUpContainer[0].type == "dropup-end" && "flex-col"}`}>
                         
                    <SortableContext
                    strategy={dropUpContainer[0].type == "image" ? horizontalListSortingStrategy : rectSortingStrategy}
                    // strategy={rectSortingStrategy}
                    items={options}>

                            {dropUpContainer.length > 0 &&
                            dropUpContainer.map((dropUp)=>
                                <DropContainer
                                    dropUp={dropUp}
                                    key={dropUp.id}
                                    type={dropUp.type}
                                    typesDropsUps={dropUpContainer[0].type}
                                    handleDoneOption={handleDoneOption}
                                    canCheck={canCheck}
                                    inEvaluation={props?.inEvaluation}
                                    containerPosition={props?.containerPosition}
                                    
                                    // se le pasan las respectivas opciones que corresponden a cada  contenedor
                                    dragBoxs={options?.filter((option) => option.dropUpId === dropUp.id)}
                                    />
                            )
                        }

                    </SortableContext>

                    {
                        // Caja arrastrable 
                        <DragOverlay>
                            
                            {
                                !currentOptionDrag?.src ?
                                // Renderiza un drag box de texto
                                <div
                                className=' bg-primary rounded-md text-white p-4 m-2 text-center inline-block cursor-grabbing
                                md:text-[12px] md:flex md:justify-center md:items-center md:py-0 md:h-[45px] md:w-fit'>
                                    {currentOptionDrag?.value}
                                </div>

                                :
                                // Renderiza un drag box imagen
                                <img
                                src={currentOptionDrag?.src}
                                className="max-w-[250px] text-white text-center inline-block cursor-grab touch-none transition-all
                                active:cursor-grabbing
                                md:text-[12px] md:flex md:justify-center md:items-center md:w-fit"/>

                            }

                        </DragOverlay>
                    }
                    </div>
                </div>
        </DndContext>
    )
}
