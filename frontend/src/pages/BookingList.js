import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import Jumbotron from "../components/jumbotron";
import BookingBar from "../components/bookingBar";
import { useDispatch, useSelector } from "react-redux";
import { selectALLBookings, fetchBookings } from "../slices/BookingsSlice";
import loading from '../images/loading.gif'
import Footer from "../components/footer";
import { useHistory } from "react-router";


//FILTRAR LISTA POR STATUS E COMPRADOR/VENDEDOR

export default function BookingList() {
  const bookings = useSelector(selectALLBookings);
  const error = useSelector(state => state.bookings.error)
  const dispatch = useDispatch()
  const status = useSelector(state => state.bookings.status);
  const login = useSelector(state => state.users.status)
  const history = useHistory()
  let bookingListOpen = '';
  let bookingListClosed = '';

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch]);

  if (!(login === "logged_in")) {
    history.push("/login")
  }
  else if (status === 'loaded' || status === 'saved' || status === 'deleted' || status === 'updated') {
    bookingListOpen = bookings.map((booking) => {
      return (
        <React.Fragment>
          {booking.status === "em andamento" && (
            <BookingBar key={booking.id} booking={booking} />
          )}
        </React.Fragment>
      );
    })
    bookingListClosed = bookings.map((booking) => {
      return (
        <React.Fragment>
          {booking.status === "fechado" && (
            <BookingBar key={booking.id} booking={booking} />
          )}
        </React.Fragment>
      );
    })
  } else if (status === 'loading') {
    bookingListClosed = <div><img src={loading} width="30" height="30" className="d-inline-block" alt="" />Carregando lista de reservas concluidas...</div>
    bookingListOpen = <div><img src={loading} width="30" height="30" className="d-inline-block" alt="" />Carregando lista de reservas em aberto...</div>
  }
  else if (status === 'failed') {
    bookingListClosed = <div>Error : {error}</div>
    bookingListOpen = <div>Error : {error}</div>
  }

  if (bookingListOpen === '') {
    bookingListOpen = <p className="h6 text-center">Sem reservas em andamento.</p>;
  }
  if (bookingListClosed === '') {
    bookingListClosed = <p className="h6 text-center">Sem reservas concluídas.</p>;
  }

  return (
    <>
      <Navbar />
      <Jumbotron title={"Lista de Reservas"} text={"Reservas em andamento"} />
      <div className="container">
        <div className="col">
          {bookingListOpen}
        </div>
      </div>
      <Jumbotron title={""} text={"Reservas concluídas"} />
      <div className="container">
        <div className="col">
          {bookingListClosed}
        </div>
      </div>
      &nbsp;
      <Footer></Footer>
    </>
  );
}