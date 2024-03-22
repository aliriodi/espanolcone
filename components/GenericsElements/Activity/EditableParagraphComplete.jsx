import React, { useState } from 'react'
import EditableTextElement from './EditableTextElement'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function EditableParagraphComplete(
    {
        value,
        type,
        handleChangeParagraph,
        deleteItemParagraph,
        index,
        className
    }
){

    const [editOptions, setEditOptions] = useState(false); 
    
    function updateValue(newValue){
        // Actualiza el valor del campo correspondiente
        console.log("newValue ",newValue)
        handleChangeParagraph(

            type == 'field' ?

            // tipo "field"
            {
                ...value,
                option:newValue,
                block:newValue?.length
            }
            :

            // tipo "text"
            newValue,

            index
        )
    }

    function editOpcionsIsActivate(isActivate){
        // actualiza setEditOptions para saber si se puede editar el campo actual
        setEditOptions(isActivate)
    }

    return (
        <>
            <EditableTextElement
            value={
                type == 'field' ?

                // valor correspondiente en caso de ser tipo "field"
                value?.option :
                
                // valor correspondiente en caso de ser tipo "text"
                value
            }
            index={index}
            colorsOptions={type != 'field'}
            className={`${className} inline`}
            handleChangeParagraph={updateValue}
            editOpcionsIsActivate={editOpcionsIsActivate}
            />

            {/* Eliminar */}
            {
                editOptions &&
                <FontAwesomeIcon
                onClick={()=>deleteItemParagraph(index)}
                className=' text-white p-1 ml-1  bg-danger rounded-[5px] cursor-pointer'
                icon={faTrash}/>
            }
        </>
    )
}
