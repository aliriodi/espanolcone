import Link from 'next/link'
import React from 'react'
import Menu from '../../components/Menu';


export default function Home() {


  const handleClickLogin = () => {
    // go to the login
    window.location.href = '/inicio/home';
  };

  const handleClickUsers = () => {
    // go to the login
    window.location.href = '/users';
  };

  return (
    <>
      {/* //TODO hacer header 
    //TODO hacer navbar 
    //TODO hacer barra lateral
    //TODO hacer footer si hay */}
      <Menu />
      <main className='ml-9 p-5 flex flex-col h-screen'>
        <div className='pb-5'>home</div>
        <div className='mx-5'>
          <button
            onClick={handleClickLogin}
            type='submit'
            className='bg-blue-500 text-white px-5 py-2 rounded mr-5'>
            Go Home
          </button>
          <button
            onClick={handleClickUsers}
            type='submit'
            className='bg-blue-500 text-white px-5 py-2 rounded'>
            Go Users
          </button>
        </div>
      </main>
    </>
  )
}
