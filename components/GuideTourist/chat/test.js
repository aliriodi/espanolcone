import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Pusher from "pusher-js";
import axios from "axios";
import { useRouter } from "next/router";

// let socket;

export default function Test() {
  const [message, setMessage] = useState("");
  // const [currentUsername, setCurrentUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const socketRef = useRef();
  
  const router = useRouter(); 
  const {  currentUsername } = router.query;

  const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
    cluster: "sa1",

    // // use jwts in prod
    authEndpoint: `/api/pusher/auth`,
    auth: { params: {username:currentUsername}}
  });

  
  
  useEffect(() => {
    
    // setCurrentUsername(JSON.parse(localStorage.getItem("userName")))

    const channel = pusher.subscribe("presence-channel"); 
    // // when a new member successfully subscribes to the channel
    // channel.bind("pusher:subscription_succeeded", (members) => {
    //   // total subscribed
    //   setOnlineUsersCount(members.count);
    // });

    // // when a new member joins the chat
    // channel.bind("pusher:member_added", (member) => {
    //   // console.log("count",channel.members.count)
    //   setOnlineUsersCount(channel.members.count);
    //   setOnlineUsers((prevState) => [
    //     ...prevState,
    //     { username: member.info.username, userLocation: member.info.userLocation },
    //   ]);
    // });

    // // when a member leaves the chat
    // channel.bind("pusher:member_removed", (member) => {
    //   setOnlineUsersCount(channel.members.count);
    //   setUsersRemoved((prevState) => [...prevState, member.info.username]);
    // });

    // updates chats
    channel.bind("chat-update", function (data) {
      const {username, message} = data

      console.log("data ",data)
      setAllMessages((prevState) => [
        ...prevState,
        { username, message },
      ]);
    });

    return () => {
      pusher.unsubscribe("presence-channel");
    };
  }, []);

  useEffect(() => {
    console.log("//// allMessages ////", allMessages);
  }, [allMessages]);

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post("/api/pusher/chat-update", {
      message: message,
      username: currentUsername
    });

    setMessage("");
  }
  
    return (
      <div>

        <div className=" bg-white shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] top-0 left-0 w-full px-3 py-8">

            {/* <h1>Bienvenido al chat {username}</h1> */}

        </div>

        {/* Mensajes */}
        <div className=" bg-primary_flat_hover min-h-screen p-3">

            {/* Mensaje */}
            {allMessages.map(({ username, message, from }, index) => (
                <div
                className={` shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] w-fit flex flex-col rounded-[7px] p-2 my-1 
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
            
            {/* Input de mensajes */}
            <form
            className=" w-full fixed bottom-0 flex justify-center "
            onSubmit={handleSubmit}>

                <input
                className="w-[80%] mb-2 p-4 rounded-full overflow-hidden shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] outline-0 text-violet_dark font-medium"
                name="message"
                placeholder="enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoComplete={"off"}
                />

            </form>
        </div>
      </div>
    );
}

// export async function getServerSideProps() {
//   // Llamada a la API para obtener los datos del chat
//   const res = await fetch("/api/chat"); // Cambia la URL según tu configuración
//   const chatData = await res.json();

//   // Pasar los datos del chat como props al componente
//   return { props: { chatData } };
// }
