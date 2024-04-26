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
      <div className=" bg-primary text-white p-10 text-[41px] font-bold  text-center
      md:px-[20px] md:text-[31px]">
        <div className='flex items-center justify-center gap-10 pr-40'>
         <img src="/imgs/logo.png"  alt="Logo" className="w-auto h-20 md:w-8 md:h-8"/ >
         <span>¿Cómo te gustaría aprender español?</span></div>
      </div>


      {/* Formulario */}
      <form className="p-12 w-[768px] mx-auto
      md:w-full md:m-0" onSubmit={handleSubmit}>

        {/* Interes */}
        <div className='my-5'>
          {/* ¿Qué tipo de clases te interesan? */}
          <h3 className=' font-bold'>¿Qué tipo de clases te interesan?</h3>

          {/* Opciones */}
          <div className=' my-5 '>

            {/* Opcion 1 */}
            <div className="flex items-center">

              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion1"
                name="pregunta1"
                value="Individuales online"
                checked={opcionSeleccionada.includes('Individuales online')}
                onChange={handleRadioChange}
              />

              <label
              className=' text-violet_dark font-medium
              md:text-[14px]'
              htmlFor="opcion1">Individuales online</label>

            </div>

            {/* Opcion 2 */}
            <div className="flex items-center">
              
              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion2"
                name="pregunta1"
                value="Grupales Online"
                checked={opcionSeleccionada.includes('Grupales Online')}
                onChange={handleRadioChange}
              />

              <label
              className=' text-violet_dark font-medium
              md:text-[14px]'
              htmlFor="opcion2">Grupales Online</label>
            </div>

            {/* Opcion 3 */}
            <div className="flex items-center">
              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion3"
                name="pregunta1"
                value="Grupales OnlineGrupales presenciales en salón de clases (si estás en CBA)"
                checked={opcionSeleccionada.includes('Grupales OnlineGrupales presenciales en salón de clases (si estás en CBA)')}
                onChange={handleRadioChange}
              />
              <label
              className=' text-violet_dark font-medium
              md:text-[14px]'
              htmlFor="opcion3">Grupales presenciales en salón de clases (si estás en CBA)</label>
            </div>

            {/* Opcion 4 */}
            <div className="flex items-center">
              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion4"
                name="pregunta1"
                value="Grupales presenciales en diferentes lugares  (si estás en CBA)"
                checked={opcionSeleccionada.includes('Grupales presenciales en diferentes lugares  (si estás en CBA)')}
                onChange={handleRadioChange}
              />
              <label
              className=' text-violet_dark font-medium
              md:text-[14px]'
              htmlFor="opcion4">Grupales presenciales en diferentes lugares  (si estás en CBA)</label>
            </div>

          </div>
          
        </div>

        {/* Horarios */}
        <div className='my-5'>

          {/* ¿Tienes alguna preferencia de horario o ubicación para las clases? */}
          <h3 className='font-bold'>¿Tienes alguna preferencia de horario o ubicación para las clases?</h3>

          {/* Opciones */}
          <div>

            {/* En la mañana despues de las 9:00am */}
            <div className="flex items-center mt-4">
              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion4"
                name="pregunta2"
                checked={opcionSeleccionada2.includes('En la mañana despues de las 9:00am')}
                value={'En la mañana despues de las 9:00am'}
                onChange={handleRadioChange2}
              />
              <label
              className="text-violet_dark
              md:text-[14px]"
              htmlFor="En la mañana despues de las 9:00am">En la mañana despues de las <b>9:00 AM</b></label>
            </div>

            {/* la mañana despues de las 11:00 am */}
            <div className="flex items-center">
              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion3"
                name="pregunta2"
                checked={opcionSeleccionada2.includes('En la mañana despues de las 11:00 am')}
                value={'En la mañana despues de las 11:00 am'}
                onChange={handleRadioChange2}
              />
              <label
              className="text-violet_dark
              md:text-[14px]"
              htmlFor="En la mañana despues de las 11:00 am">En la mañana despues de las <b>11:00 AM</b></label>
            </div>

            {/* En la tarde despues de las 3:00pm */}
            <div className="flex items-center">
              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion4"
                name="pregunta2"
                checked={opcionSeleccionada2.includes('En la tarde despues de las 3:00pm')}
                value={'En la tarde despues de las 3:00pm'}
                onChange={handleRadioChange2}
              />
              <label
              className="text-violet_dark
              md:text-[14px]"
              htmlFor="opcion4">En la tarde despues de las <b>3:00 PM</b></label>
            </div>

            {/* Otro horario */}
            <div className="flex items-center">
              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion3"
                name="pregunta2"
                checked={opcionSeleccionada2.includes('Otro horario')}
                value={'Otro horario'}
                onChange={handleRadioChange2}
              />
              <label
              className="text-violet_dark
              md:text-[14px]"
              htmlFor="Otro horario">Otro horario</label>
            </div>

          </div>

        </div>

        {/* Temas */}
        <div className='my-5'>

          {/* ¿Qué temas específicos te gustaría aprender? */}
          <h3 className='font-bold' htmlFor="¿Qué temas específicos te gustaría aprender?">¿Qué temas específicos te gustaría aprender?</h3>
          
          <textarea
            className='mt-3 rounded-[15px] p-3 border-2 outline-primary w-full'
            type="text"
            placeholder="Escriba los temas que desea aprender..."
            id="¿Qué temas específicos te gustaría aprender?"
            value={texto}
            onChange={handleTextChange}
            rows="4"
            cols="50" 
          />
        </div>

        {/* Nombre */}
        <div className='flex flex-col my-5'>

          <label
          className='mb-2 font-bold text-[21px] text-violet_dark'
          htmlFor="name">
            Nombre (Opcional):
          </label>

          <input
            className='p-2 rounded-[15px] border-2 outline-primary'
            type="text"
            placeholder="Yohn Doe"
            id="name"
            value={Name}
            onChange={handleTextChangeName}
            rows="1"
            cols="50"
          />

        </div>

        {/* Email */}
        <div className='flex flex-col my-5'>

          <label
          className='mb-2 font-bold text-[21px] text-violet_dark'
          htmlFor="email">
            Email (Opcional):
          </label>

          <input  
            className='p-2 rounded-[15px] border-2 outline-primary'
            type="text"
            placeholder="yohn@gmail.com"
            id="email"
            value={Email}
            onChange={handleTextChangeEmail}
            rows="1"
            cols="30"
          />

        </div>

        <button className={`bg-primary text-white rounded-md px-10 py-2 font-medium ${!formularioValido?'btn-disabled':'btn-primary'}`} type="submit" disabled={!formularioValido}>Enviar</button>
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