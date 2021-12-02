import { React, useState } from "react";
import Navbar from "../components/navbar";
import Jumbotron from "../components/jumbotron";
import Button from "../components/button";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  addSellersServer,
  selectSellersById,
  updateSellersServer,
} from "../slices/SellerSlice";
import { sellerSchema } from "./MessageSellerSchema";
import Footer from "../components/footer";

export default function SellerRegister(props) {
  let { id } = useParams();
  const sellerFound = useSelector((state) => selectSellersById(state, id));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sellerSchema),
  });
  const [newSeller] = useState(
    id ? sellerFound ?? sellerSchema.cast({}) : sellerSchema.cast({})
  );

  const [actionType] = useState(
    id
      ? sellerFound
        ? "sellerForm/updateSeller"
        : "sellerForm/addSeller"
      : "sellerForm/addSeller"
  );
  let inputName = "";
  let inputEmail = "";
  let inputDocument = "";
  if (actionType === "sellerForm/updateSeller") {
    inputName = (
      <input
        type="text"
        name="name"
        class="form-control"
        id="inputEmail4"
        placeholder="Nome do vendedor"
        readonly="readonly"
        defaultValue={newSeller.name}
        {...register("name")}
      />
    );
    inputEmail = (
      <input
        type="email"
        name="email"
        class="form-control"
        id="inputPassword4"
        placeholder="E-mail"
        readonly="readonly"
        defaultValue={newSeller.email}
        {...register("email")}
      />
    );
    inputDocument = (
      <input
        type="text"
        name="document"
        class="form-control"
        id="inputCPF"
        placeholder="Digite seu CPF com pontos e traços"
        readonly="readonly"
        defaultValue={newSeller.document}
        {...register("document")}
      />
    );
  } else {
    inputName = (
      <input
        type="text"
        name="name"
        class="form-control"
        id="inputEmail4"
        placeholder="Nome do vendedor"
        defaultValue={newSeller.name}
        {...register("name")}
      />
    );
    inputEmail = (
      <input
        type="email"
        name="email"
        class="form-control"
        id="inputPassword4"
        placeholder="E-mail"
        defaultValue={newSeller.email}
        {...register("email")}
      />
    );
    inputDocument = (
      <input
        type="text"
        name="document"
        class="form-control"
        id="inputCPF"
        placeholder="Digite seu CPF com pontos e traços"
        defaultValue={newSeller.document}
        {...register("document")}
      />
    );
  }
  //const products = useSelector(state => state.products)
  const dispatch = useDispatch();
  const history = useHistory();

  function onSubmit(newSeller) {
    if (actionType === "sellerForm/addSeller") {
      dispatch(addSellersServer(newSeller));
      alert("Vendedor cadastrado com sucesso!");
    } else {
      dispatch(updateSellersServer({ ...newSeller, id: sellerFound.id }));
      alert("Vendedor atualizado com sucesso!");
    }
    history.push("/");
  }

  function cancelButton(e) {
    e.preventDefault();
    history.push("/");
  }

  return (
    <>
      <Navbar />
      <Jumbotron title={props.title} text={" "} />
      <div class="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Nome</label>
              {inputName}
              <p style={{ color: "red" }}>{errors.name?.message}</p>
            </div>

            <div class="form-group col-md-6">
              <label for="inputPassword4">E-mail</label>
              {inputEmail}
              <p style={{ color: "red" }}>{errors.email?.message}</p>
            </div>
          </div>

          <div class="form-group">
            <label for="inputAddress">Endereço</label>
            <input
              type="text"
              name="street"
              class="form-control"
              id="inputAddress"
              placeholder="Rua, avenida..."
              defaultValue={newSeller.street}
              {...register("street")}
            />
            <p style={{ color: "red" }}>{errors.street?.message}</p>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCPF">CPF</label>
              {inputDocument}
              <p style={{ color: "red" }}>{errors.document?.message}</p>
            </div>

            <div class="form-group col-md-2">
              <label for="inputNumberDDD">DDD</label>
              <input
                type="number"
                name="ddd"
                class="form-control"
                id="inputNumberDDD"
                placeholder="Somente números"
                defaultValue={newSeller.ddd}
                {...register("ddd")}
              />
              <p style={{ color: "red" }}>
                {errors?.ddd
                  ? "Este campo é obrigatório e deve ser um número"
                  : ""}
              </p>
            </div>

            <div class="form-group col-md-4">
              <label for="inputNumber">Telefone Celular</label>
              <input
                type="number"
                name="number"
                class="form-control"
                id="inputNumber"
                placeholder="Somente números"
                defaultValue={newSeller.number}
                {...register("number")}
              />
              <p style={{ color: "red" }}>{errors.number?.message}</p>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-5">
              <label for="inputBairro">Bairro</label>
              <input
                type="text"
                name="district"
                class="form-control"
                id="inputBairro"
                defaultValue={newSeller.district}
                {...register("district")}
              />
              <p style={{ color: "red" }}>{errors.district?.message}</p>
            </div>

            <div class="form-group col-md-5">
              <label for="inputCity">Cidade</label>
              <input
                type="text"
                name="city"
                class="form-control"
                id="inputCity"
                defaultValue={newSeller.city}
                {...register("city")}
              />
              <p style={{ color: "red" }}>{errors.city?.message}</p>
            </div>

            <div class="form-group col-md-2">
              <label for="inputEstado">Estado</label>
              <input
                type="text"
                name="state"
                class="form-control"
                id="inputEstado"
                placeholder="Sigla do Estado"
                defaultValue={newSeller.state}
                {...register("state")}
              />
              <p style={{ color: "red" }}>{errors.state?.message}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-4 d-flex justify-content-center">
              <Button color={"purple"} title={"Cadastrar"} type="submit" />
            </div>
            <div class="col-4 d-flex justify-content-end">
              <Button
                color={"gray"}
                title={"Cancelar"}
                onClick={(e) => cancelButton(e)}
              />
            </div>
          </div>
        </form>
      </div>
      &nbsp; &nbsp;
      <Footer></Footer>
    </>
  );
}
