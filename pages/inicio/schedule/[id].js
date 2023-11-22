import React , {useEffect} from 'react'
import Schedule from '../../../components/Calendar/CalendarStudent'
import Menu from '../../../components/Menu'
import { cardDetail, fetchTeachers } from '../../../redux/ECEActions'
import {  useDispatch } from 'react-redux';

export default function CalendarforStudentPlaning()
   {
    const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchTeachers())
  dispatch(cardDetail())
}, []);

  return (
    <>
      <Menu />
      <Schedule />
    </>
  )
}