import React from 'react'
import Presupuesto from "../../../components/GuideTourist/presupuestoTourism/Presupuesto.jsx";
import Layout from '../../../components/GuideTourist/Layout.jsx';


export default function presupuestoTEST() {
    const cliente = 'Alirio Diaz'
    return (
        <div>
            <Layout>
            <Presupuesto user={cliente} />
                </Layout>   
                
                
        </div>
    )
}
