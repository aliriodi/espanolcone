"use client"
import React, { useEffect, useRef, useState } from 'react'
import Logo from '../public/imgs/logo-gradient.png';
import Image from 'next/image';
import Zelle from '../public/imgs/zelle-logo-0.png';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'next-i18next';

export default function ModalPagoABLE(props) {
  const { t } = useTranslation(['index', 'register'])
  const [isOpen, setIsOpen] = useState(false)
  //PARA EL FORMULARIO
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [NewUser, setNewUser] = useState(false);
  //Validacion de condiciones para activar compra
  const [emailOk, setEmailOk] = useState(false);
  const [nombreOk, setNombreOk] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setApellido(apellido)
    props.setNombre(nombre)
    props.setEmail(email)
  
    // Aquí puedes enviar los datos a tu backend o hacer lo que necesites con ellos
  };

  function validate(nombre,email){
    props.setApellido(apellido)
    props.setNombre(nombre)
    props.setEmail(email)
    var validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(nombre.length>1){setNombreOk(true)} else{setNombreOk(false)}
    if( validEmail.test(email) ){setEmailOk(true)}else{setEmailOk(false)}
  }
  function generarPassword() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      password += caracteres.charAt(randomIndex);
    }
    
    props.setPasswd(password)

    return password;
  }

  async function MakeAndPay() {
    // Este metodo se encarga de hacer el respespectivo pago por Paypal

    // Genera contraseña temporal
    let temporalPassword = generarPassword()


    // try {
    //   await fetch('/api/users/getUserEmail/' + email,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       }
    //     })
    //     .then(response => response.json())
    //     .then(async(response) => {

    //       //Si usuario existe
    //       if (response.totalResults) {

    //         IncrementAppoinment(response.results), props.open1(), props.close()

    //         // Al mensage de email se le agrega el saludo
    //         // emailMessage.content = emailMessage.content + `
    //         // <p>¡Gracias nuevamente por elegirnos como tu compañero de aprendizaje!<p>

    //         // <p>¡Saludos!</p>

    //         // <p><b>Equipo de Español con E</b></p>
    //         // `;

    //       }

    //       //Si usuario NO existe
    //       else {

    //         createUser()
            
    //         // Al mensage de email se le agrega la contraseña temporal y el saludo
    //         // emailMessage.content = emailMessage.content + `
    //         // <p>
    //         // Como eres un nuevo usuario, se ha creado una cuenta para ti dentro de nuestra plataforma con la siguiente clave temporal: <b>${temporalPassword}</b>
    //         // Te sugerimos cambiar tu clave y por favor, no dudes en ponerte en contacto con nosotros si tienes alguna pregunta o necesitas ayuda con algo. Estamos aquí para ayudarte en cada paso del camino.
    //         // </p>

    //         // <p>¡Gracias nuevamente por elegirnos como tu compañero de aprendizaje!<p>

    //         // <p>¡Saludos!</p>

    //         // <p><b>Equipo de Español con E</b></p>
    //         // `;

    //       }
          
    //       // Envia email
    //       // await axios.post('/api/mail/template/1', emailMessage)
    //     })
    // }
    // catch (error) {
    //   console.log(error);
    // }
    props.open1(), props.close() 
    //si creo usuario bien anro paypal
  }
  async function MakeAndPay2() {
    
    props.open2();
    props.close();
    // setPasswd(generarPassword)
    // props.setPasswd(passwd)
    
    // //si creo el usuario bien abro zelle
    // try {
    //   await fetch('/api/users/getUserEmail/' + email,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       }
    //     })
    //     .then(response => response.json())
    //     .then(response => {

    //       //Si usuario existe
    //       if (response.totalResults) { IncrementAppoinment(response.results), props.open2(), props.close() }

    //       //Si usuario no existe
    //       else { createUser2() }
    //     })
    // }
    // //props.open1(), props.close() 
    // catch (error) {
    //   console.log(error);
    // }


  }

  async function createUser() {
    setNewUser(true);
    props.setNewUser(true);
    // try {
    //   console.log('creando usuario')
    //   // Borrar creacion de usuario y dejar la parte en la que cierran los popUps
    //   await axios.post('/api/auth/signup',
    //     {
    //       first_name: nombre,
    //       last_name: apellido,
    //       country: "",
    //       email: email,
    //       password: passwd,
    //       confirm_password: passwd,
    //       roles: ['student', 'user']
    //     }
    //   ).then(response => {console.log(response), props.open1(), props.close() });

    // } catch (error) { console.log(error) }
  }
  async function createUser2() {
    setNewUser(true);
    props.setNewUser(true);
    try {
      console.log('creando usuario')
      await axios.post('/api/auth/signup',
        {
          first_name: nombre,
          last_name: apellido,
          country: "",
          email: email,
          password: passwd,
          confirm_password: passwd,
          roles: ['student', 'user']
        }
      ).then(response => { console.log(response), props.open2(), props.close(), MakeAndPay2() });

    } catch (error) { console.log(error) }
  }


  async function IncrementAppoinment(user) {
    try {
      console.log(user)
      props.setUser(user)
    } catch (error) { console.log(error) }
  }
  const closeModal = () => {
    props.modalPay(false)
    setIsOpen(false)
    setNombre('')
    setApellido('')
    setEmail('')
  }

  useEffect(() => {
    setIsOpen(props.open)
  }, [props.open])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <>

      {isOpen &&
        <>
          <div
            onClick={closeModal}
            className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-[999]'>

            <div
              onClick={(e) => e.stopPropagation()}
              className='bg-white rounded-md p-5 relative
          md:w-full md:px-0 md:rounded-none'>
              {/* Formulario */}

              <div className=' flex justify-center flex-col border-b-2 pb-5 items-center relative'>

                <Image src={Logo} className='mb-0' style={{ width: '100px' }} alt="Logo" />
              </div>
              <div className='pt-2'>
                <form onSubmit={handleSubmit}>
                  <div className='p-2'>

                      {/* Nombre */}
                      <label className='p-2 text-violet_dark'>
                        {t('name')}:
                      </label>
                      <input
                        className={classNames('ml-2 border p-2 w-full focus-visible:outline-none rounded-md ',!nombreOk? 'border-gray-300': ' shadow-md  shadow-primary border-green-300')}
                        type="text"
                        value={nombre}
                        placeholder={t('name')}
                        onChange={(e) => {setNombre(e.target.value),validate(e.target.value,email)  }}
                      />
                  </div>
                  {/* <div className='p-2'>
                  <label className='p-2'>
                      {/* Apellido */}
                      {/* {t('lastname')}: */}
                      {/* <input
                        className='ml-2 border focus-visible:outline-none rounded-md border-gray-300 '
                        type="text"
                        value={apellido}
                        placeholder={'  '+t('lastname')}
                        onChange={(e) => setApellido(e.target.value)}
                      />
                    </label>
                  </div> */} 
                  <div className='p-2'>

                    {/* Correo Electronico */}
                    <label className='p-2 text-violet_dark'>
                      {t('email')}:
                    </label>

                    <input
                      className={classNames('ml-2 border p-2 w-full  focus-visible:outline-none rounded-md ',!emailOk? 'border-gray-300': ' shadow-md  shadow-primary border-green-300')}
                      type="email"
                      placeholder='  johndoe@gmail.com'
                      value={email}
                      onChange={(e) => {setEmail(e.target.value),validate(nombre,e.target.value)}}
                    />

                  </div>


                  {/* Logo */}
                  <div className=' flex justify-center flex-col border-b-2 pb-5 items-center relative'>


                    <p className='text-[18px] text-light font-medium absolute bottom-[-13px] bg-white px-2'>Métodos de pago:</p>
                  </div>

                  {/* Metodo de pago */}
                {emailOk && nombreOk ?

                // Botones validos
                <div
                className='w-[750px] max-h-[70vh] flex-col flex justify-center p-3 mt-7
                overflow-y-scroll modal-paypal
                md:w-full'>

                      {/* Paypal */}
                      <button
                        type="submit"
                      onClick={() => MakeAndPay()}
                        className='rounded-[5px] text-white px-5 py-2.5 mb-4 w-full text-[21px] italic font-semibold bg-gradient-to-r from-[#253b80] to-[#2997d8]  flex justify-center
                      hover:shadow-[0px_4px_14px_#253b80]'>
                        PayPal
                      </button>

                      {/* Zeller */}
                      <button
                        type="submit"
                        onClick={() => MakeAndPay2()}
                        className='rounded-[5px] text-white px-5 py-2.5 w-full mb-4 text-[16px] font-semibold bg-[#7422e0] flex justify-center
                      hover:shadow-[0px_4px_14px_#7422e0]'>
                        <Image src={Zelle} alt='zelle' className='w-[60px]' />
                      </button>
                    <div className='w-full m-auto'>
                    </div>
                  </div>
                  :
                  // Botones de invalidacion
                  <div
                  className='w-[750px] max-h-[70vh] flex-col flex justify-center p-3 mt-7
                  overflow-y-scroll modal-paypal
                  md:w-full'>

                    {/* Paypal */}
                    <button
                    type="submit"
                    onClick={() => alert(t('email')+' o '+t('name')+' Invalido')}
                    className='rounded-[5px] text-white px-5 py-2.5 mb-4 w-full text-[21px] italic font-semibold bg-gradient-to-r from-[#253b80] to-[#2997d8]  flex justify-center opacity-[50%] pointer-events-none
                    hover:shadow-[0px_4px_14px_#253b80]'>
                      {/* <Image src={Zelle} alt='zelle' className='w-[60px]'/>  */}
                      PayPal
                    </button>

                    {/* Zeller */}
                    <button
                      type="submit"
                      onClick={() => alert(t('email')+' o '+t('name')+' Invalido')}
                      className='rounded-[5px] text-white px-5 py-2.5 w-full mb-4 text-[16px] font-semibold bg-[#7422e0] flex justify-center opacity-[50%] pointer-events-none
                    hover:shadow-[0px_4px_14px_#7422e0]'>
                      <Image src={Zelle} alt='zelle' className='w-[60px]' />
                    </button>

                    <div className='w-full m-auto'>
                    </div>
                  </div>
      }

                </form>


              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}