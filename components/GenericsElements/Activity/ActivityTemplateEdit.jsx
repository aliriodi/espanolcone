import { useEffect, useRef, useState } from 'react'
import style from '../../../styles/class.module.css'
import ActivityElement from './ActivityElement'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faArrowsToDot, faCaretLeft, faCaretRight, faCaretSquareDown, faCirclePlus, faPersonChalkboard, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import EditableTextElement from './EditableTextElement'
import EditableParagraphComplete from './EditableParagraphComplete'

export default function ActivityTemplateEdit({ sheetsOfSection, handleChangeSheet }) {

    const [currentElementSelect, setCurrentElementSelect] = useState(null)
    const [currentElementIndex, setCurrentElementIndex] = useState(null)
    const [currentElementIsActivity, setCurrentElementIsActivity] = useState(false)
    
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    
    const cursorPosition = useRef(0);
    const divRef = useRef(null);

    useEffect(()=>{
        
        // Verifica si el elemento actual es alguna actividad
        if(currentElementSelect) setCurrentElementIsActivity(
            currentElementSelect?.type == "selectsimple" ||
            currentElementSelect?.type == "paragraph-complete" ||
            currentElementSelect?.type == "complete-li-personal" ||
            currentElementSelect?.type == "complete-li" ||
            currentElementSelect?.type == "dragable-box" ||
            currentElementSelect?.type == 'videoi-youtube'
        )

    },[currentElementSelect, sheetsOfSection])
    
    useEffect(()=>{
        
        setIsOpenMenu(true)

    },[currentElementSelect])

    useEffect(() => {

        // Restaurar la posición del cursor después de cada actualización del contenido
        if (divRef.current != null && cursorPosition.current !== null) {
            const selection = window.getSelection();
            const range = document.createRange();
    
            // Verificar que la posición del cursor sea válida
            const maxOffset = divRef.current.textContent.length;
            const validCursorPosition = Math.min(cursorPosition.current, maxOffset);
    
            range?.setStart(divRef.current.childNodes[0] || divRef.current, validCursorPosition);
            range?.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }



    }, [currentElementSelect?.value]);
    

    function assignUseRef(e){
        // asigna el "useRef" que permite edita elementos
        divRef.current = e.target;
        console.log(divRef.current);
    } 

    //#region  Metodos de elementos
    function handleElementSelect(date, index){
        setCurrentElementSelect(date)
        setCurrentElementIndex(index)
    }

    function handleChangeValue(e){
        // Actualiza el valor del "Elemento actual" 
        let newSheet = {...sheetsOfSection};
        newSheet.sheets[currentElementIndex].value = e;


        handleChangeSheet(newSheet)
    }

    function handleChangeClassName(e){
        // Actualiza el valor del "Elemento actual" 
        let newSheet = {...sheetsOfSection};
        newSheet.sheets[currentElementIndex].className = e;


        handleChangeSheet(newSheet)
    }

    function handleChangeType(e){
        let newSheet = {...sheetsOfSection};
        let typeFind = {...ActivityOptionsElements().find((element)=> element?.type == e.target.value)}
        let newType = {...typeFind} 
        newSheet.sheets[currentElementIndex] = newType;
        
        setCurrentElementSelect(newSheet.sheets[currentElementIndex])
        handleChangeSheet(newSheet)
    }

    function handleChangeStyles(newStyle){
        let newSheet = {...sheetsOfSection};
        newSheet.sheets[currentElementIndex] = {
            ...newSheet.sheets[currentElementIndex],
            style: {
                ...newSheet.sheets[currentElementIndex].style,
                ...newStyle
            }
        };


        handleChangeSheet(newSheet)
    }

    function addElement(){
        let newElement = ActivityOptionsElements()[1]
        let newSheet = {...sheetsOfSection};
        let finalIndex = 0;

        if(currentElementIndex != null){
            newSheet.sheets?.splice(currentElementIndex + 1, 0, newElement)
            finalIndex = currentElementIndex + 1;
        }
        else {
            newSheet.sheets?.push(newElement)
            finalIndex = newSheet.sheets.length - 1
        }

        handleChangeSheet(newSheet)
        setCurrentElementIndex(finalIndex)
        setCurrentElementSelect(newSheet.sheets[finalIndex])
    }

    function deleteElement(){
        let newSheet = {...sheetsOfSection};

        newSheet.sheets?.splice(currentElementIndex, 1)

        handleChangeSheet(newSheet)
        setCurrentElementIndex(null)
        setCurrentElementSelect(null)
    }
    //#endregion

    //#region Metodos cambio de color
    const [color, setColor] = useState("#3cbbd6"); // Color inicial

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const applyColorValue = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim() !== '') {
        const modifiedText = currentElementSelect?.value.replace(selection.toString(), `<span style="color: ${color}">${selection.toString()}</span>`);

        handleChangeValue(modifiedText)
        }
    };

    const removeColorValue = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim() !== '') {
        const modifiedText = currentElementSelect?.value.replace(`<span style="color: ${color}">${selection.toString()}</span>`, selection.toString());

        handleChangeValue(modifiedText)
        }
    };

    useEffect(() => {
        // Enfoque en el div editable después de cada renderizado
        divRef?.current?.focus();
    });
    //#endregion

    
    //#region Select Simple
    function handleChangeOption(option){
        let newSheet = {...sheetsOfSection};
        newSheet.sheets[currentElementIndex].option = option;
        
        handleChangeSheet(newSheet)
    }

    function handleChangeOptions(e, index){
        let newSheet = {...sheetsOfSection};
        newSheet.sheets[currentElementIndex].options[index] = e.target.value;
        
        handleChangeSheet(newSheet)
    }

    function addOption(){
        let newSheet = {...sheetsOfSection};
        newSheet.sheets[currentElementIndex].options?.push("")

        handleChangeSheet(newSheet)
    }

    function deleteOption(){
        let newSheet = {...sheetsOfSection};
        newSheet.sheets[currentElementIndex].options.pop()

        handleChangeSheet(newSheet)
    }
    //#endregion
    
    //#region Paragraph Complete
    function handleChangeParagraph(value, index){
        
        // Cambia el valor del parrafo/campo del "ParagraphComplete" 
        let newSheet = {...sheetsOfSection};
        newSheet.sheets[currentElementIndex].value[index] = value;
        
        handleChangeSheet(newSheet)
    }

    function deleteItemParagraphComplete(index){
        let newSheet = {...sheetsOfSection};
        newSheet.sheets[currentElementIndex].value?.splice(index, 1)

        handleChangeSheet(newSheet)
    }

    function addItemParagraphComplete(type){
        let newSheet = {...sheetsOfSection};
        newSheet.sheets[currentElementIndex].value?.push(
            type == "text" ?
            "texto"
            :
            {
                block: 10,
                option: "respuesta"
            }
        )

        handleChangeSheet(newSheet)
    }
    //#endregion

    return (
        <div>
            
            {/* Boton para cerrar/abrir */}
            <div
            onClick={()=>setIsOpenMenu(!isOpenMenu)}
            className={`w-[60px] h-[60px] bg-white rounded-[100%_0_0_100%] shadow-[0px_4px_24px_#18292F3A] fixed top-1/2 translate-y-[50%] transition-all right-[${isOpenMenu ? "350px" : "0"}] cursor-pointer flex justify-center items-center`}>
                <FontAwesomeIcon icon={isOpenMenu ? faAngleRight :faAngleLeft}/>
            </div>
            
            {/*////////// Teample //////////*/}
            <div className={`${style[sheetsOfSection?.template]} ${style[sheetsOfSection?.classNamePlus]} z-30`} onClick={(e)=>e.stopPropagation()}>

                
              {/* Titulo */}
              <div className={style['title']}>
                {
                    sheetsOfSection?.sheets?.map((sheets, index) =>
                        // Elementos de Encabezado
                        <div key={index}>
                            {(sheets.type === 'title' || sheets.type === 'popup')&& (
                                <div className={`${currentElementIndex == index && "border-2 rounded-[5px] border-primary"}`}>
                                    <ActivityElement returnDate={handleElementSelect} key={index}  date={sheets} index={index}/>
                                </div>
                            )}
                        </div>
                    )
                }
              </div>
              
              {/* Contenido */}
              <div className={style['content']}>
                {
                    sheetsOfSection?.sheets?.map((sheets, index) =>
                        (sheets.type != 'title' && sheets.type != 'popup') && (
                            <div key={index} className={`${currentElementIndex == index && "border-2 rounded-[5px] border-primary"}`}>
                                <ActivityElement returnDate={handleElementSelect} key={index}  date={sheets} index={index}/>
                            </div>
                        )
                    )
                }
              </div>
                
            </div>

            {/*////////// Menu de edicion //////////*/}
            <div
            className={`w-[350px] h-screen transition-all right-[${isOpenMenu ? '0px' : '-350px'}] top-0 fixed shadow-[0px_4px_24px_#18292F3A] bg-white pt-[119px] text-[14px] font-medium text-violet_dark overflow-auto`}>
                
                {/* Index */} 
                <div
                className=' pb-4 border-b-2 flex justify-around w-full '>
                    
                    <button
                    className='px-3 
                    hover:bg-gray_clear'
                    onClick={()=>{
                        if(currentElementIndex - 1 < 0) return;
                        setCurrentElementSelect(sheetsOfSection.sheets[currentElementIndex - 1])
                        setCurrentElementIndex(currentElementIndex - 1)
                    }}>
                        <FontAwesomeIcon icon={faAngleLeft}/>
                    </button>

                    <p className='pl-[16px] justify-center text-center'><b>Index</b>  {currentElementIndex}</p>

                    <button
                    className='px-3 
                    hover:bg-gray_clear'
                    onClick={()=>{
                        if(sheetsOfSection.sheets.length - 1 <= currentElementIndex ) return
                        setCurrentElementSelect(sheetsOfSection.sheets[currentElementIndex + 1])
                        setCurrentElementIndex(currentElementIndex + 1)
                    }}>
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </button>
                    
                </div>
            
                {/* Elemento */}
                <div className='py-[8px] px-[16px]'>

                    {/* Tipo de elemento */}
                    <select
                    onChange={handleChangeType}
                    className='w-full font-semibold mb-3 rounded-[5px] py-2'
                    value={currentElementSelect?.type}>

                        {
                        ActivityOptionsElements()?.map((element)=>
                            <option key={index} value={element?.type}>{element?.type}</option>
                        )
                        }
                    </select>

                    {/* Valor */}
                    {
                        currentElementSelect?.value != null && !currentElementIsActivity &&

                        // Input
                        <EditableTextElement
                        id={currentElementIndex}
                        colorsOptions={currentElementSelect?.type != "image"}
                        value={currentElementSelect?.value}
                        change={currentElementSelect?.type}
                        handleChangeParagraph={handleChangeValue}
                        />
                        
                    }

                    {/* Opciones de imagen */}
                    {
                        currentElementSelect?.type == "image" &&

                        <>
                            {/* Cambiar tamaño */}
                            <div className='grid grid-cols-3 gap-1 mt-4'>

                                {/* Ancho */}
                                <div className='flex items-center'>
                                    <label>W</label>
                                    <input
                                    onChange={(e)=>handleChangeStyles({"width":`${e.target.value}px`})}
                                    className='border-2 ml-1 w-full p-1 px-3 rounded-[5px]' type='text'/>
                                </div>

                                {/* Alto */}
                                <div className='flex items-center'>
                                    <label>H</label>
                                    <input
                                    onChange={(e)=>handleChangeStyles({"height":`${e.target.value}px`})}
                                    className='border-2 ml-1 w-full p-1 px-3 rounded-[5px]' type='text'/>
                                </div>
                            </div>
                        
                            {/* Cambiar posicion */}
                            <div className='grid grid-cols-3 gap-1 mt-4'>
                                <button
                                onClick={()=>handleChangeStyles({"margin":"auto 0 0 0"})}
                                className=' rounded-[5px] text-[21px] transition-all
                                hover:bg-gray_light'>
                                    <FontAwesomeIcon icon={faCaretLeft}/>
                                </button>

                                <button
                                onClick={()=>handleChangeStyles({"margin":"0 auto"})}
                                className=' rounded-[5px] text-[21px] transition-all
                                hover:bg-gray_light'>
                                    <FontAwesomeIcon icon={faArrowsToDot}/>
                                </button>

                                <button
                                onClick={()=>handleChangeStyles({"margin":"0 0 0 auto"})}
                                className=' rounded-[5px] text-[21px] transition-all
                                hover:bg-gray_light'>
                                    <FontAwesomeIcon icon={faCaretRight}/>
                                </button>

                            </div>
                        </>

                    }

                    {
                        currentElementSelect?.type == "separator" &&

                        <>
                            <div className=' flex items-center mt-3'>
                                <input 
                                checked={currentElementSelect?.className?.includes("separator-transparent")}
                                onClick={()=> handleChangeClassName(currentElementSelect?.className?.includes("separator-transparent") ? "separator" : "separator-transparent")}
                                className='mr-3 checkbox'
                                type='checkbox'/>

                                <label>Transparente</label>
                            </div>
                        </>
                    }

                    {/* Eliminar/Agregar elemento */}
                    <div className='my-6'>

                        {/* Agregar elemento */}
                        <button 
                        onClick={addElement}
                        className='text-secondary py-1 p-2 mt-3 border-2 rounded-[7px] border-secondary w-full flex justify-between items-center'>
                            Agregar nuevo elemento
                            <b>+</b>
                        </button>
                        
                        {/* Eliminar elemento */}
                        {
                            currentElementIndex != null &&
                            <button 
                            onClick={deleteElement}
                            className='text-danger py-1 p-2 mt-3 border-2 rounded-[7px] border-danger w-full flex justify-between items-center'>
                                Eliminar elemento

                                <b>-</b>
                            </button>
                        }
                        
                    </div>


                </div>


                {
                    currentElementIsActivity &&  currentElementSelect &&

                    <>

                        {/* /// Seciones de actividades /// */}
                        <div className='py-[8px] px-[16px]  border-t-2'>

                            <div className='my-3 mb-6 flex justify-between items-center'>

                                <b>Opciones de actividad</b>

                                <FontAwesomeIcon icon={faPersonChalkboard}/>

                            </div>

                            {/* Select Simple */}
                            {
                                currentElementSelect?.type == "selectsimple" &&
                                <>

                                    {/* Titulo */}                                    
                                    <div className='relative mb-5 min-h-[40px]'>                                    
                                        <textarea
                                        onChange={(e)=>handleChangeValue(e.target.value)}
                                        className='w-full h-full absolute top-0 left-0 py-2' value={currentElementSelect?.value}/>
                                        

                                        <p
                                        dangerouslySetInnerHTML={{  __html: currentElementSelect?.value }}
                                        className='w-full overflow-x-hidden  py-2'/>

                                    </div>

                                    {/* Opciones */}
                                    <div>
                                        {currentElementSelect?.options?.map((option, index)=>
                                            <div
                                            key={index}
                                            className=' my-[12px] flex border-b-2 last-of-type:border-none'>

                                                {/* Punto */}
                                                <input
                                                onClick={()=>handleChangeOption(option)}
                                                checked={option == currentElementSelect?.option}
                                                title='marca cual es la opcion correcta en la actividad'
                                                className='checkbox my-2'
                                                type='checkbox'/>

                                                {/* Input de opcion */}
                                                <textarea
                                                onChange={(e)=> handleChangeOptions(e,index)}
                                                className='w-full mx-2 py-[4px] p-1'
                                                value={option}/>
                                            </div>
                                        )}
                                    </div>

                                    {/* botones */}
                                    <div className='grid grid-cols-2 gap-1 mt-6'>

                                        {/* Agregar Opcion */}
                                        <button
                                        onClick={addOption}
                                        className='text-secondary border-2 border-secondary text-[16px] font-medium  rounded-[7px]
                                        hover:bg-secondary hover:text-white'>
                                            <FontAwesomeIcon icon={faCirclePlus}/>
                                        </button>

                                        {/* Eliminar Opcion */}
                                        <button
                                        onClick={deleteOption}
                                        className='text-danger border-2 border-danger text-[16px] font-medium  rounded-[7px]
                                        hover:bg-danger hover:text-white'>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </button>

                                    </div>
                                </>
                            }

                            {/* Paragraph Complete */}
                            {
                                (
                                currentElementSelect?.type == "paragraph-complete" ||
                                currentElementSelect?.type == "paragraph-complete-content" ||
                                currentElementSelect?.type == "complete-li"
                                ) &&
                                <>
                                    <div>
                                        {
                                            currentElementSelect?.value &&
                                            currentElementSelect?.value?.map((element,index)=>

                                                <>
                                                    {/* Campo a completar */}
                                                    {
                                                    typeof(element) == "object" &&
                                                        <EditableParagraphComplete
                                                        type="field"
                                                        index={index}
                                                        value={element}
                                                        className='  border-[1px] border-primary rounded-[5px] px-1 mx-1 text-primary leading-[2]'
                                                        deleteItemParagraph={deleteItemParagraphComplete}
                                                        handleChangeParagraph={handleChangeParagraph}/>
                                                    }

                                                    {/* Parrafo */}
                                                    {
                                                    typeof(element) != "object" &&
                                                        <>
                                                            <EditableParagraphComplete
                                                            type="text"
                                                            index={index}
                                                            value={element}
                                                            className=' leading-[1.6] outline-light'
                                                            deleteItemParagraph={deleteItemParagraphComplete}
                                                            handleChangeParagraph={handleChangeParagraph}/>

                                                        </>
                                                    }
                                                </>

                                            )
                                        }

                                        <div className='mt-3'>
                                            
                                            {/* Agregar texto */}
                                            <button
                                            onClick={()=>addItemParagraphComplete("text")}
                                            className=' mx-1 px-2 py-1 transition-all
                                            hover:bg-gray_light'>Texto <FontAwesomeIcon icon={faPlus}/></button>

                                            {/* Agregar campo */}
                                            <button
                                            onClick={()=>addItemParagraphComplete("field")}
                                            className=' mx-1 px-2 py-1 transition-all
                                            hover:bg-gray_light'>Campo <FontAwesomeIcon icon={faPlus}/></button>

                                        </div>
                                    </div>
                                </>
                            }

                        </div>
                    </>
                }

            </div>
        </div>
    )

    
}


export function ActivityOptionsElements(){
    const optionsElements = [

        // Titulo
        {
            type: "title",
            value: "Titulo por Defecto",
            className: "subtitle-default",
        },

        // Parrafo 
        {
            type: 'paragraph',
            value: 'Parrafo por Defecto',
            className: "paragraph-default",
        },
        
        // Imagen 
        {
            type: 'image',
            value: 'https://i.pinimg.com/736x/9f/62/f3/9f62f349fb773472387c1a914f9e4977.jpg',
            className: 'img-default'
        },

        // // Cuadricula de Imagenes 
        // {
        //     type:'image-grid',
        //     value: [
        //         {
        //           src: "https://res.cloudinary.com/dfddh08q8/image/upload/s--EY-Oe4h---/v1699320089/images/atkgrfy91npt1fmjtpgu.png",
        //           text: "Imagen 1"
        //         },
        //         {
        //           src: "https://res.cloudinary.com/dfddh08q8/image/upload/s--kI-dwj7G--/v1699320314/images/ndq1hnopetytoyy7uxye.png",
        //           text: "Imagen 2"
        //         },
        //         {
        //           src: "https://res.cloudinary.com/dfddh08q8/image/upload/s--2pjIQK3Q--/v1699320360/images/gwsaejtn8akklna9ix64.png",
        //           text: "Imagen 3"
        //         }
        //     ]
        // },

        // // Tabla
        // {
        //     type: 'table',
        //     value: [
        //         {
        //             title: "Comunicación",
        //             content: "<li> - Punto 1</li> <li> - Punto 2</li> <li> - Punto 3</li> <li> - Punto 4</li>"
        //         },
        //         {
        //             title: "Vocabulario",
        //             content: "<li> - Punto 1</li> <li> - Punto 2</li> <li> - Punto 3</li> <li> - Punto 4</li>"
        //         },
        //         {
        //             title: "Gramática",
        //             content: "<li> - Punto 1</li> <li> - Punto 2</li> <li> - Punto 3</li> <li> - Punto 4</li>"
        //         }
        //     ]
        // },

        // // Bloque de textos 
        // {
        //     type:'text-block',
        // },

        
        // Separador 
        {
            type: 'separator',
            className: "separator"
        },
        
        // SelectSimple 
        {
            type: 'selectsimple',
            value: 'Opciones a elegir',
            option: "3. tercera opcion",
            options: [
            "1. primera opcion",
            "2. segunda opcion",
            "3. tercer opcion",
            "4. cuarta opcion"
            ],
            className: "selector-simple",
        },
        
        // Parrafo a Completar 
        {
            type:'paragraph-complete',
            value: [
                "Opcion 1: que opcion es esta?",
                {
                  block: 10,
                  color: "var(--warning)",
                  option: "opcion 1"
                },
                "<br>Opcion 2: que opcion es esta?",
                {
                  block: 10,
                  color: "var(--warning)",
                  option: "opcion 2"
                },
                "<br>Opcion 3: que opcion es esta?",
                {
                  block: 10,
                  color: "var(--warning)",
                  option: "opcion 3"
                }
            ],
            className:'paragraph-complete'
        },
        
        // // Parrafo a Completar con Imagenes 
        // {
        //     type: 'paragraph-complete-content',
        // },
        
        // // Parrafo a Completar de lista 
        // {
        //     type:'complete-li',
        //     value: [
        //         "Bárbara: Es mi segundo día en la ciudad y no conozco casi nada<br>Florencia: ¿Qué te apetece hacer?<br>Bárbara: Me gustaría conocer algunos sitios culturales o importantes de la ciudad<br>Florencia: ¿Querés que hagamos el recorrido de la <i>media legua de oro cultural?</i> Está compuesto de ocho de los lugares más interesantes de acá.<br>Bárbara: ¡Dale! ¿En dónde quedamos?<br>Florencia: En la Plaza San Martín porque vamos a empezar en el",
        //         {
        //           block: 10,
        //           color: "var(--warning)",
        //           option: "Teatro Real"
        //         },
        //         " y luego vamos a otro teatro, el ",
        //         {
        //           block: 10,
        //           color: "var(--warning)",
        //           option: "Teatro del Libertador San Martín"
        //         },
        //         ", en el que se hacen presentaciones de ópera, orquestas y ballet.<br>Bárbara: ¡Genial! Suena muy interesante. Después, ¿por cuál seguimos?"
        //     ],
        //     className:'paragraph-complete'
        // },

        
        // // Parrafo a Completar de lista con persona
        // {
        //     type:'complete-li-personal',
        //     value: [
        //         "Bárbara: Es mi segundo día en la ciudad y no conozco casi nada<br>Florencia: ¿Qué te apetece hacer?<br>Bárbara: Me gustaría conocer algunos sitios culturales o importantes de la ciudad<br>Florencia: ¿Querés que hagamos el recorrido de la <i>media legua de oro cultural?</i> Está compuesto de ocho de los lugares más interesantes de acá.<br>Bárbara: ¡Dale! ¿En dónde quedamos?<br>Florencia: En la Plaza San Martín porque vamos a empezar en el",
        //         {
        //           block: 10,
        //           color: "var(--warning)",
        //           option: "Teatro Real"
        //         },
        //         " y luego vamos a otro teatro, el ",
        //         {
        //           block: 10,
        //           color: "var(--warning)",
        //           option: "Teatro del Libertador San Martín"
        //         },
        //         ", en el que se hacen presentaciones de ópera, orquestas y ballet.<br>Bárbara: ¡Genial! Suena muy interesante. Después, ¿por cuál seguimos?"
        //     ],
        // },
        
        // Video Youtube 
        {
            type:'video-youtube',
            value:'dQw4w9WgXcQ',
            className:'youtube'
        },
        
        // Video Youtube con PopUps 
        // {
        //     type:'videoi-youtube',
        //     popups: [
        //         {
        //           time: 33,
        //           title: "Con la _______ bien recta",
        //           reply: "espalda",
        //           message: "(espalda/rodilla)",
        //           type: "checkbox",
        //           options: [
        //             "espalda",
        //             "rodilla"
        //           ],
        //           paddingLeft: "10%",
        //           popUpShown: false,
        //           value: 0
        //         },
        //         {
        //           time: 35,
        //           title: "Para abrir la ____ ________",
        //           reply: "caja torácica",
        //           message: "(caja toráxica/caja torácica)",
        //           type: "checkbox",
        //           options: [
        //             "caja toráxica",
        //             "caja torácica"
        //           ],
        //           paddingLeft: "10%",
        //           popUpShown: false,
        //           value: 0
        //         },
        //         {
        //           time: 48,
        //           title: "Entre los dos ______ a mitad de la zancada",
        //           reply: "pies",
        //           message: "(pies/pie)",
        //           type: "checkbox",
        //           options: [
        //             "pies",
        //             "pie"
        //           ],
        //           paddingLeft: "10%",
        //           popUpShown: false,
        //           value: 0
        //         },
        //     ],
        // },

        // // Caja de Oraciones 
        // {
        //     type :'sentence-box',
        // },
        
        // // Drag Box 
        // {
        //     type:'dragable-box',
        // },
        
        // // Texto 
        // {
        //     type: 'text',
        // },
        
        
        // // PopUp de Dialogos 
        // {
        //     type:'popUp-dialogues',
        // },

        // // Level 
        // {
        //     type: 'level',
        // },
        
        // // PopUp de Dialogos 
        // {
        //     type: 'popup',
        // },

        // // Div 
        // {
        //     type: 'div',
        // },
    ]

    return optionsElements;
}
