import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/inicio/chat/test");
  };

  function handleLoginChange(e){

    localStorage.setItem("userName",JSON.stringify(e.target.value))
  }


  return (
    <div className="flex m-auto items-center justify-center flex-col h-screen w-full bg-primary">
      <div className="mb-5">
      <h1 className="text-5xl text-white m-auto">Chattr</h1>
      <p className="text-gray-200">your chats, your way</p>
      </div>
      
      <form
        onSubmit={handleLogin}
        className="px-3 py-20 rounded-md w-full max-w-2xl bg-white"
      >
        <p className="text-purple-900 text-center mb-4">
          Enter your name to start:
        </p>
        <div className="max-w-md m-auto flex flex-col justify-center items-center">
          <input
            type="text"
            onChange={handleLoginChange}
            className="border border-1 border-purple-900 rounded-md px-2 py-2 focus:ring-1 focus:ring-purple-500 w-full"
            placeholder="your name"
          />

        <button
        type="submit"
        className="btn-primary w-full py-2 px-2 rounded-md text-white max-w-sm mt-3 h-full"
        >
            Sign in to get started
        </button>
          
        </div>
      </form>
    </div>
  );
}
