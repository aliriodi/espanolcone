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
        isDragging,
    }= useSortable({
        id: props.dragBox.id,
        data:{
            type: "DragBox",
            dragBox
        }
    })

    // if(!isDragging)handleDoneOption()
    useEffect(()=>{

        if(!isDragging && props.handleDoneOption != undefined) props?.handleDoneOption(dropUpValue == props.dragBox.value, props.dragBox.id)

    },[isDragging])

    const style = {
        transform:CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
        transform:CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition
    }

    if(isDragging){
        return(
            <>
                {
                !props.dragBox?.src 
                    ?
                    <div
                    style={style}
                    ref={setNodeRef}
                    className="
                    bg-primary
                    rounded-md text-white p-4 m-2 text-center inline-block cursor-grab touch-none
                    md:text-[12px] md:flex md:justify-center md:items-center md:py-0 md:h-[45px] md:w-fit opacity-[50%]">
                        {props.dragBox.value} 
                    </div>
                    :
                    <img
                    style={style}
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    src={props.dragBox.src}
                    className="max-w-[250px] text-white text-center inline-block cursor-grab touch-none transition-all opacity-[50%]
                    active:cursor-grabbing
                    md:text-[12px] md:flex md:justify-center md:items-center md:w-fit"/>
                }
            </>
        )
    }

    return(
        <>
            {
                !props.dragBox?.src
                ?
                <div
                style={style}
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                className={`
                ${ props?.inEvaluation && !props.isAdmin &&  "bg-primary"}
                ${ !props.canCheck && "bg-primary"}
                ${ (!props?.inEvaluation || props.isAdmin) && props.canCheck && props.dragBox?.done && "bg-secondary"}
                ${ (!props?.inEvaluation || props.isAdmin) && props.canCheck && !props.dragBox?.done && "bg-danger"}
                rounded-md text-white p-4 m-2 text-center inline-block cursor-grab touch-none transition-all
                active:cursor-grabbing
                md:text-[12px] md:flex md:justify-center md:items-center md:py-0 md:h-[45px] md:w-fit`}>
                    {props.dragBox.value}
                </div>
                :
                <img
                style={style}
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                src={props.dragBox.src}
                className="max-w-[250px] text-white text-center inline-block cursor-grab touch-none transition-all
                active:cursor-grabbing
                md:text-[12px] md:flex md:justify-center md:items-center md:w-fit"/>
            }
        </>
    )
}