import React, { useEffect, useState } from 'react';

function TuComponente({id}) {
    const [nombreUsuario, setNombreUsuario] = useState(null);
//componente llamado por /pages/inicio/facturacion.js
    useEffect(() => {
        async function obtenerNombreUsuario() {
            try {
                 // El ID del usuario que deseas buscar
                const response = await fetch(`/api/users/${id}`)
                                .then(response=>response.json())
                                .then(json =>json.userid); // Ruta de la API para obtener información del usuario
                const data = await response;
                setNombreUsuario(data.first_name+' '+data.last_name)
                console.log('data')
             //   console.log('data',data)
                console.log('id',id)
                //setNombreUsuario(data+' '+data.last_name); // Suponiendo que la respuesta incluye el nombre del usuario
            } catch (error) {
                console.error('Error al obtener el nombre del usuario: FacturacionID', error);
            }
        }

        obtenerNombreUsuario();
    }, [id]); // El segundo argumento de useEffect asegura que esta llamada a la API solo se realice una vez al montar el componente

    return (
        <div>
            {nombreUsuario ? `${nombreUsuario}` : 'Usuario No existe'}
        </div>
    );
}

export default TuComponente;
