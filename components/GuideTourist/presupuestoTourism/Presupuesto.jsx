import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
//Para Pago
import ModalPago from '../../ModalPagoPAYPAL';
import ModalPago2 from '../../ModalPagoZelleGuide';
import ModalPagoABLE from '../../ModalPagoAble';
//

function Presupuesto({ user, handlerSend }) {
  const [items, setItems] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [unidad, setUnidad] = useState('');
  const [montoUnitario, setMontoUnitario] = useState(0);
  const [observacion, setObservacion] = useState('');
  const [total, setTotal] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);
  const [personSchedule, setPersonSchedule] = useState({
    first_name: 'Guia nombre',
    last_name: 'Guia apellido',
    email: 'nahuelescujurideveloper@gmail.com',
    _id: '_idDeDruebaDePersonSchedule'
  })

  //Para pago se declaran todas las variables y funciones
  const [openModalDescription, setopenModalDescription] = useState(false)
  const [Description, setDescription] = useState('')
  const [paypalModal, setPaypalModal] = useState(false)
  const [paypalDates, setPaypalDates] = useState(null)
  const [ZelleModal, setZelleModal] = useState(false)
  const [PayModal, setPayModal] = useState(false)
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [OpenP, setOpenP] = useState(false);
  const [paymentCancelled, setPaymentCancelled] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  //upaypalDatesser
  //PAGO DE PAYPAL OK
  const handlePaymentSuccess = async (data, response) => {
    // alert('ahi vengo')
    console.log('data', data)
    console.log('response', response)
    setAssgined(true)
    setIsPaymentConfirmed(true);
    setTimeout(function () { PAYOK(paypalDates, response); }, 500)
    Confirm();
    setPaymentCancelled(false); // Asegúrate de restablecer el otro estado
  };


  const handlePaymentCancel = () => {
    setIsPaymentConfirmed(false);
    //     PAYNOK();
    setPaymentCancelled(true); // Asegúrate de restablecer el otro estado
  };


  const openPaypalModal = (VALUE) => {
    setPaypalModal(true)
    //setPaypalDates(VALUE)
  }

  const openZelleModal = (VALUE) => {
    setZelleModal(true)
    //  setPaypalDates(VALUE)
  }

  const closeZelleModal = () => {
    setZelleModal(false)
  }

  function openModalPay(VALUE) {
    setPayModal(true)
    setPaypalDates(VALUE)
  }

  function closePayModal() { setPayModal(false) }

  const handleChangePaypalModal = (data) => {
    setPayModal(data)
    setZelleModal(data)
    setPaypalModal(data)
  }


  function openPlan() {
    //Chequeo si tengo clases disponiblopenPaypalModales para ver si renderizo compras de clases de acuerdo  
    //a la ultima compra
    const last = session.user.planSync.length;

    if (!last || (session.user.planSync[last - 1].qty - session.user.planSync[last - 1].classview < 1)) setOpenP(true)
    else Confirm()

  }

  function closePlan() {
    setOpenP(false)
  }

  async function Confirm(VALUE) {
    //sb-dgdvf28637629@personal.example.com
    //123456789
    //https://sandbox.paypal.com
    //El  <Plan Confirm={Confirm} newMeeting={newMeeting} closePlan={closePlan} />
    //es el que le asigna el Value para llamar a los modales de pago 

    if (VALUE) {
      //api pago 
      //El valor de value creo que hay que ponerlo en un estado 
      //para irlo pasando entre las funciones
      //inicialmenye asi openPaypalModal(VALUE) ahora
      // {OpenP && <Plan Confirm={Confirm} newMeeting={newMeeting} closePlan={closePlan} />}
      // LINEA 1029 para verl el VALUE 
      openModalPay(VALUE)
    }


    else {

      alert('No hay Valor para pagar')
    }
  }

  //si el pago es ok envio a la BD el pago
  async function PAYOK(VALUE, DATESPAYPAL) {
    //alert('265 entre en payok()')
    try {
      await fetch('/api/users/update',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              email: user.email,
              updates: {
                planSync: [...user.turismo,
                {
                  type: 'Compra de turismo',
                  payment: 'PAYPAL',
                  valid: true,
                  qty: VALUE.qty,
                  cost: VALUE.cost,
                  planing: 1,
                  classview: 0
                }
                ]
              }
            }
          ),
        })

        .then(response => {
          setPaypalDates(null)
          //   console.log("Clase asignado ",response.json())    
        })

    } catch (error) {
      setPaypalDates(null)

      console.error(error);
    }
    try {
      await fetch('/api/receipt/add',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            { 
              idUser: user._id,
              idPlan: 'plansync',
              qty: VALUE.qty,
              ammount: VALUE.cost,
              dates: { VALUE, DATESPAYPAL, type: "PAYPAL" }
            }
          ),
        }).then(response => {
          setPaypalDates(null)
          //  console.log("Clase asignado ",response.json())

        })

    } catch (error) {
      setPaypalDates(null)

      console.error(error);
    }


  }

  //si el pago es no OK
  function PAYNOK() {
    alert('Su pago no ha sido procesado intente nuevamente')
    setPaypalDates(null)
  }
  //cierre de pagos
  //Apertura de asignar viaje
  async function AssingingTravel() {
    //Apertura de emails
    let massageGuide = `Hola Guia turistico`;
    let massageUser = `Hola User`;
    try {
      //envio email a teacher
      await
        fetch('/api/mail/',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: user.email, //aca va el email del guia turistico
              subject: 'Tu viaje sera con: ' + 'aca va el nombre del usuario' + ' ' + 'aca va el apellido del usuario',
              html: massageTeacher + 'linea 208'
            })
          })
      //Envio email a alumno
      await
        fetch('/api/mail/',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: user.email,
              subject: 'Tu viaje sera con: ' + 'variable nombre guia' + ' ' + 'variable guia apellido linea 221',
              html: massageStudent + 'linea 222'
            })
          })
    } catch (error) {
      console.error(error);
    }



    // Cierre de emails   
  }
  //Cierre de enviar viaje
  useEffect(() => {

    fetch('/api/presupuesto/check').then(response => console.log('response', response))
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

      {/* Check box para activar boton de envio */}
      <div className=' flex items-center text-violet_dark font-medium'>
        <input
          type="checkbox"
          className='checkbox mr-2'
          checked={isCheckboxChecked}
          onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
        />
        <label>Recuerda que al monto final se la va a agregar un 20% de aumento</label>

        {/* {openModalDescription && <ModalDescAssig renders={user} meeting={null} personSchedule={personSchedule} openPay={openPlan} openButton={setopenModalDescription} setDescription={setDescription} />} */}
        {/* {OpenP && <Plan Confirm={Confirm} newMeeting={newMeeting} closePlan={closePlan} />} */}

        {
          // !isPaymentConfirmed && true &&
          // <div>

          //   {/* Modal de Pago habilitacion*/}
          //   <ModalPagoABLE
          //     close={closePayModal}
          //     modalPay={handleChangePaypalModal}
          //     open={PayModal}
          //     open1={openPaypalModal}
          //     open2={openZelleModal}
          //   />
          // </div>
        }

        {
          !isPaymentConfirmed && true &&
          <div>

            {/* Modal de Pago PAYPAL*/}
            <ModalPago
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentCancel={handlePaymentCancel}
              modalPaypal={handleChangePaypalModal}
              open={paypalModal}
              dates={paypalDates}
            />
          </div>
        }

        {
          !isPaymentConfirmed && true &&
          <div>

            {/* Modal de Pago ZELLE*/}
            <ModalPago2
              // onPaymentSuccess={handlePaymentSuccess1}
              onPaymentCancel={handlePaymentCancel}
              modalClose={closeZelleModal}
              renders={user}
              personSchedule={personSchedule}
              open={ZelleModal}
              dates={paypalDates}
              newMeeting={'newMeeting'}
            />
          </div>
        }


        {/* Enviar */}
        {
          // isCheckboxChecked &&
          //   total ?

          //   <button
          //     onClick={() => { Confirm({ qty: 1, cost: total, description: descripcion }); setPayModal(!PayModal) }}
          //     className='rounded-[7px] mt-4 p-2 text-white font-medium text-[21px] bg-secondary w-full'
          //     disabled={total === 0}
          //     type="submit">
          //     PAGAR
          //   </button> :

          //   isCheckboxChecked &&
          //   <button
          //     onClick={() => { Confirm({ qty: 1, cost: total, description: descripcion }); setPayModal(!PayModal) }}
          //     className='rounded-[7px] mt-4 p-2 text-white font-medium text-[21px] bg-secondary w-full'
          //     disabled={total === 0}
          //     type="submit">
          //     El monto Total debe ser mayor a CERO
          //   </button>
        }


      </div>

      {/* Enviar */}
      <button
        onClick={() => { handlerSend(items, observacion, total) }}
        className={`rounded-[7px] mt-4 p-2 text-white font-medium text-[21px] bg-secondary w-full
        ${ total === 0 && " pointer-events-none opacity-[70%] "}
        ${!isCheckboxChecked && " pointer-events-none opacity-[70%] "}`}
        type="submit">
        Enviar
      </button>
    </div>
  );
}

export default Presupuesto;
