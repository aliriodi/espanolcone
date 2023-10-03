import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
//https://www.figma.com/file/JZZzrLkQhTDEuUPkAsacuB/ECE-%2F-Prototipos?type=design&node-id=403-9008&mode=design&t=RIjgbE4EDSxOXwZ9-0
const getUsers = async () => {
  try {
    // const res = await fetch("http://localhost:3000/api/users/get", 
    const res = await fetch("api/users/get",
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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading Users", error);
        setIsLoading(false); // Asegúrate de cambiar isLoading incluso en caso de error
      }
    };
    fetchUsers();
  }, []);

  const handleClickLogin = () => {
    // go to the login
    window.location.href = '/inicio/home';
  };

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
          </div>
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
