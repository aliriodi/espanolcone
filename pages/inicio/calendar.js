import React, {useEffect} from 'react'
import Calendar from '../../components/Calendar/CalendarTeacher'
import Menu from '../../components/Menu'
import { cardDetail, fetchTeachers } from '../../redux/ECEActions'
import {  useDispatch } from 'react-redux';
export default function Calendar2 () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers())
    dispatch(cardDetail())


  }, []);
 
  return (
    <>
      <Menu />
      <Calendar />
    </>
  )
}