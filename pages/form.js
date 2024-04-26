import React, { useState, useEffect } from 'react';
import { useTranslation, withTranslation } from 'next-i18next';
import nextI18NextConfig from "../next-i18next.config";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


function Formulario() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState([]);
  const [opcionSeleccionada2, setOpcionSeleccionada2] = useState([]);
  const [language, setLanguage] = useState('')
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [texto, setTexto] = useState('');
  const [formularioValido, setFormularioValido] = useState(false);


  useEffect(() => {
    // Código que se ejecutará después del renderizado
    validarFormulario();
  }, [opcionSeleccionada, opcionSeleccionada2, texto, language]);

  const validarFormulario = () => {
    // Verificar si se ha seleccionado una opción en ambos radio buttons y si se ha ingresado texto
    if (opcionSeleccionada.length && opcionSeleccionada2.length && texto.trim() !== '') {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleRadioChange = (e) => {
    const opcion = e.target.value;
    // Si la opción ya está seleccionada, la removemos
    if (opcionSeleccionada.includes(opcion)) {
      setOpcionSeleccionada(opcionSeleccionada.filter(item => item !== opcion));
    } else { // Si no está seleccionada, la agregamos
      setOpcionSeleccionada([...opcionSeleccionada, opcion]);
    }
  };
  const handleRadioChange2 = (e) => {
        //setOpcionSeleccionada2(e.target.value);
        const opcion = e.target.value;
    // Si la opción ya está seleccionada, la removemos
    if (opcionSeleccionada2.includes(opcion)) {
      setOpcionSeleccionada2(opcionSeleccionada2.filter(item => item !== opcion));
    } else { // Si no está seleccionada, la agregamos
      setOpcionSeleccionada2([...opcionSeleccionada2, opcion]);
    
  };}
  
  const handleTextChange = (e) => {
    setTexto(e.target.value);
  };
//Variables opcionales Email y Name
  const handleTextChangeName = (e) => {
    setName(e.target.value);
  };
  const handleTextChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = async (e) => {
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
          pregunta1: opcionSeleccionada,
          pregunta2: opcionSeleccionada2,
          texto: texto,
          language: language,
          Name:Name,
          Email:Email
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
            type="checkbox"
            id="opcion1"
            name="pregunta1"
            value="Individuales online"
            checked={opcionSeleccionada.includes('Individuales online')}
            onChange={handleRadioChange}
          />
          <label className='pl-2' htmlFor="opcion1">Individuales online</label>
        </div>
        {/* Opcion 2 */}
        <div>
          <input
            type="checkbox"
            id="opcion2"
            name="pregunta1"
            value="Grupales Online"
            checked={opcionSeleccionada.includes('Grupales Online')}
            onChange={handleRadioChange}
          />
          <label className='pl-2' htmlFor="opcion2">Grupales Online</label>
        </div>

        {/* Opcion 3 */}
        <div>
          <input
            type="checkbox"
            id="opcion3"
            name="pregunta1"
            value="Grupales OnlineGrupales presenciales en salón de clases (si estás en CBA)"
            checked={opcionSeleccionada.includes('Grupales OnlineGrupales presenciales en salón de clases (si estás en CBA)')}
            onChange={handleRadioChange}
          />
          <label className='pl-2' htmlFor="opcion3">Grupales presenciales en salón de clases (si estás en CBA)</label>
        </div>

        {/* Opcion 4 */}
        <div>
          <input
            type="checkbox"
            id="opcion4"
            name="pregunta1"
            value="Grupales presenciales en diferentes lugares  (si estás en CBA)"
            checked={opcionSeleccionada.includes('Grupales presenciales en diferentes lugares  (si estás en CBA)')}
            onChange={handleRadioChange}
          />
          <label className='pl-2' htmlFor="opcion4">Grupales presenciales en diferentes lugares  (si estás en CBA)</label>
        </div>
        <br />
        <p>¿Tienes alguna preferencia de horario o ubicación para las clases?</p>
        <div>
          <input
            type="checkbox"
            id="opcion4"
            name="pregunta2"
            checked={opcionSeleccionada2.includes('En la mañana despues de las 9:00am')}
            value={'En la mañana despues de las 9:00am'}
            onChange={handleRadioChange2}
          />
          <label className='pl-2' htmlFor="En la mañana despues de las 9:00am">En la mañana despues de las 9:00am</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="opcion3"
            name="pregunta2"
            checked={opcionSeleccionada2.includes('En la mañana despues de las 11:00 am')}
            value={'En la mañana despues de las 11:00 am'}
            onChange={handleRadioChange2}
          />
          <label className='pl-2' htmlFor="En la mañana despues de las 11:00 am">En la mañana despues de las 11:00 am</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="opcion4"
            name="pregunta2"
            checked={opcionSeleccionada2.includes('En la tarde despues de las 3:00pm')}
            value={'En la tarde despues de las 3:00pm'}
            onChange={handleRadioChange2}
          />
          <label className='pl-2' htmlFor="opcion4">En la tarde despues de las 3:00pm</label>
        </div>
        <div>
          <input
            type="radio"
            id="opcion3"
            name="pregunta2"
            checked={opcionSeleccionada2.includes('Otro horario')}
            value={'Otro horario'}
            onChange={handleRadioChange2}
            
          />
          <label className='pl-2' htmlFor="Otro horario">Otro horario</label>
        </div><br />
        <div>
          ¿Qué temas específicos te gustaría aprender? <br />
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
        </div><br />
        {/* Nombre */}
        <div>
          Nombre (Opcional):
          <label className='pl-4' htmlFor="name"></label>

          <input
            type="text"
            placeholder="Yohn Doe"
            id="name"
            value={Name}
            onChange={handleTextChangeName}
            rows="1"
            cols="50"
          />
        </div><br />
        {/* Email */}
        <div>
          Email (Opcional):
          <label className='pl-2' htmlFor="email"></label>

          <input
            
            type="text"
            placeholder="yohn@gmail.com"
            id="email"
            value={Email}
            onChange={handleTextChangeEmail}
            rows="1"
            cols="30"
          />
        </div><br />

        <button className='bg-primary ' type="submit" disabled={!formularioValido}>Enviar</button>
      </form>
    </div>
  );
}

//export default Formulario;

export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['navbar', 'footer', 'form', 'common', 'menu', 'aboutus', 'index', 'register'], nextI18NextConfig)),
      //     devDotToPosts: res.posts
    },
  }
}
export default withTranslation(['navbar', 'footer', 'form', 'landing'])(Formulario);