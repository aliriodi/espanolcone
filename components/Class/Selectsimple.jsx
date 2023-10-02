import React, { useState, useEffect } from 'react'

export default function Selectsimple(props) {
    //se recibe props.data tipo objeto con
    //       props.data = {value:'1."Me gusta la vida aquí:  la gente, la comida, el clima, el mate …"',
    //                     option:'respuesta',
    //                     options:['valor1','valor2','valorn'],
    //                     className: "className"}
    const [selectedOption, setSelectedOption] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [intro, setIntro] = useState(0)

    useEffect(() => {
        // Verifica si las props han cambiado y actualiza intro en consecuencia
        if (props) {
            //aca analizo cuantos slect simple hay
            setIntro((prevIntro) => prevIntro + 1);
        }
    }, [props]);
    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        if (event.target.value == props.data.option) { setIsCorrect(true) }
        else { setIsCorrect(false) }

    }
    return (
        <div>
            {/* {intro} */}
            <div>
                <p dangerouslySetInnerHTML={{ __html: props.data.value }}></p>
                
                {props.data.options ? props.data.options.map(option =>
                    <p  key={option}  ><label>
                        <input type="radio"
                            key={option}
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleOptionChange}
                            
                        />
                        <span  style={{paddingLeft: '5px'}}>{option}</span>
                        {selectedOption && (
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
        </div>
    )
}
