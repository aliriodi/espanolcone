import React, { useEffect, useRef, useState } from 'react';

function ColorfulInput() {
  const editableRef = useRef(null);
  const [content, setContent] = useState("")
  const [currentCursorPosition, setCurrentCursorPosition] = useState(0)

  useEffect(()=>{
    
    if(content){

      
      setCursorPosition(currentCursorPosition)
    }
  },[content])
  // Función para reposicionar el cursor
  const setCursorPosition = (position) => {
    const selection = window.getSelection();
    const range = document.createRange();
    
    // Obtener el nodo de texto dentro del elemento editable
    const textNode = editableRef.current.childNodes[0];

    // Verificar si el nodo de texto existe y si la posición excede su longitud
    if (textNode && position > textNode.length) {
      position = textNode.length;
    }

    range.setStart(textNode, position);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  // Manejar el evento de entrada para obtener la posición del cursor
  const handleInput = (e) => {
    const cursorPosition = getCaretPosition(editableRef.current);
    console.log('Cursor position:', cursorPosition);

    setCurrentCursorPosition(cursorPosition)
    setContent(e.target.innerHTML)
    // if(cursorPosition >= 16)setCursorPosition(16)
    // Aquí puedes hacer lo que quieras con la posición del cursor, como actualizar el estado en tu componente
  };

  // Función para obtener la posición del cursor
  const getCaretPosition = (element) => {
    let caretOffset = 0;
    const doc = element.ownerDocument || element.document;
    const win = doc.defaultView || doc.parentWindow;
    const sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
    return caretOffset;
  };

  return (
    <div
      contentEditable
      ref={editableRef}
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{ border: '1px solid black', padding: '5px' }}
    />
  );
}

export default ColorfulInput;