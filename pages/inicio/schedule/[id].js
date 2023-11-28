import React , {useEffect} from 'react';
import { cardDetail, fetchTeachers } from '../../../redux/ECEActions';
import {  useDispatch } from 'react-redux';
import Schedule from '../../../components/Calendar/CalendarStudent';
import Menu from '../../../components/Menu';


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