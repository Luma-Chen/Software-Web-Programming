import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Jumbotron from "../components/jumbotron";
import Carrousel from "../components/carrousel";
import Chat from "../components/chat";
import Button from "../components/button";
import loading from "../images/loading.gif";
import { useParams, useHistory } from "react-router";
import {
  deleteBookingServer,
  fetchBookings,
  selectBookingById,
  updateBookingServer,
} from "../slices/BookingsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProductsServer,
} from "../slices/ProductsSlice";
import { messageSchema } from "./MessageSellerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { selectSellersById } from "../slices/SellerSlice";
import Footer from "../components/footer";
import Modal from "../components/modal";
import { selectAllUsers } from "../slices/UserSlice";



export default function Booking() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(messageSchema),
    defaultValues: { response: "" },
  });
  const history = useHistory();
  let { id } = useParams();
  const dispatch = useDispatch();
  var [booking] = useState(useSelector((state) => selectBookingById(state, id)));
  var seller = useSelector((state) =>
    selectSellersById(state, booking.idProduct.idSeller)
  );

  useEffect(() => {
    async function getData() {
      return await dispatch(fetchBookings)
    }
    getData()
    if (isSubmitSuccessful) {
      reset({ response: "" });
    }
  }, [isSubmitSuccessful, reset, dispatch]);
  const user = useSelector(selectAllUsers)[0].id
  const status = useSelector((state) => state.bookings.status);
  const error = useSelector((state) => state.bookings.error);
  const isBuyer = (booking.idBuyer._id === user)
  let userType;
  if (isBuyer) {
    userType = "Comprador";
  } else {
    userType = "Vendedor"
  }
  if (status === "loading") {
    return (
      <p className="h6 text-center">
        {" "}
        <img
          src={loading}
          width="30"
          height="30"
          className="d-inline-block"
          alt=""
        />{" "}
        Carregando a reserva...
      </p>
    );
  } else if (status === "failed") {
    return (
      <p className="h6 text-center">
        Error: {error}
      </p>
    );
  }

  function dataAtualFormatada() {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    let data = new Date(),
      dia = data.getDate().toString().padStart(2, "0"),
      mes = (data.getMonth() + 1).toString().padStart(2, "0"),
      ano = data.getFullYear(),
      hora = [data.getHours(), data.getMinutes()].map(pad).join(":");
    return ` ${hora}  -  ${dia}/${mes}/${ano}   -  `;
  }

  let carregando = "";
  if (status === "loading2") {
    carregando = (
      <p>
        <img
          src={loading}
          width="15"
          height="15"
          className="d-inline-block align-top"
          alt=""
        />{" "}
        Enviando a mensagem...
      </p>
    );
  }

  let buttonConclude = "";
  let buttonCancel = "";
  let inputTextArea = "";
  let buttonPost = "";

  if (booking) {
    if (booking.status !== "fechado") {
      buttonConclude = (
        <Button
          color="LightGreen"
          title={"Concluir Reserva"}
          onClick={handleConclude}
        />
      );
      buttonCancel = (
        <Button color="red" title={"Cancelar Reserva"} onClick={handleDelete} data-toggle="modal" data-target="#cancelar" />
      );
      inputTextArea = (
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          name="response"
          rows="3"
          {...register("response")}
        ></textarea>
      );
      buttonPost = (
        <div className="row justify-content-center">
          <Button color={"purple"} title={"Responder"} type="submit" />
        </div>
      );
    }
  }

  function handleDelete(e) {
    //bookings.splice(product.id,1)
    //setProduct([...bookings])
    e.preventDefault();
    dispatch(deleteBookingServer(id));
    dispatch(updateProductsServer({ ...booking.idProduct, status: "aberto" }));
    history.push("/bookingList");
  }
  function handleConclude(event) {
    event.preventDefault();
    dispatch(updateBookingServer({ ...booking, status: "fechado" }));
    history.push("/bookingList");
    //desabilitar botões disabled
  }

  function onSubmit(response) {
    const newMessage = {
      userType: userType,
      userName: booking.idSeller.name,
      date: dataAtualFormatada(),
      message: response.response,
    };
    var newMessagesArray = booking.messages.concat([{ ...newMessage }]);
    dispatch(updateBookingServer({ ...booking, messages: newMessagesArray, idBuyer: booking.idBuyer_id, idSeller: booking.idSeller.id, idProduct: booking.idProduct.id }));
  }

  return (
    <>
      <Navbar />
      <Jumbotron
        title={`Código Reserva: ${booking.id.substring(16, 24)} - ${booking.status
          }`}
        text={" "}
      />
      <div className="container justify-content-md-center">
        <div className="row justify-content-center ">
          <div className="col justify-content-center ">
            <div className="row justify-content-center">
              <div className="justify-content-center">
                <Carrousel images={booking.idProduct.images} id={booking.id} />
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-md-6 custom-file"></div>
            </div>
          </div>
          <div className="col">
            <div className="form-row">
              <div className="col-md-7 mb-3">
                <label for="validationTooltip01">
                  <h2>
                    <b>{booking.idProduct.name}</b>
                  </h2>
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label>
                  <b>Preço: </b>
                </label>
                <label> R${booking.idProduct.price}</label>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label>
                  <b>Categoria: </b>
                </label>
                <label>{booking.idProduct.category}</label>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-7 mb-3">
                <label>
                  <b>Descrição: </b>
                </label>
                <label>{booking.idProduct.description}</label>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-7  mb-3">
                {buttonConclude}
                <Modal warning="Reserva concluída com sucesso!" id="concluir" />
                {buttonCancel}
                <Modal warning="Reserva cancelada." id="cancelar" />
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <p style={{ fontSize: 15 }}>
            {" "}
            <b>Vendedor:</b> {booking.idSeller.name}{" "}
          </p>
        </div>
        <div className="row justify-content-center">
          <p style={{ fontSize: 15 }}>
            {" "}
            <b>Telefone:</b> {booking.idSeller.ddd + booking.idSeller.number}{" "}
          </p>
        </div>
        <div className="row justify-content-center">
          <p style={{ fontSize: 15 }}>
            {" "}
            <b>Email:</b> {booking.idSeller.email}{" "}
          </p>
        </div>
      </div>
      <div className="container">
        <div className="col">
          <Chat messages={booking.messages} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {carregando}
              {inputTextArea}
            </div>
            <p style={{ color: "red" }}>{errors?.response?.message}</p>
            &nbsp;
            {buttonPost}
          </form>
        </div>
      </div>
      &nbsp;
      <Footer></Footer>
    </>
  );
}
