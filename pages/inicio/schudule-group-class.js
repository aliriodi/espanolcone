import React, {useEffect} from 'react';
import {TeachersCalendarGroup } from '../../components/Calendar-Group';

import Menu from '../../components/Menu'
import { cardDetail, fetchTeachers } from '../../redux/ECEActions';
import {  useDispatch } from 'react-redux';
import { useSession } from "next-auth/react";


export default function Calendar2 () {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  if(session){
//console.log(session.user.role.includes('admin'))
}

  useEffect(() => {
    dispatch(fetchTeachers())
    dispatch(cardDetail())

  }, []);
 
  return (
    <>
      <Menu />
      
    { session && session.user&& ( session.user.role.includes('admin')   ||
                                  session.user.role.includes('teacher')||
                                  session.user.role.includes('guide') ) ? 
        <TeachersCalendarGroup/>: <TeachersCalendarGroup/>}
        
    </>
    // Todo: ver que muestro, para los maestros.... quizas es lo mismo preguntar Alirio.
  )
}