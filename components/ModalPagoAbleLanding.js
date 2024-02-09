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

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setApellido(apellido)
    props.setNombre(nombre)
    props.setEmail(email)

    // Aquí puedes enviar los datos a tu backend o hacer lo que necesites con ellos
  };
  function generarPassword() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      password += caracteres.charAt(randomIndex);
    }

    return password;
  }

  async function MakeAndPay() {
    setPasswd(generarPassword)
    props.setPasswd(passwd)

    try {
      await fetch('/api/users/getUserEmail/' + email,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response => response.json())
        .then(response => {
          //Si usuario existe
          if (response.totalResults) { IncrementAppoinment(response.results), props.open1(), props.close() }
          //Si usuario no existe
          else { createUser() }
        })
    }
    //props.open1(), props.close() 
    catch (error) {
      console.log(error);
    }
    //si creo usuario bien anro paypal
  }
  async function MakeAndPay2() {

    setPasswd(generarPassword)
    props.setPasswd(passwd)
    //si creo el usuario bien abro zelle

    try {
      await fetch('/api/users/getUserEmail/' + email,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response => response.json())
        .then(response => {
          //Si usuario existe
          if (response.totalResults) { IncrementAppoinment(response.results), props.open2(), props.close() }
          //Si usuario no existe
          else { createUser2() }
        })
    }
    //props.open1(), props.close() 
    catch (error) {
      console.log(error);
    }

    { props.open2(), props.close() }

  }

  async function createUser() {
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
      ).then(response => { console.log(response), props.open1(), props.close() });

    } catch (error) { console.log(error) }
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

  return (
    <>

      {isOpen &&
        <>
          <div
            onClick={closeModal}
            className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>

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
                    {/* <label className='border border-gray-300 p-2'> */}
                    <label className='p-2'>
                      {/* Nombre */}
                      {t('name')}:
                      <input
                        className='ml-2 border focus-visible:outline-none rounded-md border-gray-300 '
                        type="text"
                        value={nombre}
                        placeholder={'  '+t('name')}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </label>
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
                  <label className='p-2'>
                      {/* Correo Electronico */}
                      {t('email')}:
                      <input
                        className='ml-2 border  focus-visible:outline-none rounded-md border-gray-300 '
                        type="email"
                        placeholder='  johndoe@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>


                  {/* Logo */}
                  <div className=' flex justify-center flex-col border-b-2 pb-5 items-center relative'>


                    <p className='text-[18px] text-light font-medium absolute bottom-[-13px] bg-white px-2'>Métodos de pago:</p>
                  </div>

                  {/* Metodo de pago */}
                  <div
                    className='w-[750px] max-h-[70vh] flex-col flex justify-center p-3 mt-7
            overflow-y-scroll modal-paypal
            md:w-full'>
                    <button
                      type="submit"
                      onClick={() => MakeAndPay()}
                      className='rounded-[5px] text-white px-5 py-2.5 mb-4 w-full text-[21px] italic font-semibold bg-gradient-to-r from-[#253b80] to-[#2997d8]  flex justify-center
                    hover:shadow-[0px_4px_14px_#253b80]'>
                      {/* <Image src={Zelle} alt='zelle' className='w-[60px]'/>  */}
                      PayPal
                    </button>
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
                </form>


              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}