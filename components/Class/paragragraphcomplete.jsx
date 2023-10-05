import React, {useState,useEffect} from 'react';
import style from '../../styles/paragragraphcomplete.module.css'

export default function Paragragraphcomplete(props) {
  
    const [inputValues, setInputValues] = useState(() => (
        props.data.value.map(value => {
          if(typeof(value) === 'object')  {
                                           return ''}
})
      ));
    
      // Function to handle changes in the input
      const handleInputChange = (index, newValue) => {
        // Create a copy of the inputValues array
        const newInputValues = [...inputValues];
        // Update the value at the specified index
        newInputValues[index] = newValue;
        // Update the state
        setInputValues(newInputValues);
       
      };
  return (
    <div>
 {console.log(inputValues)}

{/* <p dangerouslySetInnerHTML={{ __html: props.data.value }}></p> */}
{  
   props.data.value.map(((value, index) => (
    typeof(value)==='object'?
        <span key={index} style={{paddingRight: '5px',paddingLeft: '5px'}}>
         <input key={index}
            type="text"
            style={{
                background: 'transparent',
                border: '2px solid orange', // Set the border color to orange
                borderRadius: '5px', // Optional: Add rounded corners
                textAlign: 'center',
                outline: 'none', // Remove the blue outline
                transition: 'box-shadow 0.3s'
              }}
            className={style["hover-input"]}
            value={inputValues[index]}
            size={value.block}
            onChange={(e) => handleInputChange(index, e.target.value)}
           
             />
        </span>
     : <span key={index} dangerouslySetInnerHTML={{ __html: value }}></span> 
     )))
}
    </div>  )
  }
  