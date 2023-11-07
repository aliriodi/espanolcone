import { DndContext, closestCenter } from '@dnd-kit/core';


export default function DragableBox(props){
    function handleDragEnd(){

    }

    return(
        <DndContext 
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            
            <span className="bg-primary rounded-md text-white p-4 cursor-move">
                {props.options[0].value}
            </span>
        </DndContext>
    )
}