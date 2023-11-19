import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useEffect } from "react"

export default function DragBox (props){

    let dragBox = props.option;
    let dropUpValue = props.dropUpValue;
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    }= useSortable({
        id: props.dragBox.id,
        data:{
            type: "DragBox",
            dragBox
        }
    })

    const style = {
        transform:CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
        transform:CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition
    }

    if(isDragging){
        return(
            <div
            style={style}
            ref={setNodeRef}
            className="
            bg-primary
            rounded-md text-white p-4 m-2 text-center inline-block cursor-grab touch-none
            md:text-[12px] md:flex md:justify-center md:items-center md:py-0 md:h-[45px] md:w-fit opacity-[50%]">
                {props.dragBox.value} 
            </div>
        )
    }

    return(
        
        <div
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`
        ${dropUpValue == "container" && "bg-primary"}
        ${dropUpValue != "container" && dropUpValue == props.dragBox.value && "bg-secondary"}
        ${dropUpValue != "container" && dropUpValue != props.dragBox.value && "bg-danger"}
         rounded-md text-white p-4 m-2 text-center inline-block cursor-grab touch-none
         active:cursor-grabbing
         md:text-[12px] md:flex md:justify-center md:items-center md:py-0 md:h-[45px] md:w-fit`}>
            {props.dragBox.value}
        </div>
    )
}