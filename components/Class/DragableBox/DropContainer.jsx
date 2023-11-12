import { SortableContext, useSortable,rectSwappingStrategy, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo, useState } from "react";
import DragBox from "./DragBox";
import Image from "next/image";

export default function DropContainer({
    dropUp,
    type,
    dragBoxs
})
{
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
      } = useSortable({
        id: dropUp.id,
        data: {
            type: "DropUp",
            dropUp,
        }
    });

    useEffect(()=>console.log("container ",dropUp),[])
      
    const style =
    {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const dragBoxsIds = useMemo(() => {
        return dragBoxs?.map((dragBox) => dragBox.id);
    }, [dragBoxs]);
    
    return (
        <>

            
            <SortableContext
            strategy={horizontalListSortingStrategy}
            items={dragBoxsIds}>

                {
                    // Tipo Imagen
                    type=="image" &&
                    <div
                    ref={setNodeRef}
                    style={style}
                    className="flex flex-col my-[60px] items-center">

                        <Image
                        className="rounded-[5px] w-[160px] h-[160px] bg-light shadow-[0px_4px_26px_#00000040] mb-2 object-cover"
                        src={dropUp?.src} width={250} height={250}/>
                        {/* <span className="rounded-[5px] w-[250px] h-[250px] bg-success mb-2"></span> */}

                        <div
                        ref={setNodeRef}
                        className="rounded-[5px] w-[160px] border-solid border-[2px] bg-primary_flat_hover border-primary  min-h-[78px] flex justify-center">
                            {dragBoxs?.map((dragBox) => (
                                <DragBox
                                    dropUpValue={dropUp?.value} 
                                    key={dragBox.id}
                                    dragBox={dragBox}
                                />
                                
                            ))}
                        </div>

                    </div>
                }

                {
                    // Tipo Contenedor
                    type=="container" &&
                    <div
                    style={style}
                    ref={setNodeRef}
                    className="rounded-[5px] border-solid border-[2px] bg-primary_flat_hover border-primary w-full min-h-[78px] flex justify-center">
                        {dragBoxs?.map((dragBox) => (
                            <DragBox
                                dropUpValue={dropUp?.value} 
                                key={dragBox.id}
                                dragBox={dragBox}
                            />
                            
                        ))}
                    </div>
                }
            </SortableContext>
        </>
    )
}