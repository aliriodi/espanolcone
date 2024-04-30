import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

function Presupuesto({ user, handlerSend }) {
  const [items, setItems] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [unidad, setUnidad] = useState('');
  const [montoUnitario, setMontoUnitario] = useState(0);
  const [observacion, setObservacion] = useState('');
  const [total, setTotal] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    
fetch('/api/presupuesto/check').then(response=>console.log('response',response))
  },
    [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const montoTotal = parseFloat(cantidad) * parseFloat(montoUnitario);
    const newItem = {
      descripcion,
      cantidad,
      unidad,
      montoUnitario,
      montoTotal,
    };

    if (editIndex === -1) {
      setItems([...items, newItem]);
      setTotal(total + montoTotal);
    } else {
      const newItems = [...items];
      const oldTotal = newItems[editIndex].montoTotal;
      newItems[editIndex] = newItem;
      setItems(newItems);
      setTotal(total - oldTotal + montoTotal);
      setEditIndex(-1);
    }

    setDescripcion('');
    setCantidad(1);
    setUnidad('');
    setMontoUnitario(0);
  };

  const handleEdit = (index) => {
    const item = items[index];
    setDescripcion(item.descripcion);
    setCantidad(item.cantidad);
    setUnidad(item.unidad);
    setMontoUnitario(item.montoUnitario);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const deletedItem = items[index];
    setItems(items.filter((_, i) => i !== index));
    setTotal(total - deletedItem.montoTotal);
  };


  //Funcion para enviar a BD
  async function handleSend2() { }

  return (
    <div className='h-full w-full mx-auto p-2 bg-white pt-8'>

      <h1 className='py-3'>Presupuesto para <u>{user}</u> </h1><br />

      {/* Tabla */}
      <div
        className='border-2 border-secondary rounded-[15px] bg-secondary'>

        {/* Encabezado */}
        <ul className=' grid grid-cols-7 text-white py-2 font-semibold'>
          <li className="px-3 text-center">Id</li>
          <li className="px-3">Descripción</li>
          <li className="px-3 text-center">Cantidad</li>
          <li className="px-3 text-center">Unidad</li>
          <li className="px-3 text-center">Monto Unitario</li>
          <li className="px-3 text-center">Monto Total</li>
          <li className="px-3 text-center">Acciones</li>
        </ul>

        {/* Listado */}
        {
          items?.length > 0 ?
            items.map((item, index) => (

              <ul
                key={index}
                className=' grid grid-cols-7 font-medium text-violet_dark bg-white roundde last-of-type:rounded-[0_0_15px_15px] border-t-2 border-secondary'>

                <li className={`px-5 py-4 border-r-2 border-secondary text-center`}>{index + 1}</li>
                <li className={`px-5 py-4 border-r-2 border-secondary`}>{item.descripcion}</li>
                <li className={`px-5 py-4 border-r-2 border-secondary text-center`}>{item.cantidad}</li>
                <li className={`px-5 py-4 border-r-2 border-secondary text-center`}>{item.unidad}</li>
                <li className={`px-5 py-4 border-r-2 border-secondary text-center`}>{item.montoUnitario}</li>
                <li className={`px-5 py-4 border-r-2 border-secondary text-center`}>{item.montoTotal}</li>

                <li className="px-5 py-4 flex justify-around">

                  {/* Editar */}
                  <button
                    className='text-primary'
                    onClick={() => handleEdit(index)}>
                    <FontAwesomeIcon
                      icon={faPen}
                    />
                  </button>

                  {/* Eliminar */}
                  {
                    editIndex !== index && (
                      <button className=' text-danger' onClick={() => handleDelete(index)}>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                        />
                      </button>
                    )
                  }

                </li>

              </ul>

            ))
            :
            <div className='bg-white rounded-[0_0_15px_15px] text-center py-4 text-light font-medium'>
              Todavia no hay presupuestos agregados
            </div>

        }

      </div>

      {/* Creacion de presupuesto */}
      <form
        className=' py-5 grid grid-cols-2 gap-2'
        onSubmit={handleSubmit}>

        {/* Descripción */}
        <div className=' text-violet_dark font-medium flex flex-col'>
          <label>
            Descripción
          </label>

          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className={`border-2 rounded-[7px] my-2 py-1 px-3 ${editIndex === -1 ? "outline-secondary" : "border-[#83C7D6] outline-primary"}`}
          />
        </div>

        {/* Cantidad */}
        <div className=' text-violet_dark font-medium flex flex-col'>
          <label>
            Cantidad
          </label>

          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className={`border-2 rounded-[7px] my-2 py-1 px-3 ${editIndex === -1 ? "outline-secondary" : "border-[#83C7D6] outline-primary"}`}
          />
        </div>

        {/* Unidad */}
        <div className=' text-violet_dark font-medium flex flex-col'>
          <label>
            Unidad
          </label>

          <input
            type="text"
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            className={`border-2 rounded-[7px] my-2 py-1 px-3 ${editIndex === -1 ? "outline-secondary" : "border-[#83C7D6] outline-primary"}`}
          />
        </div>

        {/* Monto Unitario */}
        <div className=' text-violet_dark font-medium flex flex-col'>
          <label>
            Monto Unitario
          </label>

          <input
            type="number"
            value={montoUnitario}
            onChange={(e) => setMontoUnitario(e.target.value)}
            className={`border-2 rounded-[7px] my-2 py-1 px-3 ${editIndex === -1 ? "outline-secondary" : "border-[#83C7D6] outline-primary"}`}
          />
        </div>

        {/* Agregar / Editar */}
        <button
          className={`rounded-[7px] mt-4 p-2 text-white font-medium transition-all ${editIndex === -1 ? "bg-secondary" : "bg-primary"}`}
          type="submit">
          {editIndex === -1 ? 'Agregar' : 'Editar'}
        </button>

      </form>

      <textarea
        value={observacion}
        onChange={(e) => setObservacion(e.target.value)}
        placeholder="Observaciones..."
        className="w-full mx-auto border-2 rounded-[7px] my-2 py-1 px-3 outline-primary"
      />

      {/* Total */}
      <p className=' text-violet_dark font-medium text-[19px] mt-5'>Total: <b>{total}</b></p>

      {/* Enviar */}
      <button
        onClick={() => { handlerSend(items, observacion), handleSend2(items, observacion) }}
        className='rounded-[7px] mt-4 p-2 text-white font-medium text-[21px] bg-secondary w-full'
        type="submit">
        Enviar
      </button>
    </div>
  );
}

export default Presupuesto;
