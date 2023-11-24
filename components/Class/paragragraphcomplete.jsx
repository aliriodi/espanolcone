import React, {useState,useEffect} from 'react';
import style from '../../styles/paragragraphcomplete.module.css'

export default function Paragragraphcomplete(props) {
  
  const [inputValues, setInputValues] = useState(() => (
      props.data.value.map( value => {
        if(typeof(value) === 'object')  {
        return { option:value.option.toLowerCase(), answer:"", done:false}}})
        )
    );
    
  // Function to handle changes in the input
  const handleInputChange = (index, newValue) => {

    // Create a copy of the inputValues array
    const newInputValues = [...inputValues];

    // Update the value at the specified index
    newInputValues[index].answer = newValue;
    newInputValues[index].done = newValue == newInputValues[index].option

    // Update the state
    setInputValues(newInputValues);
    
  };
  
  function activityCheck(){   
    // Esta funcion se asegura de que todas las actividades esten completas   
    let activityDone = true;

    inputValues.map((value)=>{
        if(typeof(value) === 'object' && value.done == false) activityDone = false
    })

    if(activityDone) props.onChangeActivityDone(props.id, true)
  }


  useEffect(()=>{
    activityCheck()
  },[inputValues])

  return (
    <div>
      {  
        props.data.value.map(((value, index) => (
        typeof(value) === 'object' ?

            <span key={index} style={{paddingRight: '5px',paddingLeft: '5px'}}>

              <input key={index}
                  type="text"
                  className={
                    `
                    border-[2px] border- border-solid transition-all rounded-[5px] bg-transparent text-center outline-none
                    ${inputValues[index].answer == "" && "border-primary"}
                    ${inputValues[index].answer != "" && inputValues[index].answer == inputValues[index].option
                    ? "border-secondary" 
                    : "border-danger"}
                    `
                  }
                  value={inputValues[index]['answer']}
                  size={value.block}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />

            </span>

          : <span key={index} dangerouslySetInnerHTML={{ __html: value }}></span> 
        )))
      }
    </div>  )
  }
  