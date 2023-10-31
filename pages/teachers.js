import React from 'react'
import Menu from '../components/Menu'
import Image from 'next/image'
import { TeachersCard } from '../components/TeachersCard'
import DatePi from './../components/DatePicker';

export default function teachers() {
  return (
    <>
      <Menu />
      <div className='mx-[60px] my-[119px] flex flex-wrap'>
        {/* <DatePi /> */} 
        <TeachersCard />

      </div>
    </>
  )
}
