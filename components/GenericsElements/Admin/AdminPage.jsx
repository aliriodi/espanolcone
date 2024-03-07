import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminPage({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
 
    useEffect(() => {
        getCurrentUser()
    }, [])

    useEffect(()=>{
        if(currentUser?.user && !currentUser?.user?.role?.includes('admin')) {
            window.location.href = "/inicio/home";
        }
        else if(currentUser?.user && currentUser?.user?.role?.includes('admin')) setIsAdmin(true)
    },[currentUser])
    
    async function getCurrentUser(){
        if(!currentUser) setCurrentUser(await getSession())
    }
    
    return (
        <>
            {
                isAdmin &&
                children
            }
        </>
    )
}
