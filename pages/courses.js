import React, { useState, useEffect } from 'react';
import Class from '../components/Class/Class'
import Menu from '../components/Menu'
import Link from 'next/link'
import { faAngleLeft, faAngleRight, faHouse, faPersonHiking, faChalkboardUser, faLaptop, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import style from "../styles/courses.module.css"

export default function Courses() {

  const dispatch = useDispatch();


  const id = useSelector((state) => state.datos.classid);

  useEffect(() => {

  }, [dispatch]);



  return (
    <> <div className={style['container']}>
      <div className={style['container0']}>
        <Menu /></div>
      <div className='ml-[80px] '>
        {id ? 
          <div className={style['container1']}>
          <Class id={id}></Class></div> 
          :
          <div classname='flex items-center justify-center h-screen'>
            <Spinner className="mx-auto my-auto" />
          </div>
        }
      </div>
    </div></>

  )
}


