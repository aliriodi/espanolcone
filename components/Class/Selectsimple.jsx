import React, { useState, useEffect } from 'react'

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
            <p dangerouslySetInnerHTML={{ __html: props.data.value }}></p>
            
            <div onClick={()=>console.log(props?.data)} className={`${props?.data?.direction == "row" && "flex w-full justify-between md:flex-col"}`}>

            {options ? options?.map(option =>
                <p className='mx-3'  key={option}  ><label>
                    <input type="radio"
                        key={option}
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                        
                    />
                    <span  style={{paddingLeft: '5px'}}>{option}</span>
                    {selectedOption && !props?.inEvaluation && (
                        <span>
                        {/* Para renderizar culito */}
                            {selectedOption === option ? (
                                isCorrect ?
                                    <span style={{ color: 'green' }}> ✔️</span>
                                    :
                                    <span style={{ color: 'red' }}> ❌</span>
                            ) : null}
                        </span>
                    )}
                </label></p>
            ) : null}
            </div>
        </>
    )
}
