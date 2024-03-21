import { useEffect, useRef, useState } from "react"

export default function EditableTextElement({ value, handleChangeParagraph, className, colorsOptions, editOpcionsIsActivate, id}) {

    const [currentValue, setCurrentValue] = useState(value)
    const [color, setColor] = useState("#3cbbd6"); // Color inicial
    const [editOptions, setEditOptions] = useState(false); 

    const fieldRef = useRef();
    const editOptionsRef = useRef();

    useEffect(() => {
        // Función para manejar los clics fuera del elemento
        const handleClickOutside = (event) => {
            if (fieldRef.current && !fieldRef.current.contains(event.target)) {
                if(
                    (editOptionsRef && editOptionsRef.current && !editOptionsRef.current.contains(event.target)) ||
                    !colorsOptions
                )setEditOptions(false)
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); // Solo se ejecuta una vez al montar el componente

    useEffect(()=>{
        if(editOpcionsIsActivate) editOpcionsIsActivate(editOptions)
    },[editOptions])

    useEffect(()=>{
        setCurrentValue(value)
    },[id])

    function updateParagraph(e){
        handleChangeParagraph(e.target.innerHTML)
    }
    
    function applyColorValue() {

        const selection = window.getSelection();

        if (selection && selection.toString().trim() !== '') {
            const modifiedText = currentValue.replace(selection.toString(), `<span style="color: ${color}">${selection.toString()}</span>`);

            console.log("modifiedText ",modifiedText)
            
            setCurrentValue(modifiedText)
            updateParagraph({target:{ innerHTML: modifiedText }})
        }
    };
    
    const removeColorValue = () => {
        const selection = window.getSelection();

        if (selection && selection.toString().trim() !== '') {
            const modifiedText = currentValue.replace(`<span style="color: ${color}">${selection.toString()}</span>`, selection.toString());

            setCurrentValue(modifiedText)
            updateParagraph({target:{ innerHTML: modifiedText }})
        }
    };

    return (
        
        <div
        onClick={()=>setEditOptions(true)}
        className={` inline relative`}>

            <div
            contentEditable
            ref={fieldRef}
            onClick={()=>setEditOptions(true)}
            onInput={updateParagraph}
            dangerouslySetInnerHTML={{ __html: currentValue }}
            className={`${className} ${editOptions && "outline-1"}`}
            />
            

            {/* Lista de colores */}
            {
                colorsOptions && editOptions &&
                <div
                className=" top-full absolute z-50 p-1 bg-white rounded-[7px] shadow-[0px_4px_24px_#18292F8A] flex">

                    <select
                    ref={editOptionsRef}
                    className=' border-none p-1'
                    style={{ 
                        borderRadius: "7px",
                        backgroundColor: color,
                        color: '#FFFFFF'
                    }}
                    value={color}
                    onChange={(e)=>setColor(e.target.value)}
                    >

                        {/* Primary */}
                        <option value={'#3cbbd6'} style={{ backgroundColor: '#3cbbd6' }}></option>
                        
                        {/* Secondary */}
                        <option value={'#33bb99'} style={{ backgroundColor: '#33bb99' }}></option>
                        
                        {/* Success */}
                        <option value={'#8438ff'} style={{ backgroundColor: '#8438ff' }}></option>
                        
                        {/* Danger */}
                        <option value={'#e73b3c'} style={{ backgroundColor: '#e73b3c' }}></option>
                        
                        {/* Warning */}
                        <option value={'#ff7438'} style={{ backgroundColor: '#ff7438' }}></option>
                        
                        {/* Info */}
                        <option value={'#fcc235'} style={{ backgroundColor: '#fcc235' }}></option>

                    </select>

                    {/* Aplicar colores */}
                    <button
                    onClick={applyColorValue}
                    style={{
                        backgroundColor: color
                    }}
                    className={`mx-1 px-2 py-1 bg-${color} text-white rounded-[7px]`}>
                        Aplicar
                    </button>

                    
                    {/* Quitar colores */}
                    <button
                    onClick={removeColorValue}
                    className={` px-2 py-1 border-2 border-violet_dark text-violet_dark rounded-[7px]`}>
                        Quitar
                    </button>

                </div>
            }

        </div>
    
    )
}
