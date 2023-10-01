import React from 'react'
import Menu from '../components/Menu'
import Image from 'next/image'
import TeachersCard from '../components/TeachersCard'

export default function teachers() {
  return (
    <>
      <Menu />
      <div className='ml-[80px]'>

        <TeachersCard />

      </div>
    </>
  )
}
