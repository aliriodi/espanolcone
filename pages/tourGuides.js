import React from 'react'
import Menu from '../components/Menu'
import Image from 'next/image'
import { TeachersCard } from '../components/TeachersCard'
import DatePi from './../components/DatePicker';
import { TourCard } from './../components/TourCard';

export default function tourGuides() {
  return (
    <>
      <Menu />
      <div className='ml-[80px] w-full flex flex-wrap'>
        {/* <DatePi /> */}
        <TourCard />

      </div>
    </>
  )
}

