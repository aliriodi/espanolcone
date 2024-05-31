import React from 'react'

import Plan from '../../Plan/Plansync';

import {

    format,

    isSameDay,
    isAfter,

    parseISO,

} from 'date-fns'
import ModalPago from '../../ModalPagoPAYPAL';
import ModalPago2 from '../../ModalPagoZelle';
import ModalPagoABLE from '../../ModalPagoAble';
import ModalDescAssig from '../../Calendar/ModalDescAssig';



export const ComponenteHorasUniversales = ({ teacherCards, renders, selectedDay }) => {
    return (
        <section className='w-[20%] relative flex justify-start flex-col
          md:w-full'>

            {
                teacherCards?.calendar?.length &&
                    session.user.planSync[session.user.planSync.length - 1].qty - session.user.planSync[session.user.planSync.length - 1].classview > 0 ?
                    <p className='font-medium mt-[17px] mb-[15px] text-center text-[14px] text-violet_dark'>
                        Puedes agendar <b>{session?.user?.planSync && session.user.planSync[session.user.planSync.length - 1].qty - session.user.planSync[session.user.planSync.length - 1].classview}</b> {session?.user?.planSync?.length > 1 ? "clases" : "clase"}
                    </p> :
                    <p className='font-medium mt-[17px] mb-[15px] text-center text-[14px] text-violet_dark'>
                        No posees clases para agendar
                    </p>
            }

            <time dateTime={format(selectedDay, "yyyy-MM-dd'T'HH:00:00")} />

            <div className='grid grid-cols-1 divide-x object-none object-right-top w-full px-3'>
                {/* {Section Alumnos} */}

                {renders?.user?.role === 'user' || renders?.user?.role.includes('user') || true ?
                    <ul>
                        {/* de aca viene el id del usuario donde va a renderizar el estado del teacher o guias
                  con los datos del teacher o guia turistico, viene por redux  y por BD en caso de dar f5*/}

                        {isAfter(selectedDay, today) && teacherCards?.calendar?.map((meeting, index) => {

                            if (!meeting.preassgined && !meeting.assigned && isSameDay(parseISO(meeting.userstartDatetime), selectedDay)) {
                                return (

                                    <li key={index}>

                                        <button onClick={() => setNewMeeting(meeting)}
                                            // className={classNames(
                                            //   'focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full border-solid border-[2px] border-primary',
                                            //   newMeeting ? newMeeting.userstartDatetime === meeting.userstartDatetime ? 'bg-success text-white border-none' : '   text-primary hover:border-none border-primary hover:text-white' : ' text-primary hover:border-none border-primary hover:text-white',
                                            //   newMeeting ? newMeeting.userstartDatetime !== meeting.userstartDatetime ? ' text-primary hover:border-none border-primary hover:text-white' : 'bg-success text-white ' : null,
                                            // )}
                                            className={classNames(
                                                'focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full border-solid border-[2px] border-primary hover:bg-primary transition-all',
                                                newMeeting && newMeeting.userstartDatetime === meeting.userstartDatetime ? 'bg-success text-white border-none hover:bg-success_hover' : '   text-primary border-primary hover:text-white',
                                            )}>

                                            <time dateTime={meeting.userstartDatetime}>
                                                {format(parseISO(meeting.userstartDatetime), 'h:mm a')}
                                            </time>{' '}
                                            -{' '}
                                            <time dateTime={meeting.userendDatetime}>
                                                {format(parseISO(meeting.userendDatetime), 'h:mm a')}
                                            </time>

                                        </button>

                                    </li>

                                );
                            }

                        })}


                        {/* Si existe un meeting para asignar y el pago ha sido confirmado, renderiza el botón de confirmar citas */}

                        {isAfter(selectedDay, today) && teacherCards?.calendar?.some(meeting => isSameDay(parseISO(meeting.userstartDatetime), selectedDay) && !meeting.assigned) &&// isPaymentConfirmed &&!isPaymentConfirmed&&
                            session.user.planSync[lastplansyc - 1].valid &&
                            <button
                                type="button"
                                onClick={() => setopenModalDescription(true)}
                                className='btn-primary px-5 py-2.5 mb-2 w-full text-[16px]'>
                                Confirmar
                            </button>}
                        {isAfter(selectedDay, today) && teacherCards?.calendar?.some(meeting => isSameDay(parseISO(meeting.userstartDatetime), selectedDay) && !meeting.assigned) &&// isPaymentConfirmed &&!isPaymentConfirmed&&
                            !session.user.planSync[lastplansyc - 1].valid &&
                            <button
                                type="button"
                                onClick={() => alert('Su pago ZELLE se esta validando ...')}
                                className='btn-primary px-5 py-2.5 mb-2 w-full text-[16px]'>
                                Confirmar
                            </button>}
                        {openModalDescription && <ModalDescAssig renders={renders} meeting={null} teacherCards={teacherCards} openPay={openPlan} openButton={setopenModalDescription} setDescription={setDescription} />}
                        {OpenP && <Plan Confirm={Confirm} newMeeting={newMeeting} closePlan={closePlan} />}

                        {
                            !isPaymentConfirmed && isAfter(selectedDay, today) && teacherCards?.calendar?.some(meeting => isSameDay(parseISO(meeting.startDatetime), selectedDay) && !meeting.assigned) &&
                            <div>

                                {/* Modal de Pago habilitacion*/}
                                <ModalPagoABLE
                                    close={closePayModal}
                                    modalPay={handleChangePaypalModal}
                                    open={PayModal}
                                    open1={openPaypalModal}
                                    open2={openZelleModal}
                                />
                            </div>
                        }

                        {
                            !isPaymentConfirmed && isAfter(selectedDay, today) && teacherCards?.calendar?.some(meeting => isSameDay(parseISO(meeting.startDatetime), selectedDay) && !meeting.assigned) &&
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
                            !isPaymentConfirmed && isAfter(selectedDay, today) && teacherCards?.calendar?.some(meeting => isSameDay(parseISO(meeting.startDatetime), selectedDay) && !meeting.assigned) &&
                            <div>

                                {/* Modal de Pago ZELLE*/}
                                <ModalPago2
                                    // onPaymentSuccess={handlePaymentSuccess1}
                                    onPaymentCancel={handlePaymentCancel}
                                    modalClose={closeZelleModal}
                                    renders={renders}
                                    teacherCards={teacherCards}
                                    open={ZelleModal}
                                    dates={paypalDates}
                                    newMeeting={newMeeting}
                                />
                            </div>
                        }

                    </ul>

                    : null}
            </div>
            {renders?.user?.role === 'guide' ? <>guia</> : null /*{deltaTime} */}
            {renders?.user?.role === 'teacher' ? <>teacher</> : null}

        </section>
    )
}
