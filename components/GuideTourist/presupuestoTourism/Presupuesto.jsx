import React, { useState } from 'react';

function Presupuesto({user}) {
  const [items, setItems] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [unidad, setUnidad] = useState('');
  const [montoUnitario, setMontoUnitario] = useState(0);
  const [observacion, setObservacion] = useState('');
  const [total, setTotal] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);

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

  return (
    <div className='h-full w-full mx-auto'>
      <h1>Presupuesto para: <u>{user}</u></h1><br />
      <form onSubmit={handleSubmit}>
        <label>
          Descripción:
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </label>
        <label>
          Cantidad:
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className={'w-10 '}
          />
        </label>
        <label>
          Unidad:
          <input
            type="text"
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            className={'w-20 '}
          />
        </label>
        <label>
          Monto Unitario:
          <input
            type="number"
            value={montoUnitario}
            onChange={(e) => setMontoUnitario(e.target.value)}
            className={'w-20 '}
          />
        </label>
        <button type="submit">{editIndex === -1 ? 'Agregar' : 'Editar'}</button>
      </form>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400">Id</th>
            <th className="border border-gray-400">Descripción</th>
            <th className="border border-gray-400">Cantidad</th>
            <th className="border border-gray-400">Unidad</th>
            <th className="border border-gray-400">Monto Unitario</th>
            <th className="border border-gray-400">Monto Total</th>
            <th className="border border-gray-400  ">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-400">{index+1}</td>
              <td className="border border-gray-400">{item.descripcion}</td>
              <td className="border border-gray-400">{item.cantidad}</td>
              <td className="border border-gray-400">{item.unidad}</td>
              <td className="border border-gray-400">{item.montoUnitario}</td>
              <td className="border border-gray-400">{item.montoTotal}</td>
              <td className="border border-gray-400">
              
        <button onClick={() => handleEdit(index)}>Editar</button>
      <br></br>
      {editIndex!==index && (
        <button className='' onClick={() => handleDelete(index)}>Eliminar</button>
      )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: {total}</p>
      <textarea
        value={observacion}
        onChange={(e) => setObservacion(e.target.value)}
        placeholder="Observaciones..."
        className="w-full mx-auto"
      />
    </div>
  );
}

export default Presupuesto;
