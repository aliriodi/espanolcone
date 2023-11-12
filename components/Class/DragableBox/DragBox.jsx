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
        transition
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
         rounded-md text-white p-4 m-2 text-center min-h-[58px] inline-block`}>
            {props.dragBox.value}
        </div>
    )
}