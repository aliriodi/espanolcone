import React , {useEffect} from 'react';
import { cardDetail, fetchTeachers } from '../../../redux/ECEActions';
import {  useDispatch } from 'react-redux';
import Menu from '../../../components/Menu';
import { MeetGroupAssigment } from '../../../components/Calendar-Group';



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
      <MeetGroupAssigment />
    </>
  )
}