import React from 'react'
import { Link } from 'react-router-dom'

export default function BookingBar({ booking }) {
    console.log(booking)
    return (
        <>
            <div class="d-flex shadow p-3 mb-5 bg-white rounded bd-highlight justify-content-start">
                <h4>
                    <img src={booking.idProduct.images[0]} width="40" height="40" alt="" />
                    <Link to={`/booking/${booking.id}`}> <span>{booking.idProduct.name}</span> - R$<span>{booking.idProduct.price}</span></Link>
                    &nbsp;
                    <p style={{ fontSize: 15 + 'px' }}>
                        <span><b>Vendedor: </b></span>
                        <span>{booking.idSeller.name}</span> - <span>{`${booking.idSeller.district}, ${booking.idSeller.city}`}</span>
                    </p>
                    <p style={{ fontSize: 15 + 'px' }}>
                        <span><b>Data de Reserva: </b></span>
                        <span>{booking.date}</span> - <span>
                            <b> Status: </b></span><span>{booking.status}</span>
                    </p>
                </h4>
            </div>
        </>
    )
}