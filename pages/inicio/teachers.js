import React from 'react'
import Menu from '../../components/Menu'
import { TeachersCard } from '../../components/TeachersCard'


export default function teachers() {
  return (
    <>
      <Menu />
      <div className='mx-[60px] my-[119px] flex flex-wrap
      md:mx-[25px]'>
        {/* <DatePi /> */} 
        <TeachersCard />

      </div>
    </>
  )
}
