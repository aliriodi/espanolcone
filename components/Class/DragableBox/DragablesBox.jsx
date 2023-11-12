import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor  } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy, rectSortingStrategy} from '@dnd-kit/sortable';
import { useEffect, useState, useMemo } from 'react';
import DragBox from './DragBox';
import DropContainer from './DropContainer';


export default function DragableBox( props ){
    const sensor = useSensor(MouseSensor, TouchSensor);

    // Opciones
    const [options, setOptions] = useState([
        {value: "tímida",id: "value1", dropUpId:"container"},
        {value: "guapo",id: "value2", dropUpId:"container"},
        {value: "perezoso",id: "value3", dropUpId:"container"},
        {value: "jóvenes",id: "value4", dropUpId:"container"}
    ])

    // Contenedores donde se van a poder poner las opciones
    const [dropUpContainer, setDropUpContainer] = useState([
        {value: "tímida",id: "1", type:"image"},
        {value: "guapo",id: "2", type:"image"},
        {value: "perezoso",id: "3", type:"image"},
        {value: "jóvenes",id: "4", type:"image"},
        {value: "container",id: "container", type:"container"}
    ])


    useEffect(()=> setOptions(props?.options?.DragBoxs?.map(dragBox =>{ return{...dragBox,dropUpId:"container"} })),[props?.options?.DragBoxs])

    useEffect(()=> setDropUpContainer([...props?.options?.DropUps, {value:"container",id:"container", type:"container"}]),[props?.options?.DropUps])

    const dropUpContainerId = useMemo(() => dropUpContainer.map((drag) => drag.id), [dropUpContainer]);
    

    function handleDragOver(event){
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveADragBox = active.data.current?.type === "DragBox";
        const isOverADragBox = over.data.current?.type === "DragBox";
        
        if (!isActiveADragBox) return;

        // Im dropping a Task over another Task
        if (isActiveADragBox && isOverADragBox) {
            
            setOptions((options) => {
            const activeIndex = options.findIndex((t) => t.id === activeId);
            const overIndex = options.findIndex((t) => t.id === overId);

            if (options[activeIndex].dropUpId != options[overIndex].dropUpId) {
            // Fix introduced after video recording
                let overDropContainer = dropUpContainer?.filter((dropUp)=> dropUp.id == options[overIndex].dropUpId)[0]

                // En caso de estar dobre otro DragBox y no estar en el contenedor
                if(overDropContainer?.id != "container") return options;
                // if(overDropContainer?.id != "container")
                // {
                //     let activeId = options[activeIndex].dropUpId;
                //     let overId = options[overIndex].dropUpId;

                //     options[activeIndex].dropUpId = overId;
                //     options[overIndex].dropUpId = activeId;

                //     return arrayMove(options, activeIndex, overIndex - 1);
                // }
                
                options[activeIndex].dropUpId = options[overIndex].dropUpId;
                return arrayMove(options, activeIndex, overIndex - 1);
            }

            return arrayMove(options, activeIndex, overIndex);
            });
        }

        const isOverADropContainer = over.data.current?.type === "DropUp";

        // Im dropping a Task over a column
        if (isActiveADragBox && isOverADropContainer) {

            if(options.filter((op)=> op.dropUpId == over.data.current.dropUp.id).length > 0 && over.data.current.value != "container") return;
            
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

    if(dropUpContainer?.length < 0) return(null)

    return(
        // Contexto
        <DndContext 
            sensor={[sensor]}
            collisionDetection={closestCenter}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}>

                
                <div className='w-full'>
                    

                    <div className='flex flex-wrap relative justify-between '>
                            {dropUpContainer.length > 0 &&
                            dropUpContainer.map((dropUp)=>
                                <DropContainer
                                    dropUp={dropUp}
                                    key={dropUp.id}
                                    type={dropUp.type}
                                    
                                    // se le pasan las respectivas opciones que corresponden a cada  contenedor
                                    dragBoxs={options?.filter((option) => option.dropUpId === dropUp.id)}/>
                            )
                        }
                    </div>
                    {/* Contenedores de Opciones */}
                    {/* <SortableContext
                    items={dropUpContainerId}
                    // strategy={horizontalListSortingStrategy}
                    >
                    </SortableContext> */}

                </div>
        </DndContext>
    )
}
