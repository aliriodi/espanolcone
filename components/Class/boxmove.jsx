import React from 'react'
import styles from '../../styles/boxmove.module.css'
import Image from 'next/image';
export default function boxmove(props) {
    function dragstart_handler(ev) {
        // Add the target element's id to the data transfer object
        ev.dataTransfer.setData("text/plain", ev.target.id);
      }
    
      window.addEventListener("DOMContentLoaded", () => {
        // Get the element by id
        const element = document.getElementById(props.id);
        // Add the ondragstart event listener
        element.addEventListener("dragstart", dragstart_handler);
      });
    
   let   onDrop = (ev, cat) => {         
        let id = ev.dataTransfer.getData(props.id);  
        let tasks = state.tasks.filter((task) => {      
            if (task.name == id) {               
                task.category = cat;                 }                     
                return task;          
         });           
         setState({                 
             ...state,                 
            tasks          
         });    
   
    } ; let    onDragOver = (ev)=>{ ev.preventDefault();}

//forma div
//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));
alert(document.getElementById("mydiv"))
console.log(document.getElementById("mydiv"))
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

  return (
    <div>
  <div><label draggable={false}>{props.id}</label></div>
  <div  hey={props.id} onDragStart={(e)=>onDragStart(e,props.id)}
       draggable className="droppable" ><label id={props.id} draggable className="droppable" onDragOver={(e)=>onDragOver(e)}  
              onDrop={(e)=>onDrop(e, "complete")}>{props.option}</label></div>

              
<div id="mydiv">
  <div id="mydivheader">Click here to move</div>
  <p>Move</p>
  <p>this</p>
  <p>DIV</p>
</div>
    </div>
  )
}
