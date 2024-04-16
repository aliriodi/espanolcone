import React from 'react'
import Base from '../Base'
import Presupuesto from './presupuestoTourism/Presupuesto'
import Chat from './chat/[id].js'
export default function Layout({id,user}) {
    const chatId = 1;
  return (
    <div>
        <Base id={id} child={ <Presupuesto user={user} child2={<Chat id={chatId} userName={user}/>}/>}/>
       
    </div>
  )
}
