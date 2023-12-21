import React, {useState,useEffect} from 'react';
import style from '../../styles/paragragraphcomplete.module.css'

export default function Paragragraphcomplete(props) {
  
  const [inputValues, setInputValues] = useState(() => (
      props.data.value.map( value => {
        if(typeof(value) === 'object')  {
        //return { option:value.option.toLowerCase(), answer:"", done:false}}})
        return { option:value.option, answer:"", done:false}}}
        )
        )
    );
    
  // Function to handle changes in the input
  const handleInputChange = (index, newValue) => {

    // Create a copy of the inputValues array
    const newInputValues = [...inputValues];

    // Update the value at the specified index)

    if(!newInputValues[index]) return;
    newInputValues[index].answer = newValue;
    newInputValues[index].done = newValue == newInputValues[index]?.option

    // Update the state
    setInputValues(newInputValues);
    
  };
  
  function activityCheck(){   
    // Esta funcion se asegura de que todas las actividades esten completas   
    let activityDone = true;
    let activityWithValue = true;
    let totalActivitysDone = 0
    
    inputValues.map((value)=>{
      
      // Comprueba si todas las actividades estan echas
      if(typeof(value) === 'object' && value.done == false) activityDone = false

      // Comprueba si alguna actividad esta sin completar
      if(typeof(value) === 'object'){
        
        totalActivitysDone = value?.done ? totalActivitysDone + 1 : totalActivitysDone
        
        activityWithValue = activityWithValue && !value?.answer?.length == 0 

      }      
    })
    // console.log("activityWithValue ", activityWithValue)
    // console.log("totalActivitysDone ", totalActivitysDone)
    // console.log("IF ", activityDone || activityWithValue && props.inEvaluation)

    // En caso de que se hayan coompletado correctamente todaslas actividades se le pasa un true a "onChangeActivityDone"
    if(activityDone || activityWithValue && props.inEvaluation ) props.onChangeActivityDone(props.id, activityDone, totalActivitysDone)

    // En caso de que todos los campos tengan una respuesta le pasa la cantidad de actividades correctas
    else if(activityWithValue) props.onChangeActivityDone(props.id, activityDone, totalActivitysDone)
  }

  useEffect(()=>{
    if(props?.done){
      setInputValues(
        inputValues?.map((inputValue, index)=>{
          if(typeof(inputValue) === 'object') inputValue.answer = inputValues[index]?.option
          
          return inputValue
        })
      )
    }
  },[props])

  useEffect(()=>{
    setInputValues(
      props.data.value.map( value => {
        if(typeof(value) === 'object')  {
        //return { option:value.option.toLowerCase(), answer:"", done:false}}})
        return { option:value.option, answer:"", done:false}}}
        )
    )
  },[props?.data])

  useEffect(()=> activityCheck(), [inputValues])

  return (
    <div>
      {  
        props.data.value.map(((value, index) => (
        typeof(value) === 'object' ?

            <span key={index} style={{paddingRight: '5px',paddingLeft: '5px'}}>

              <input 
                  type="text"
                  className={
                    `
                    border-[2px] border- border-solid transition-all rounded-[5px] bg-transparent text-center outline-none
                    ${inputValues[index]?.answer == "" && "border-primary"}
                    ${props.inEvaluation && "border-primary"}
                    ${!props.inEvaluation && 
                      (inputValues[index]?.answer != "" && inputValues[index]?.answer == inputValues[index]?.option
                      ? "border-secondary" 
                      : "border-danger"
                      )
                    }
                    `
                  }
                  value={inputValues[index]?.answer}
                  size={value.block}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />

            </span>

          : <span key={index} dangerouslySetInnerHTML={{ __html: value }}></span> 
        )))
      }
    </div>  )
  }
  