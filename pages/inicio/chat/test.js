import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// let socket;

export default function Chat() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    fetch("/api/chat");

    socketRef.current = io();

    // Suscribirse al evento "receive-message"
    socketRef.current.on("receive-message", receivedMessage);

    // Retornar una función para desuscribirse del evento cuando el componente se desmonte
    return () => {
      socketRef.current.off("receive-message", receivedMessage);
    };
  }, []);

  useEffect(() => {
    console.log("//// allMessages ////", allMessages);
  }, [allMessages]);

  function receivedMessage(data) {
    console.log("socketRef.current.id",socketRef.current.id)
    setAllMessages((prevMessages) => [...prevMessages, data]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newMessage = {
      username,
      message,
      from: "me",
    };

    socketRef.current.emit("send-message", {
      username,
      message,
    });

    setMessage("");
  }
  
    return (
      <div>

        <div className=" bg-white shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] top-0 left-0 w-full px-3 py-8">

            <h1>Chat app</h1>

            {/* <input value={username} onChange={(e) => setUsername(e.target.value)} /> */}

        </div>

        {/* Mensajes */}
        <div className=" bg-primary_flat_hover min-h-screen p-3">

            {/* Mensaje */}
            {allMessages.map(({ username, message, from }, index) => (
                <div
                className={` shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] w-fit flex flex-col rounded-[7px] p-2 my-1 
                ${socketRef.current.id == from ? "ml-auto bg-primary text-white ":"bg-white text-violet_dark"}`}
                key={index}>

                  {/* Usuario */}
                  {
                    socketRef.current.id != from &&
                    <p className=" text-[.8em] mb-2 font-semibold">
                      {from}
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
