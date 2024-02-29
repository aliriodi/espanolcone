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
    newInputValues[index].done = newValue == newInputValues[index]?.option || (newInputValues[index]?.option == "" && newValue?.length > 0)

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
        return { option:value.option, answer:"", done:false }}}
        )
    )
  },[props?.data])

  useEffect(()=> activityCheck(), [inputValues])

  return (
    <div className={props?.type == "content" && `flex flex-wrap justify-between
    md:justify-evenly`}>
      {  
        props.data.value.map(((value, index) => (
        typeof(value) === 'object' ?

            <span
            className={props?.type == "content" && `relative mb-10`}
            key={index}
            style={{paddingRight: '5px',paddingLeft: '5px'}}>

              {/* Imagen */}
              {
                value?.src &&
                <img
                className={props?.type == "content" && `h-[160px] w-[260px] object-cover rounded-[5px]`}
                src={value?.src}/>
              }
              
              {/* Texto */}
              {
                value?.text &&
                <p
                className={props?.type == "content" && `w-full text-center my-2 text-violet_dark font-medium text-[18px]
                md:text-[16px]`}
                dangerouslySetInnerHTML={{ __html: value?.text }}/>
              }              

              {/* Campo */}
              <input 
                  type="text"
                  className={
                    `
                    ${props?.type == "content" && "w-full"}
                    border-[2px] border- border-solid transition-all rounded-[5px] bg-transparent text-center outline-none
                    ${inputValues[index]?.answer == "" && "border-primary"}
                    ${props.inEvaluation && !props.isAdmin && "border-primary"}
                    ${!props.inEvaluation  && 
                      (
                        inputValues[index]?.answer != "" && inputValues[index]?.answer == inputValues[index]?.option ||
                        (inputValues[index]?.option == "" && inputValues[index]?.answer?.length > 0)
                        ? "border-secondary" 
                        : "border-danger"
                      )
                    }

                    ${props.inEvaluation && props?.isAdmin && //En caso de ser administrador se muestra si la respuesta es correcta o no
                      (
                        inputValues[index]?.answer != "" && inputValues[index]?.answer == inputValues[index]?.option ||
                        (inputValues[index]?.option == "" && inputValues[index]?.answer?.length > 0)
                        ? "border-secondary" 
                        : "border-danger"
                      )
                    }
                    `
                  }
                  value={inputValues[index]?.answer}
                  size={value.block}
                  // onClick={()=>console.log(!props.inEvaluation ||(props.inEvaluation && props?.isAdmin))}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />

            </span>

          : 
          
          <span key={index} dangerouslySetInnerHTML={{ __html: value }}></span> 
        )))
      }
    </div>  )
  }
  