import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useRouter } from 'next/router';
import BodyGeneric from '../../../components/GenericsElements/BodyGeneric'
import Link from "next/link";

export default function ChatPrivate({id,currentUsername}) {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const [allRooms, setAllRooms] = useState(["Sala 1", "Sala 2", "Sala 3"]);

  const [currentID, setCurrentID] = useState(null)

  const router = useRouter();
  //const { id, currentUsername } = router.query;

  const [pusher, setPusher] = useState(null)
  
  useEffect(()=>{
        
    if(pusher == null){
      
      setPusher(new Pusher(process.env.NEXT_PUBLIC_KEY, {
        cluster: "sa1",
    
        // // use jwts in prod
        authEndpoint: `/api/pusher/auth`,
        auth: { params: {username:currentUsername}}
      }));

    }
    
  },[])
  
  useEffect(() => {
    
    if(pusher){

      const channel = pusher.subscribe(`presence-channel`); 
      console.log(pusher) 
      // Actualiza el chat
      channel.bind(`chat-update`, function (data){
        const {username, message, chatId} = data
        console.log("currentID ", currentID) 
  
        // En caso de tener el mismo ID de chat que el actual, se agrega a los mensajes
        if(chatId == currentID && chatId){
          setAllMessages((prevState) => [
            ...prevState,
            { username, message },
          ]);

          // Guardo todos los mensajes en el almacenamiento local dentro de la variable "rooms"
          let rooms = localStorage.getItem("rooms")
          rooms = JSON.parse(rooms) || [];

          console.log("allMessages ",allMessages)
          rooms[currentID] = [
            ...allMessages,
            { username, message },
          ]
          
          localStorage.setItem("rooms",JSON.stringify(rooms))
        }
      });
  
      return () => {
        pusher.unsubscribe(`presence-channel`);
      };
    }

  }, [pusher, currentID]);

  useEffect(() => {
    console.log("//// allMessages ////", allMessages);
  }, [allMessages]);

  useEffect(()=>{

    let rooms = localStorage.getItem("rooms")
    rooms = JSON.parse(rooms) || [];
    console.log(rooms[id])

    setAllMessages(rooms[id]? rooms[id]: [])
    setCurrentID(id)

  },[id])

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post("/api/pusher/chat-update", {
      message: message,
      username: currentUsername,
      chatId: currentID
    });

    setMessage("");
  }
  
    return (
      <>
        
        <div className=" flex w-full">

        
          {/* ///////////// Mensajes ///////////// */}
          <div className=" bg-primary_flat_hover relative h-[78vh] flex-grow rounded-[15px] shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000030]">
              
              <div className="overflow-auto relative h-full p-3 pb-[150px]">

                {/* Mensaje */}
                {allMessages?.map(({ username, message, from }, index) => (
                    <div
                    className={` shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] w-fit flex flex-col rounded-[7px] p-2 my-1 max-w-[80%] 
                    ${username == currentUsername ? "ml-auto bg-primary text-white ":"bg-white text-violet_dark"}`}
                    key={index}>

                      {/* Usuario */}
                      {
                        username != currentUsername &&
                        <p className=" text-[.8em] mb-2 font-semibold">
                          {username}
                        </p>
                      }

                      {/* Mensaje */}
                      <p>
                        {message}
                      </p>

                    </div>
                ))}

              </div>
              
              {/* Input de mensajes */}
              <form
              className=" w-full absolute left-0 bottom-0 flex justify-center "
              onSubmit={handleSubmit}>

                  <input
                  className="w-[80%] mb-5 p-4 rounded-full overflow-hidden shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] outline-0 text-violet_dark font-medium"
                  name="message"
                  placeholder="enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoComplete={"off"}
                  />

              </form>
          </div>

        </div>

      </>
    );
}