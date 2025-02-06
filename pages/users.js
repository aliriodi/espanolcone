import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
//https://www.figma.com/file/JZZzrLkQhTDEuUPkAsacuB/ECE-%2F-Prototipos?type=design&node-id=403-9008&mode=design&t=RIjgbE4EDSxOXwZ9-0


export default function Users() {
  const [currentPage, setCurrentPage] = useState(1)
  const [ip, setIp] = useState("");
  const [maxResults, setMaxResults] = useState(18)
  const getUsers = async () => {
       try {
      // const res = await fetch("http://localhost:3000/api/users/get", 
      const res = await fetch(`/api/users/getAll/${currentPage}?maxResults=${maxResults}`,
        {
          cache: "no-store"
        });
  
      if (!res.ok) {
        throw new Error("Failed to fetch Users");
      }
  
      const data = await res.json();
      return data.users; // Assuming the response has a 'users' property containing the array of users
    } catch (error) {
      console.log("Error loading Users", error);
      return []; // Return an empty array in case of an error
    }
  };
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maxuser,setmaxu] = useState(0)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers().then(res=>setUsers(res))
        //setUsers(null);
        console.log(usersData)
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading Users", error);
        setIsLoading(false); // Asegúrate de cambiar isLoading incluso en caso de error
      }
    };
    
    fetchUsers()
  }, [currentPage]);

  const handleClickLogin = () => {
    // go to the login
    window.location.href = '/inicio/home';
  };
  const handleClickLogin2 = () => {
    // go to the login
    const newfix = currentPage -1;
    setCurrentPage(newfix)
  };
  const handleClickLogin3 = () => {
    // go to the login
    const newfix = currentPage +1;
    setCurrentPage(newfix)
  };
  const [browser, setBrowser] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes("Chrome")) setBrowser("Google Chrome");
    else if (userAgent.includes("Firefox")) setBrowser("Mozilla Firefox");
    else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) setBrowser("Safari");
    else if (userAgent.includes("Edge")) setBrowser("Microsoft Edge");
    else if (userAgent.includes("Opera") || userAgent.includes("OPR")) setBrowser("Opera");
    else setBrowser("Navegador Desconocido");
    fetch("/api/class/modName")
    .then((res) => res.json())
    .then((data) => setIp(data.ip));

  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className='flex flex-row mx-5 my-10'>
            <div className='px-5'>users</div>

            <button
              onClick={handleClickLogin}
              type='submit'
              className='bg-blue-500 text-white px-5 py-2 rounded mr-5'>
              Go Home
            </button>
            <button
              onClick={handleClickLogin2}
              type='submit'
              className='bg-blue-500 text-white px-5 py-2 rounded mr-5'>
              Back
            </button>
            <button
              onClick={handleClickLogin3}
              type='submit'
              className='bg-blue-500 text-white px-5 py-2 rounded mr-5'>
              Next
            </button>
          </div>
          <div>{maxuser}  {currentPage}</div>
          <div>Estás usando: {browser}</div>
          <div>Tu IP es: {ip}</div>
          <div
            className='bg-blue-200 
          flex flex-col
          py-5 
          justify-end'>
            {users.map(e => (
              <div className='my-5 px-5 py-5 flex flex-col  border-solid border-black mx-5 border-2' key={e._id}>
                <div className='flex flex-row'>
                  <div className='pr-10'>ID:</div>
                  <p>{e._id}</p>
                </div>
                <div className='flex flex-row'>
                  <div className='pr-10'>First Name:</div>
                  <p>{e.first_name}</p>
                </div>
                <div className='flex flex-row'>
                  <div className='pr-10'>Last Name:</div>
                  <p>{e.last_name}</p>
                </div>
                <div className='flex flex-row'>
                  <div className='pr-10'>Email:</div>
                  <p>{e.email}</p>
                </div>
                <div className='flex flex-row'>
                  <div className='pr-10'>Rol:</div>
                  <p>{e.role}</p>
                </div>
                <br />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
