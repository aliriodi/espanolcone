import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useRouter } from 'next/router';
import BodyGeneric from '../../../components/GenericsElements/BodyGeneric'
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaughBeam, faHandPointLeft, faPaperPlane, faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [currentID, setCurrentID] = useState(null);
  const [chatsDatas, setChatsDatas] = useState(null);

  const [loaderSendMessager, setLoaderSendMessager] = useState(false)
  const [loaderChat, setLoaderChat] = useState(false)

  const [pusher, setPusher] = useState(null);
  
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();

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
      console.log(pusher) 
      // Actualiza el chat
      channel.bind(`chat-update`, function (data){
        const {username, messages, chatId, userID} = data
        console.log("currentID ", session?.user?.chats[id]?.chatID) 
        console.log("data ", data) 
  
        // En caso de tener el mismo ID de chat que el actual, se agrega a los mensajes
        if(chatId == session?.user?.chats[id]?.chatID && chatId){
          setAllMessages((prevState) => [
            ...prevState,
            { messages, userID },
          ]);
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

  },[id, session])

  useEffect(()=>{
    setAllMessages([])
    setLoaderChat(true)
    // messageScreen.current.scrollTop = messageScreen.current.scrollHeight - messageScreen.current.clientHeight;
    // messageScreen?.current.scrollTop = messageScreen.current.scrollHeight - messageScreen.current.clientHeight;
  },[id])

  useEffect(()=>{
    if(allMessages)messageScreen.current.scrollTop = messageScreen.current.scrollHeight - messageScreen.current.clientHeight
  },[allMessages])

  async function handleSubmit(e) {
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

  async function getChat(){
    
    // Obtiene el chat actual
    if(session?.user?.chats[id]?.chatID){

      // Incia el loader
      if(allMessages?.length == 0)setLoaderChat(true)
      
      // busca el chat desde la api
      let newAllMessages = axios.get(`/api/chat/get/${session?.user?.chats[id]?.chatID}`)

      newAllMessages = await newAllMessages
      
      setAllMessages( newAllMessages?.data?.findChat?.messages || [])
      
    }
    console.log("false")
    
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
      
    }
    
    setLoaderChat(false) 
    
  }
  
  async function handleCreateChat(){
    let result = axios.post(
      '/api/chat/add',
      {
        usersIDs: [ "65272226594ccf3fcf0e2043", "651dacff8ac427a834bcaf89" ],

        messages:[]
      }
    )

    // let result = await axios.post('/api/users/getRenderizate',
    //   {
    //     usersIDs: [ "651413df44b213353885dcf5", "64ee534d698266e6fce966af" ],
    //   }
    // )

    console.log("result ", result?.data?.users)
  }
  
    return (
      <BodyGeneric
      redirectPath={"/inicio/home"}>
        
        <div className=" flex w-full mt-[35px]">

          {/* ///////////// Lista de Chats ///////////// */}
          <div className=" w-[400px] mr-3 bg-white rounded-[15px] shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000030]">
            
            <ul className="mt-[80px]">
              
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
                !session?.user?.role.includes("guide")  ||
                !session?.user?.role.includes("teacher") &&
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
            
          </div>

          {/* ///////////// Mensajes ///////////// */}
          <div className=" bg-primary_flat_hover relative h-[78vh] flex-grow rounded-[15px] shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000030]">
              
              <div
              ref={messageScreen}
              className="overflow-auto relative h-full p-3 pb-[150px]">

                {/* Mensaje */}
                {
                  !loaderChat ?
                  
                  allMessages?.length > 0 ?
                  allMessages?.map(({ userID, messages, from }, index) => (
                    <div
                    onClick={()=>console.log(userID)}
                    className={` shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] w-fit flex flex-col rounded-[7px] p-2 my-1 max-w-[80%] 
                    ${userID == session?.user?._id ? "ml-auto bg-primary text-white ":"bg-white text-violet_dark"}`}
                    key={index}>

                      {/* Usuario */}
                      {
                        // userID != session?.user?._id &&
                        // <p className=" text-[.8em] mb-2 font-semibold">
                        //   {userID}
                        // </p>
                      }

                      {/* Mensaje */}
                      <p>
                        {messages}
                      </p>

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
                  <div className="w-full h-full flex justify-center items-center">
                    <span className="inline-block  h-[100px] w-[100px] animate-spin rounded-full border-white border-[10px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"/>
                  </div>
                }

              </div>
              
              {/* Envio de mensajes */}
              {
                id != "null" && 
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

                </form>
              }
          </div>

        </div>

      </BodyGeneric>
    );
}