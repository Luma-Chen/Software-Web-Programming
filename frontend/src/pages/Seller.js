import React from "react";
import Navbar from "../components/navbar";
import Jumbotron from "../components/jumbotron";
import loading from "../images/loading.gif";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSellersById } from "../slices/SellerSlice";
import Footer from "../components/footer";


//TODO tornar para uma perfil so accesivel para vendedores
//TODO quando tentar accesa redereciona para cadastro de perfil vendedor
export default function Seller() {
  let { id } = useParams();
  const seller = useSelector((state) => selectSellersById(state, id));
  const status = useSelector((state) => state.sellers.status);
  const error = useSelector((state) => state.sellers.error);
  if (status === "loading") {
    return (
      <p className="h6 text-center">
        {" "}
        <img
          src={loading}
          width="15"
          height="15"
          className="d-inline-block align-top"
          alt=""
        />{" "}
        Carregando informações do vendedor...
      </p>
    );
  } else if (status === "failed") {
    return <p className="h6 text-center">Error: {error}</p>;
  }

  return (
    <>
      <Navbar />
      <Jumbotron title={"Vendedor"} text={seller.name} />
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-sm-6">
            <form class="needs-validation" novalidate>
              <div class="row">
                <div class="col-sm">
                  <Link to={`/sellerForm/${seller.id}`}>
                    <p>Editar</p>
                  </Link>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">
                    <b>Nome</b>
                  </label>
                  <p>{seller.name}</p>
                </div>

                <div class="form-group col-md-6">
                  <label for="inputPassword4">
                    <b>E-mail</b>
                  </label>
                  <p>{seller.email}</p>
                </div>
              </div>

              <div class="form-group">
                <label for="inputAddress">
                  <b>Endereço</b>
                </label>
                <p>{seller.street}</p>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputCPF">
                    <b>CPF</b>
                  </label>
                  <p>{seller.document}</p>
                </div>

                <div class="form-group col-md-2">
                  <label for="inputNumberDDD">
                    <b>DDD</b>
                  </label>
                  <p>{seller.ddd}</p>
                </div>

                <div class="form-group col-md-4">
                  <label for="inputNumber">
                    <b>Telefone Celular</b>
                  </label>
                  <p>{seller.number}</p>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-5">
                  <label for="inputBairro">
                    <b>Bairro</b>
                  </label>
                  <p>{seller.district}</p>
                </div>

                <div class="form-group col-md-5">
                  <label for="inputCity">
                    <b>Cidade</b>
                  </label>
                  <p>{seller.city}</p>
                </div>

                <div class="form-group col-md-2">
                  <label for="inputEstado">
                    <b>Estado</b>
                  </label>
                  <p>{seller.state}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      &nbsp;
      <Footer></Footer>
    </>
  );
}
