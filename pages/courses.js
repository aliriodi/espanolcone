import React, { useState, useEffect } from 'react';
import Class from '../components/Class/Class'
import Menu from '../components/Menu'
import Link from 'next/link'
import { faAngleLeft, faAngleRight, faHouse, faPersonHiking, faChalkboardUser, faLaptop, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import style from "../styles/courses.module.css"
import Head from 'next/head'

export default function Courses() {

  const dispatch = useDispatch();


  const id = useSelector((state) => state.datos.classid);
  const page = useSelector((state) => state.datos.classPage);

  const [title, setTitle] = useState(null);

  // const updateTitle = (datos) => {
  //   // Hacer algo con los datos recibidos del hijo
  //   setTitle(datos);
  // };

  useEffect(() => {
    // console.log(page)
  }, [page]);



  return (
    <>
      <Head>
        {/* {
          title?
          <title>{`${title}`} | Español con E</title>:
          <title>Español con E</title>
        } */}
        <meta name="landing" content="welcome" />
      </Head>

      <div className={style['container']}>
        <div className={style['container0']}>
          <Menu onlyMenu={true}/></div>
        <div>
          {id ? 
            <div className={style['container1']}>
            <Class 
            id={id} 
            page={page}
            //  updateTitle={updateTitle}
             ></Class></div> 
            :
            <div classname='flex items-center justify-center h-screen'>
              <Spinner className="mx-auto my-auto" />
            </div>
          }
        </div>
      </div>
    </>

  )
}


