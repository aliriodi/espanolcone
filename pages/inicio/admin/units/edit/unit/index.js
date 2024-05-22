import BodyGeneric from '../../../../../../components/GenericsElements/BodyGeneric';
import AdminPage from '../../../../../../components/GenericsElements/Admin/AdminPage';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
export default function Index() {
    const router = useRouter();
    const [classResume, SetClass] = useState(null);
    useEffect(
        () => {
            async function getResume() {
                try {
                    const response = await fetch(`/api/class/getResume`)
                        .then(response => response.json())
                        .then(res => SetClass(res.classResume));
                }
                catch (error) { console.log(error) }

            }
            getResume();
        },
        [])

        console.log(classResume)
    return (
        <BodyGeneric>
            <AdminPage>

            <div >
                    {classResume ? classResume.map(
                        element => 
                            <div onClick={()=>router.push('/inicio/admin/units/edit/unit/'+element._id)} className="border-2 px-[60px] py-[19px]    md:px-[25px]">
                            <p>{element.level}</p>
                            <p>{element.unit}</p>
                        </div>
                        
                    ) : null}
                </div>
            </AdminPage>
        </BodyGeneric>
    )
}
