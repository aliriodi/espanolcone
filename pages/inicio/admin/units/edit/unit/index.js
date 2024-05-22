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

            <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {classResume ? classResume.map(
                        element =>
                            <div key={element._id}>
                                <div className='p-4 w-[180px]'>
                                    <div key={element._id} onClick={() => router.push('/inicio/admin/units/edit/unit/' + element._id)}
                                        className=" cursor-pointer border-2  py-[19px]   ">
                                        <p>{element.level}</p>
                                        <p>{element.unit}</p>
                                    </div>
                                </div>
                            </div>

                    ) : null}
                </div>
            </AdminPage>
        </BodyGeneric>
    )
}
