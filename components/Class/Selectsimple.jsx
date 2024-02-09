import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import style from '../../styles/class.module.css'

export default function Selectsimple(props) {
    //se recibe props.data tipo objeto con
    //       props.data = {value:'1."Me gusta la vida aquí:  la gente, la comida, el clima, el mate …"',
    //                     option:'respuesta',
    //                     options:['valor1','valor2','valorn'],
    //                     className: "className"}
    const [selectedOption, setSelectedOption] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [options, setOptions]= useState(props?.data?.options)

    useEffect(()=>{
        // Cuando se actualiza las props se actualizan las variables de estado
        setSelectedOption("")
        setOptions(props?.data?.options)

        if(props?.done){
            setSelectedOption(props?.data?.option)
            setIsCorrect(true)
        }

    },[props.data])
    
    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;

        setSelectedOption(selectedValue);
        
        if (event.target.value == props.data.option) {
            props.onChangeActivityDone(props.id, true, 1)
            setIsCorrect(true)
        }
        else {
            props.onChangeActivityDone(props.id, false, 0)
            setIsCorrect(false)
        }

    }
    return (
        <>
            {/* {intro} */}
            <p dangerouslySetInnerHTML={{ __html: props.data.value }} className={style["selector-simple-title"]}></p>
            
            <div onClick={()=>console.log(props?.data)} className={`${props?.data?.direction == "row" && "flex w-full md:flex-col"}  ${style["options-container"]} `}>

            {options ? options?.map(option =>

                <p
                className={`px-3
                ${style["icon-container"]}
                ${selectedOption && (!props?.inEvaluation || props?.isAdmin) && (selectedOption === option && (isCorrect ? style["done"] : style["danger"]))}
                ${selectedOption && selectedOption === option && (props?.inEvaluation && !props?.isAdmin) && style["select"]}`}
                key={option}>

                    <label className='flex items-center'>

                        {/* Input */}
                        <input type="radio"
                            key={option}
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleOptionChange}
                            
                        />

                        {/* Texto de opcion */}
                        <span  className='px-[5px] flex items-center'>{option}</span>

                        {/* Icono de respuesta */}
                        <div className={`w-[24px] h-[24px] rounded-full flex justify-center items-center text-white relative
                        md:h-[20px] md:w-[20px]`}>
                            {selectedOption && (!props?.inEvaluation || props?.isAdmin) && (
                                <>
                                {/* Para renderizar culito */}
                                    {selectedOption === option ? (
                                        isCorrect ?
                                            <div className={`w-full h-full bg-secondary  flex justify-center items-center rounded-full`}>
                                                <FontAwesomeIcon className='text-[14px] text-white font-bold
                                                md:text-[12px]' icon={faCheck}/>
                                            </div>
                                            :
                                            <div className={`w-full h-full bg-danger  flex justify-center items-center rounded-full`}>
                                                <FontAwesomeIcon className='text-[14px] text-white font-medium
                                                md:text-[12px]' icon={faX}/>
                                            </div>
                                    ) : 

                                        <span className='w-[24px] h-[24px] flex'></span>
                                    }
                                </>
                            )}
                        </div>
                    </label>
                </p>

            ) : null}
            </div>
        </>
    )
}
