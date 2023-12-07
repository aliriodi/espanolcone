import { SortableContext, useSortable,rectSwappingStrategy, horizontalListSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo, useState } from "react";
import DragBox from "./DragBox";
import Image from "next/image";
import { DragOverlay } from "@dnd-kit/core"

export default function DropContainer({
    dropUp,
    type,
    typesDropsUps,
    dragBoxs,
    handleDoneOption,
    canCheck
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
                {
                    // Tipo Imagen
                    type=="image" &&
                    <div
                    // ref={setNodeRef}
                    style={style}
                    className="flex flex-col my-[60px] items-center">

                        {
                        dropUp?.src
                        ?
                        <Image
                        className="rounded-[5px] w-[250px] h-[250px] bg-light shadow-[0px_4px_26px_#00000040] mb-2 object-cover
                        md:w-[180px] md:h-[180px]"
                        alt="Image"
                        src={dropUp?.src} width={250} height={250}/>
                        :
                        <span className="rounded-[5px] w-[250px] h-[250px] bg-light shadow-[0px_4px_26px_#00000040] mb-2 object-cover
                        md:w-[180px] md:h-[180px]"></span>

                        }

                        <div
                        ref={setNodeRef}
                        className="rounded-[5px] w-[250px] border-solid border-[2px] bg-primary_flat_hover border-primary  min-h-[78px] flex justify-center
                        md:w-[180px]">
                            {dragBoxs?.map((dragBox) => (
                                <DragBox
                                    dropUpValue={dropUp?.value} 
                                    key={dragBox.id}
                                    dragBox={dragBox}
                                    handleDoneOption={handleDoneOption}
                                    canCheck={canCheck}
                                />
                                
                            ))}
                        </div>

                    </div>
                }

                {
                    // Tipo Dropup End
                    type=="dropup-end" &&
                    <div
                    // ref={setNodeRef}
                    className="flex my-[5px] items-center">

                        {/* Texto */}
                        <p
                        className="text-[#6E6B7B] text-[1.33rem]
                        md:text-[14px]"
                        dangerouslySetInnerHTML={{ __html: dropUp?.content }}></p>

                        {/* DragBox */}
                        <div
                        ref={setNodeRef}
                        style={style}
                        className="rounded-[5px] w-[160px] border-solid border-[2px] bg-primary_flat_hover border-primary  min-h-[78px] flex justify-center
                        md:min-h-[50px]">
                            
                            {dragBoxs?.map((dragBox) => (
                                <DragBox
                                    dropUpValue={dropUp?.value} 
                                    key={dragBox.id}
                                    dragBox={dragBox}
                                    handleDoneOption={handleDoneOption}
                                    canCheck={canCheck}
                                />
                                
                            ))}
                        </div>
                    </div>
                }

                {
                    // Tipo Dropup Start
                    type=="dropup-start" &&
                    <div
                    className="flex my-[5px] items-center">

                        {/* DragBox */}
                        <div
                        ref={setNodeRef}
                        style={style}
                        className="rounded-[5px] w-[160px] border-solid border-[2px] bg-primary_flat_hover border-primary  min-h-[78px] flex justify-center
                        md:min-h-[50px]">
                            
                            {dragBoxs?.map((dragBox) => (
                                <DragBox
                                    dropUpValue={dropUp?.value} 
                                    key={dragBox.id}
                                    dragBox={dragBox}
                                    handleDoneOption={handleDoneOption}
                                    canCheck={canCheck}
                                />
                                
                            ))}
                        </div>
                        
                        {/* Texto */}
                        <p
                        className="text-[#6E6B7B] text-[1.33rem]
                        md:text-[14px]"
                        dangerouslySetInnerHTML={{ __html: dropUp?.content }}></p>
                        
                    </div>
                }

                {
                    // Tipo Dropup Center
                    type=="dropup-center" &&
                    <div
                    className="flex my-[5px] items-center w-full">
                        
                        {/* Texto del Principio */}
                        <p
                        className="text-[#6E6B7B] text-[1.33rem]
                        md:text-[14px]"
                        dangerouslySetInnerHTML={{ __html: dropUp?.content_start }}></p>

                        {/* DragBox */}
                        <div
                        ref={setNodeRef}
                        style={style}
                        className="rounded-[5px] w-[160px] border-solid border-[2px] bg-primary_flat_hover border-primary  min-h-[78px] flex justify-center
                        md:min-h-[50px]">
                            
                            {dragBoxs?.map((dragBox) => (
                                <DragBox
                                    dropUpValue={dropUp?.value} 
                                    key={dragBox.id}
                                    dragBox={dragBox}
                                    handleDoneOption={handleDoneOption}
                                    canCheck={canCheck}
                                />
                                
                            ))}
                        </div>
                        
                        {/* Texto del Final*/}
                        <p
                        className="text-[#6E6B7B] text-[1.33rem]
                        md:text-[14px]"
                        dangerouslySetInnerHTML={{ __html: dropUp?.content_end }}></p>
                        
                    </div>
                }

                {
                    // Tipo Comentarios
                    type=="text" &&
                    <div
                    className="flex my-[5px] items-center w-full">
                        
                        {/* Texto  */}
                        <p
                        className="text-[#6E6B7B] text-[1.33rem]
                        md:text-[14px]"
                        dangerouslySetInnerHTML={{ __html: dropUp?.content }}></p>
                        
                    </div>
                }

                {
                    // Tipo Contenedor
                    type=="container" &&
                    <div
                    style={style}
                    ref={setNodeRef}
                    // className="rounded-[5px] border-solid border-[2px] bg-primary_flat_hover border-primary w-full min-h-[78px] flex justify-center my-[30px]"
                    className={
                        `
                        ${typesDropsUps != "image" ?
                        `absolute right-0 flex-col translate-y-[-50%] top-1/2 rounded-[5px] border-solid border-[2px] bg-primary_flat_hover border-primary min-w-[78px] min-h-[100%] flex justify-center
                        md:relative md:min-h-[78px] md:mt-6 md:translate-y-0 md:flex-row md:flex-wrap`
                        :
                        "rounded-[5px] border-solid border-[2px] bg-primary_flat_hover border-primary w-full min-h-[78px] flex justify-center my-[30px] flex-wrap"}
                        `
                    }
                    >
                        {dragBoxs?.map((dragBox) => (
                            <DragBox
                                dropUpValue={dropUp?.value} 
                                key={dragBox.id}
                                dragBox={dragBox}
                            />
                            
                        ))}
                    </div>
                }

            
        </>
    )
}