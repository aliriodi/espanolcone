import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useRouter } from 'next/router';
import BodyGeneric from '../../../components/GenericsElements/BodyGeneric'
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircleCheck, faClock, faCommentDots, faComments, faFaceLaughBeam, faFileInvoiceDollar, faHandPointLeft, faHourglass, faHourglassHalf, faPaperPlane, faPersonHiking, faUserPlus, faUserXmark, faX } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Presupuesto from "../../../components/GuideTourist/presupuestoTourism/Presupuesto";
import ModalPayment from "../../../components/GenericsElements/Payment/ModalPayment";
import ListUsers from "../../../components/Chat/ListUsers";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [currentListContacts, setCurrentListContacts] = useState([]);
  const [currentID, setCurrentID] = useState(null);
  const [chatsDatas, setChatsDatas] = useState(null);
  const [requestID, setRequestID] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const [openForm, setOpenForm] = useState(false);
  const [openListUsers, setOpenListUsers] = useState(false);
  const [openListContancts, setOpenListContancts] = useState(false);  

  const [loaderSendMessager, setLoaderSendMessager] = useState(false)
  const [loaderChat, setLoaderChat] = useState(false)

  const [pusher, setPusher] = useState(null);

  const [openPayment, setOpenPayment] = useState(false)
  const [paymentDate, setPaymentDate] = useState({
    menssageIndex:0,
    amount: "13.00", // Monto de la transacción
    currency: "USD", // Moneda
    description: "Compra de producto", // Descripción de la compra
  })
  
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status, update } = useSession();

  const messageScreen = useRef(null);
  
  useEffect(()=>{
        
    if(pusher == null){
      
      setPusher(new Pusher(process.env.NEXT_PUBLIC_KEY, {
        cluster: "sa1",
    
        // // use jwts in prod
        authEndpoint: `/api/pusher/auth`,
        auth: { params: {userID: session?.user?._id}}
      }));

    }
    
  },[])
  
  useEffect(() => {
    
    if(pusher){

      const channel = pusher.subscribe(`presence-channel`); 

      // Actualiza el chat
      channel.bind(`chat-update`, function (data){
        const {
          username,
          messages,
          chatId,
          userID,
          budget,
          intrusion
        } = data 

        // En caso de ser un "mensaje" con el mismo ID de chat que el actual
        // Se va a agrega a "allMessages" 
        if(chatId == session?.user?.chats[id]?.chatID && chatId && !intrusion){
          setAllMessages((prevState) => [
            ...prevState,
            { messages, userID, budget },
          ]);
        }

        // De caso contrario lo que se recibio fue una "Intrucion"
        // Desde acá se va a definir que instrucion es y cual se va a ejecutar 
        else if(chatId == session?.user?.chats[id]?.chatID && chatId && intrusion){
          
          switch(intrusion?.type){
            case "reload_chat":

              getChat()       

            break;
          }

        }

      });
  
      return () => {
        pusher.unsubscribe(`presence-channel`);
      };
    }

  }, [pusher, currentID, session]);

  useEffect(()=>{

    getChat()
    setCurrentID(id)
    session?.user?.chat && setCurrentListContacts(session?.user?.chat)
    console.log("Contactos actuales ",session?.user?.chat)

  },[id, session])

  useEffect(()=>{
    setAllMessages([])
    setLoaderChat(true)
    setRequestID(null)
    setOpenForm(false)
    // messageScreen.current.scrollTop = messageScreen.current.scrollHeight - messageScreen.current.clientHeight;
    // messageScreen?.current.scrollTop = messageScreen.current.scrollHeight - messageScreen.current.clientHeight;
  },[id])

  useEffect(()=>{

    setOpenListContancts(false)
    if(allMessages)messageScreen.current.scrollTop = messageScreen.current.scrollHeight - messageScreen.current.clientHeight

  },[allMessages])

  async function handleSubmit(e) {

    // Metodo encargado de actualizar el chat, y disparar el evento de mensajes
    e.preventDefault();
    setLoaderSendMessager(true)

    await axios.post("/api/pusher/chat-update", {
      messages: message,
      userID: session?.user?._id,
      chatId: session?.user?.chats[id]?.chatID
    });

    messageScreen.current.scrollTop = messageScreen.current.scrollHeight - messageScreen.current.clientHeight;

    setLoaderSendMessager(false)
    setMessage("");

    await axios.post(`/api/chat/add/message/${session?.user?.chats[id]?.chatID}`,
      {
        message: message,
        userID: session?.user?._id
      }
    )
  }

  async function handlerSendExpenses(data, observacion, total){
    
    console.log("data ",data, " | ", observacion)

    await axios.post("/api/pusher/chat-update", {
      messages: message,
      userID: session?.user?._id,
      chatId: session?.user?.chats[id]?.chatID,
      budget:{
        data: data,
        total:total,
        observacion:observacion,
        wasPayed: false
      }
    });

    await axios.post(`/api/chat/add/message/${session?.user?.chats[id]?.chatID}`,
      {
        message: message,
        userID: session?.user?._id,
        budget:{
          data: data,
          total:total,
          observacion:observacion,
          wasPayed: false
        },
      }
    )

    setOpenForm(false)
  }

  async function handleRequest(value){

    let newChat = {...currentChat};

    newChat.requests = value;//"64ee534d698266e6fce966af"

    try{
      console.log("newChat ",newChat)
      await axios.post(`/api/chat/update`, { chat: newChat})
      setLoaderChat(false)
      getChat()
    }
    catch(e){
      console.log(e)
    }
    
  }

  async function handlePaymentSuccess(data){
    // Metodo encargado de ejecutar y asignar pagos del chat

    // Crea resivos 
    let recipe = {
      idUser: session?.user?._id,
      idPlan: "",
      qty: paymentDate?.amount,
      ammount: 1,
      dates:{
        type: data?.type,
        menssageIndex:paymentDate?.menssageIndex
      }
    }

    // Asigna el estado mensaje
    let newMessages = [...allMessages]

    switch(data?.type){

      case "PAYPAL":
        // En los pagos por Paypal va a asignale como "pagado" 
        console.log("PAYPAL")

        // El "wasPayed" pasa a "true" 
        newMessages[paymentDate?.menssageIndex].budget = {
          ...newMessages[paymentDate?.menssageIndex].budget,
          wasPayed: true
        }
      break


      case "ZELLER":
        // En los pagos por "Zeller" va a asignale como "pendiente" 
        console.log("ZELLER")

        // El "wasPayed" pasa a "undefined" 
        newMessages[paymentDate?.menssageIndex].budget = {
          ...newMessages[paymentDate?.menssageIndex].budget,
          wasPayed: undefined
        }

        // Se actualiza la propiedad "pendingPayments" del usuario con el pago de Zeller
        updateDates({
          ...session?.user,
          pendingPayments:[
            ...session?.user?.pendingPayments,
            {
              typeMethod: "ZELLER",
              type:"chat",
              image: data?.image,
              userID: session?.user?._id,
              qty: paymentDate?.amount,
              valid:false,
              menssageIndex:paymentDate?.menssageIndex,
              chatID: session?.user?.chats[id]?.chatID,
            }
          ]
        })

        
        
        break
      }

    // 
    let finalChat = {...currentChat}

    finalChat.messages = newMessages;
    
    try{
      
      await axios.post(`/api/chat/update`, { chat: finalChat})
      console.log("finalChat ",finalChat)

    }
    catch(e){
      console.log(e)
    }

    // Se manda una instrucion al otro usuario para actualizar "allMessages"
    await axios.post("/api/pusher/chat-update", {
      userID: session?.user?._id,
      chatId: session?.user?.chats[id]?.chatID,
      intrusion:{
        type:"reload_chat"
      }
    });

    let newCurrentChat = {
      ...currentChat,
      messages: newMessages
    }

    console.log("###### ", newMessages)
    setAllMessages(newMessages)

  }
  
  async function updateDates(updates) {
    // Esta funcion se encarga de actualizar los datos del usuario 
    // en funcion de lo que se le pase por el parametro "updates"

    // setLoading(true);

    try {
        
        if(updates.image != session?.user?.image) updates = {...updates, image:{ url: await upLoadProfilePictutre()}}

        const response = await fetch('/api/users/update', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:session?.user?.email, updates: updates}),
        });
  
        if (response.ok) {
            const data = await response.json();

            if (data.message) {
                // Se Actualiza el usuario
                await update({
                    ...session?.user,
                    accessToken:"dddd"
                })

                console.log('Usuario actualizado con éxito');
            } else {
                console.error('Error al actualizar el usuario:', data.error);
            }
        } else {
            console.error('Error al realizar la solicitud:', response.status);
        }

        // setLoading(false)
    } catch (error) {
        // setLoading(false)
        console.error('Error al realizar la solicitud:', error);
    }
  }


  async function getChat(){
    
    // Obtiene el chat actual
    if(session?.user?.chats[id]?.chatID){

      // Incia el loader
      if(allMessages?.length == 0)setLoaderChat(true)
      
      // busca el chat desde la api
      let newAllMessages = axios.get(`/api/chat/get/${session?.user?.chats[id]?.chatID}`)

      newAllMessages = await newAllMessages

      setCurrentChat(newAllMessages?.data?.findChat)
      setAllMessages( newAllMessages?.data?.findChat?.messages || [])
      setRequestID(newAllMessages?.data?.findChat?.requests)
      
    }
    
    // Obtiene los datos de los distintos usuarios del chat ( Nombre, Apellido, Imagen y rol )
    if(!chatsDatas && session?.user){
      
      let newChatsDatas = await axios.post('/api/users/getRenderizate',
      {
        usersIDs: session?.user?.chats?.map((chat)=>{return chat?.userID}),
      }
      )
      
      newChatsDatas = newChatsDatas?.data?.users.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});
      
      setChatsDatas(newChatsDatas)
      console.log(newChatsDatas)
      
    }
    
    setLoaderChat(false) 
    
  }
  
  async function handleCreateChat(currentUser, contactUser){
    let result = await axios.post(
      '/api/chat/add',
      {
        usersIDs: [ 
          currentUser, // "651dacff8ac427a834bcaf89", // okina
          contactUser // "64ee534d698266e6fce966af" // nahuel
        ],

        messages:[],

        requests: currentUser // "64ee534d698266e6fce966af" // nahuel
      }
    )

    console.log("result ", result?.data?.users)
    update({
        ...session?.user,
        accessToken:"dddd"
    })
    
    session?.user?.chat && setCurrentListContacts(session?.user?.chat)

    getChat()
    return true
  }

  async function openPaymentModal(amount, description,index){

    if(!amount){
      alert("Este presupuesto no tiene un monto definido")
      return
    }

    setPaymentDate({
      amount: amount, 
      currency: "USD", 
      description: description,
      menssageIndex: index
    })
    setOpenPayment(true)
  }
  
    return (
      <BodyGeneric
      redirectPath={"/inicio/home"}>
        
        <div className=" flex w-full mt-[35px]">
          
          {/* ///////////// Lista de Chats ///////////// */}
          <div className={`w-[400px] mr-3 bg-white rounded-[15px] shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000030] z-50 relative transition-all flex flex-col h-[78vh] overflow-auto
          md:absolute md:h-screen ${openListContancts ? "md:left-[0px]" : "md:left-[-800px]"}`}>

            
            <div
            onClick={()=>setOpenListContancts(false)}
            className="text-[21px] text-dark_hover absolute right-3 top-3 hidden
            md:flex">
              <FontAwesomeIcon icon={faX}/>
            </div>
            
            <ul className="mt-[80px] h-full flex-grow-[1] pb-36">
              
              {/* Contactos */}
              {
                session?.user?.chats &&

                session?.user?.chats.length > 0 ?
                session?.user?.chats?.map( (chat, index) =>
                  <li key={index}>

                    <Link
                    className={`${index == currentID ? "bg-primary text-white" : "text-violet_dark hover:bg-primary_flat_hover"} font-medium w-[80%] flex mx-auto my-2 py-2 px-6 rounded-full transition-all items-center`}
                    href={`/inicio/chat/${index}`}>

                      {/* Imagen de Perfil */}
                      {
                        chatsDatas && chatsDatas[chat?.userID]?.image?.url ?

                        <Image
                        height={50}
                        width={50}
                        src={chatsDatas[chat.userID]?.image?.url} className="w-[50px] h-[50px] bg-gray_clear rounded-full mr-3 object-cover"/> :

                        <span className="w-[50px] h-[50px] bg-gray_clear rounded-full mr-3"/>
                      }

                      <div>

                        {/* Nombre y Apellido */}
                        <p>{chat?.chatName}</p> 

                        {/* Rol */}
                        {
                          chatsDatas &&
                          ( 
                            chatsDatas[chat?.userID]?.role.includes("admin") ||
                            chatsDatas[chat?.userID]?.role.includes("guide")  ||
                            chatsDatas[chat?.userID]?.role.includes("teacher")
                          ) &&

                          <p className={` text-sm rounded-[5px] px-2 w-fit
                            ${chatsDatas[chat?.userID]?.role.includes("admin") && index != currentID && "bg-info text-semibold"}
                            ${chatsDatas[chat?.userID]?.role.includes("guide") && index != currentID && "bg-success_light text-success"}
                            ${chatsDatas[chat?.userID]?.role.includes("teacher") && index != currentID && "bg-primary_flat_hover text-primary"}
                          `}>
                            {chatsDatas[chat.userID]?.role}
                          </p>
                        }

                      </div>
                      
                    </Link>

                  </li>
                )
                :
                <div className=" text-center text-violet_dark font-medium">
                  Aun no tienes contactos 
                </div>
              }

              {/* Encuentra a tu Guia Turistico */}
              {
                (
                  !session?.user?.role?.includes("admin")  &&
                  !session?.user?.role?.includes("guide")  &&
                  !session?.user?.role?.includes("teacher")
                ) &&

                <li className="mt-[25px]">
                  <Link
                  href="/inicio/tourGuides"
                  className={` text-success font-medium w-[80%] flex mx-auto my-2 py-2 px-6 rounded-full transition-all items-center hover:bg-success_light`}>
                    <FontAwesomeIcon icon={faPersonHiking} className="text-[30px] mr-3"/>
                    <p>Encuentra a tu Guia Turistico</p>
                  </Link>
                </li>
              }

              {/* <li>
                <button 
                onClick={handleCreateChat}
                className={`text-violet_dark hover:bg-primary_flat_hover font-medium w-[80%] flex mx-auto my-2 py-2 px-6 rounded-full transition-all`}>
                  Agregar +
                </button>
              </li> */}

            </ul>

            {/* Hacer nuevo contacto */}
            <div className=" absolute bg-white w-full bottom-0 rounded-[0_0_15px_15px]">
              
              <button
              onClick={()=>setOpenListUsers(true)}
              className={` text-success font-medium w-[80%] flex mx-auto my-6 py-2 px-6 rounded-full transition-all items-center hover:bg-success_light`}>

                <div className="w-[50px] h-[50px] flex justify-center items-center bg-success rounded-full ">
                  <FontAwesomeIcon icon={faUserPlus} className="text-[20px] w-[25px] text-white"/>
                </div>                

                <b className="ml-3">Nuevo contacto</b>
                
              </button>
            </div>
            
          </div>

          {/* ///////////// Mensajes ///////////// */}
          <div className=" bg-primary_flat_hover relative h-[78vh] flex-grow rounded-[15px] shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000030] overflow-hidden
          md:h-screen md:pt-[50px]">
            
              <div
              onClick={()=>setOpenListContancts(true)}
              className=" shadow-[0px_4px_24px_#18292F1A] bg-white rounded-full justify-center items-center w-[50px] h-[50px] absolute left-2 top-2 text-violet_dark hidden
              md:flex">
                <FontAwesomeIcon icon={faComments}/>
              </div>
              
              
              {
                !requestID ?
                
                // Mensaje
                <div
                ref={messageScreen}
                className="overflow-auto relative h-full p-3 pb-[150px]">

                {
                  !loaderChat ?
                  
                  allMessages?.length > 0 ?
                  allMessages?.map(({ userID, messages, from, budget }, index) => (
                    <div
                    onClick={()=>console.log(budget)}
                    className={` shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] w-fit flex flex-col rounded-[7px] p-2 my-1 max-w-[80%]  transition-all
                    ${userID == session?.user?._id ? 
                      budget && budget?.wasPayed ?
                      "ml-auto bg-secondary text-white " :
                      budget?.wasPayed == -1 ? "ml-auto bg-[#83C7D6] text-white" : "ml-auto bg-primary text-white"
                      :"bg-white text-violet_dark"}`
                    }
                    key={index}>

                      {/* Mensaje */}
                      <p>
                        {messages}
                      </p>

                      {/* Presupuesto */}
                      {
                        budget?.data?.length ?
                        <div>

                          {/* Encabezado */}
                          <ul className={`grid grid-cols-3 ${ userID == session?.user?._id ? "text-white" : " text-violet_dark" } py-2 font-medium`}>
                            <li className="px-3">Descripción</li>
                            <li className="px-3 text-center">Cantidad</li>
                            {/* <li className="px-3 text-center">Unidad</li> */}
                            <li className="px-3 text-center">Monto Unitario</li>
                            {/* <li className="px-3 text-center">Monto Total</li> */}
                          </ul>

                          {/* Datos de compra */}
                          {
                            budget?.data?.map((e, index)=>
                            <ul
                              key={index}
                              className={`grid grid-cols-3 font-medium  roundde last-of-type:rounded-[0_0_15px_15px] border-t-2 ${ userID == session?.user?._id ? "border-white text-white" : " border-violet_dark text-violet_dark"}`}>

                              <li className={`px-3 py-1`}>{e?.descripcion}</li>
                              <li className={`px-3 py-1 text-center`}>{e?.cantidad}</li>
                              {/* <li className={`px-3 py-1 text-center`}>{e?.unidad}</li> */}
                              <li className={`px-3 py-1 text-center`}>{e?.montoUnitario}</li>
                              {/* <li className={`px-3 py-1 text-center`}>{e?.montoTotal}</li> */}

                            </ul>
                            )
                          }

                          {/* Total */}
                          <div className="flex mt-3 px-3  font-medium">
                            <b className="mr-2">Total:</b>
                            <p>
                              {
                                budget?.total ?
                                `${budget?.total} USD`
                                :
                                0
                              }
                            </p>
                          </div>

                          <div
                          className="mt-4 mb-2">

                            {
                              // Mensaje del lado del que mando el presupuesto
                              userID == session?.user?._id ? 
                              <p className="text-[18px] text-center flex items-center justify-center font-semibold">
                                
                                {
                                  budget?.wasPayed ?

                                  // Pagado
                                  <>
                                  Se a completado el pago <FontAwesomeIcon className="ml-2" icon={faCircleCheck}/>
                                  </>
                                  :

                                  // Pendiente
                                  <>
                                  Pago en espera <FontAwesomeIcon className="ml-2" icon={faHourglassHalf}/>
                                  </>
                                }

                              </p>

                              :

                              // Mensaje / Boton del lado del cliente
                              budget?.wasPayed ?
                              <p className="w-full flex items-center justify-center font-semibold">

                                Compra completada

                                <FontAwesomeIcon
                                className="ml-2 text-secondary"
                                icon={faCheckCircle}/>

                              </p>
                              :
                              budget?.wasPayed == false ?

                              // Boton de pago
                              <button
                              onClick={()=>openPaymentModal(budget?.total, budget?.observacion, index)}
                              className=" btn-primary w-full py-2 font-medium">
                                Obtener
                              </button>

                              :
                              
                              // Pendiente
                              <p className="text-[18px] text-center flex items-center justify-center font-semibold">

                                Pago en espera <FontAwesomeIcon className="ml-2" icon={faHourglassHalf}/>

                              </p>

                              
                            }
                            


                          </div>
                          
                        </div>
                        :
                        ""
                      }

                    </div>
                  ))
                  :
                  
                    (
                      id == "null" ?
                      // pantalla sin selecionar usuario
                      <div className="w-full h-full flex justify-center items-center text-[#83C7D6] flex-col">

                        <FontAwesomeIcon
                        className="text-[100px] "
                        icon={faHandPointLeft} />

                        <p className="text-[21px] mt-3"><b>Seleciona</b> a un algun <b>contacto</b></p>

                      </div>
                      :

                      // Pantalla sin mensajes
                      <div className="w-full h-full flex justify-center items-center text-[#83C7D6] flex-col">

                        <FontAwesomeIcon
                        className="text-[100px] "
                        icon={faFaceLaughBeam} />

                        <p className="text-[21px] mt-3">Dile <b>¡Hola!</b> a <b>{session?.user?.chats[id]?.chatName}</b></p>

                      </div>
                    )
                  

                  :

                  // Loader
                  <div className="w-full h-full flex justify-center items-center">
                    <span className="inline-block  h-[100px] w-[100px] animate-spin rounded-full border-white border-[10px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"/>
                  </div>
                }

                </div>

                :

                // Solicitud
                session?.user && requestID == session?.user?._id ? 

                  // Pantalla del que envio la "Solicitud"
                  <div
                  ref={messageScreen}
                  className="overflow-auto relative h-full p-3 pb-[150px]">

                    <div className="w-full h-full flex justify-center items-center text-[#83C7D6] flex-col">

                      <FontAwesomeIcon
                      className="text-[100px] "
                      icon={faHourglassHalf} />

                      <p className="text-[21px] mt-3"><b>Espera</b> unos momentos a que <b>{chatsDatas != null  && chatsDatas[session?.user?.chats[id]?.userID]?.first_name}</b> acepte <b>tu solicitud</b></p>

                    </div>

                  </div>

                  : 
                  
                  // Pantalla del que resivio la "Solicitud"
                  <>
                    <div
                    ref={messageScreen}
                    className="overflow-auto relative h-full p-3 pb-[150px]">
                      
                      <div className="w-full h-full flex justify-center items-center text-[#83C7D6] flex-col">

                        {
                          requestID == "false" || requestID == false ?
                          
                          // Solicitud "rechazada"
                          <>
                            <FontAwesomeIcon
                            className="text-[100px] "
                            icon={faUserXmark} />
                            
                            <p className="text-[21px] mt-3">La solicitud fue <b>rechazada</b></p>
                          </>

                          :

                          // Solicitud "enviada"
                          <>
                            <FontAwesomeIcon
                            className="text-[100px] "
                            icon={faCommentDots} />
                            <p className="text-[21px] mt-3"><b>{chatsDatas != null && chatsDatas[session?.user?.chats[id]?.userID]?.first_name}</b> te envio una <b>solicitud</b></p>
                          </>

                        }

                      </div>

                    </div>

                    {/* Botones */}
                    {
                      requestID == "false" || requestID == false ?
                      <div
                      className=" w-full absolute left-0 bottom-5 flex justify-center  pt-2 px-7 ">

                        {/* <button
                        // onClick={()=> handleRequest(null)}
                        className="bg-primary text-white text-[18px] font-medium py-4 px-8 rounded-full mx-5 flex-grow-[1]">
                          Aceptar
                        </button> */}
                        
                        
                      </div>

                      :
                      <div
                      className=" w-full absolute left-0 bottom-5 flex justify-center  pt-2 px-7 ">

                        <button
                        onClick={()=> { handleRequest(null); setLoaderChat(true) }}
                        className="bg-primary text-white text-[18px] font-medium py-4 px-8 rounded-full mx-5 flex-grow-[1]">

                          {
                          loaderChat ?
                            <span className="inline-block  h-5 w-5 animate-spin rounded-full border-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"/>
                            :
                            "Aceptar"
                          }
                        </button>
                        
                        <button
                        onClick={()=> handleRequest(false)}
                        className=" text-primary border-4 border-primary text-[18px] font-semibold py-3 px-8 rounded-full mx-5 flex-grow-[1]">
                          Cancelar
                        </button>
                        
                      </div>
                    }
                  </>
              }

              
              {/* Formulario de Presupuesto */}
              <div
              className={`w-full max-h-full absolute left-0 z-50 border-t-2 border-secondary overflow-auto transition-all duration-300 ${openForm ? "bottom-[0%]" : "bottom-[-100%]"}`}>

                <div className="w-full max-h-full relative">

                  <button
                  onClick={()=>setOpenForm(false)}
                  className="absolute top-2 right-2 text-violet_dark p-3">
                    <FontAwesomeIcon icon={faX}/>
                  </button>

                  <Presupuesto
                  handlerSend={handlerSendExpenses}
                  user={session?.user?.chats[id]?.chatName}/>     

                </div>

              </div>
              
              {/* Envio de mensajes */}
              {
                id != "null" &&
                requestID == null && 
                <form
                className=" w-full absolute left-0 bottom-0 flex justify-center  pt-2 "
                onSubmit={handleSubmit}>

                  <div
                  className="w-[80%] relative mb-5 px-4 py-3 rounded-full overflow-hidden shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] outline-0 text-violet_dark font-medium bg-white flex items-center">

                    {/* Campo de mensajes */}
                    <input
                    className="w-full outline-none"
                    name="message"
                    placeholder="enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    autoComplete={"off"}
                    />

                    {/* Botton de envio */}
                    <button
                    className="h-9 w-9 bg-primary rounded-full text-white flex justify-center items-center">
                      
                      {
                        !loaderSendMessager ?

                        // icono
                        <FontAwesomeIcon icon={faPaperPlane}/>:

                        // Loader
                        <span className="inline-block  h-5 w-5 animate-spin rounded-full border-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"/>
                      }

                    </button>

                  </div>

                  {/* Mostrar Presupuesto */}
                  {
                    (
                      session?.user?.role.includes("admin") ||
                      session?.user?.role.includes("guide")
                    ) &&
                    <div
                    onClick={()=>setOpenForm(true)}
                    className="h-[60px] w-[60px] cursor-pointer bg-white rounded-full shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] ml-3 flex justify-center items-center border-2 border-secondary">
                      <FontAwesomeIcon
                      className=" w-6 h-6 text-secondary"
                      icon={faFileInvoiceDollar}/>
                    </div>
                  }

                </form>
              }
          </div>

        </div>

        {/* Lista de usuario */}
        <ListUsers
        currentContacts={chatsDatas}
        open={openListUsers}
        createChat={handleCreateChat}
        closeModal={()=> setOpenListUsers(false)}/>

        {/* Modal de pago */}
        <ModalPayment
        date={paymentDate}
        open={openPayment}
        onPaymentSuccess={handlePaymentSuccess}
        onCloseModal={()=>setOpenPayment(false)}/>
        
      </BodyGeneric>
    );
}