import React from 'react'
import BodyGeneric from '../../../../components/GenericsElements/BodyGeneric'
import AdminPage from '../../../../components/GenericsElements/Admin/AdminPage'
import NavBarAdmin from '../../../../components/admin/NavBarAdmin'
import Link from 'next/link';

export default function Express() {
  return (
    <BodyGeneric>
        <AdminPage>

            <NavBarAdmin/>
        
            <div>
                <Link
                className=' text-success font-medium'
                href={"/inicio/admin/express/create"}>
                    <u>Crear un nuevo Express</u>
                </Link>    
            </div>

        </AdminPage>
    </BodyGeneric>
  )
}
