import React from 'react'
import Menu from '../components/Menu'
import Image from 'next/image'
import  TourCard  from '../components/TourCard'
import DatePi from './../components/DatePicker';
import { TourCard } from './../components/TourCard';

export default function tourGuides() {
  return (
    <>
      <Menu />
      <div className='ml-[80px] flex flex-wrap'>
        {/* <DatePi /> */}
        <TourCard />

      </div>
    </>
  )
}

