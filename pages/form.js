import React, { useState,useEffect  } from 'react';

function Formulario() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [opcionSeleccionada2, setOpcionSeleccionada2] = useState('');
  const [language,setLanguage]=useState('')
  const [texto, setTexto] = useState('');
  const [formularioValido, setFormularioValido] = useState(false);
  
  useEffect(() => {
    // Código que se ejecutará después del renderizado
    validarFormulario();
     }, [opcionSeleccionada,opcionSeleccionada2,texto,language]); 

  const validarFormulario = () => {
    // Verificar si se ha seleccionado una opción en ambos radio buttons y si se ha ingresado texto
    if (opcionSeleccionada && opcionSeleccionada2 && texto.trim() !== '') {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleRadioChange = (e) => {
    setOpcionSeleccionada(e.target.value);
     };
  const handleRadioChange2 = (e) => {
    setOpcionSeleccionada2(e.target.value);
     };

  const handleTextChange = (e) => {
    setTexto(e.target.value);
     };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a través de una API o realizar cualquier otra acción necesaria
    console.log('Opción seleccionada:', opcionSeleccionada);
    console.log('Opción seleccionada2:', opcionSeleccionada2);
    console.log('Texto ingresado:', texto);
    console.log('language:', language)
    await fetch('/api/formulario/add/', 
             {  //redirect: 'follow',
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                 headers: {
                            'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
                          },
                 body: JSON.stringify({
                    pregunta1:opcionSeleccionada,
                    pregunta2:opcionSeleccionada2,
                    texto:texto,
                    language:language
                                       })
                                       
                                       //mando por el body la nueva clase
             })

  };

  return (
    <div className="flex flex-col  ">
    {/* Navbar superior */}
    <div className="bg-primary text-white p-10 w-full">¿Cómo te gustaría aprender español?</div>
    {/* Formulario */}
    
    <form className="p-12" onSubmit={handleSubmit}>
    ¿Qué tipo de clases te interesan?
    
        {/* Opcion 1 */}
      <div>
         <input
          type="radio"
          id="opcion1"
          name="pregunta1"
          value="Individuales online"
          checked={opcionSeleccionada === 'Individuales online'}
          onChange={handleRadioChange}
        />
        <label htmlFor="opcion1">Individuales online</label>
      </div>
    {/* Opcion 2 */}
      <div>
        <input
          type="radio"
          id="opcion2"
          name="pregunta1"
          value="Grupales Online"
          checked={opcionSeleccionada === 'Grupales Online'}
          onChange={handleRadioChange}
        />
        <label htmlFor="opcion2">Grupales Online</label>
      </div>

        {/* Opcion 3 */}
      <div>
        <input
          type="radio"
          id="opcion3"
          name="pregunta1"
          value="Grupales OnlineGrupales presenciales en salón de clases (si estás en CBA)"
          checked={opcionSeleccionada === 'Grupales OnlineGrupales presenciales en salón de clases (si estás en CBA)'}
          onChange={handleRadioChange}
        />
        <label htmlFor="opcion3">Grupales presenciales en salón de clases (si estás en CBA)</label>
      </div>

        {/* Opcion 4 */}
      <div>
        <input
          type="radio"
          id="opcion4"
          name="pregunta1"
          value="Grupales presenciales en diferentes lugares  (si estás en CBA)"
          checked={opcionSeleccionada === 'Grupales presenciales en diferentes lugares  (si estás en CBA)'}
          onChange={handleRadioChange}
        />
        <label htmlFor="opcion4">Grupales presenciales en diferentes lugares  (si estás en CBA)</label>
      </div>
      <br />
<p>¿Tienes alguna preferencia de horario o ubicación para las clases?</p>
      <div>
        <input
          type="radio"
          id="opcion4"
          name="pregunta2"
          checked={opcionSeleccionada2 === 'En la mañana despues de las 9:00am'}
          value={'En la mañana despues de las 9:00am'}
          onChange={handleRadioChange2}
        />
        <label htmlFor="En la mañana despues de las 9:00am">En la mañana despues de las 9:00am</label>
      </div>
      <div>
        <input
          type="radio"
          id="opcion3"
          name="pregunta2"
          checked={opcionSeleccionada2 === 'En la mañana despues de las 11:00 am'}
          value={'En la mañana despues de las 11:00 am'}
          onChange={handleRadioChange2}
        />
        <label htmlFor="En la mañana despues de las 11:00 am">En la mañana despues de las 11:00 am</label>
      </div>
      <div>
        <input
          type="radio"
          id="opcion4"
          name="pregunta2"
          checked={opcionSeleccionada2 === 'En la tarde despues de las 3:00pm'}
          value={'En la tarde despues de las 3:00pm'}
          onChange={handleRadioChange2}
        />
        <label htmlFor="opcion4">En la tarde despues de las 3:00pm</label>
      </div>
      <div>
        <input
          type="radio"
          id="opcion3"
          name="pregunta2"
          checked={opcionSeleccionada2 === 'Otro horario'}
          value={'Otro horario'}
          onChange={handleRadioChange2}
        />
        <label htmlFor="Otro horario">Otro horario</label>
      </div><br />
      <div>
      ¿Qué temas específicos te gustaría aprender? <br/>
        <label htmlFor="¿Qué temas específicos te gustaría aprender?"></label>
        
        <textarea
          type="text"
          placeholder="Escriba los temas que desea aprender..."
          id="¿Qué temas específicos te gustaría aprender?"
          value={texto}
          onChange={handleTextChange}
          rows="4"
          cols="50" 
        />
      </div><br/>
      <button type="submit" disabled={!formularioValido}>Enviar</button>
    </form>
    </div>
  );
}

export default Formulario;
