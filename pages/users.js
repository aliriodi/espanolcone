import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div>users</div>
      <div
        className='bg-blue-200 
      flex flex-row 
      justify-end border-2 
      border-solid 
      border-black mx-5'>
        {users.map(e => (
          <div key={e._id}>
            <p>{e._id}</p>
            <p>{e.first_name}</p>
            <p>{e.last_name}</p>
            <p>{e.email}</p>
            <p>{e.role}</p>
          </div>
        ))}
      </div>
    </>
  );
}
