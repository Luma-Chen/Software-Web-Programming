import Navbar from "../components/navbar";
import Carrousel from "../components/carrousel";
import Jumbotron from "../components/jumbotron";
import heart from "../images/heart.png";
import loading from "../images/loading.gif";
import Button from "../components/button";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProductsServer,
  selectProductsById,
  updateProductsServer,
} from "../slices/ProductsSlice";
import { addBookingServer } from "../slices/BookingsSlice";
import Footer from "../components/footer";
import {selectAllUsers } from "../slices/UserSlice";

export default function Product() {
  const history = useHistory();
  let { id } = useParams();

  const product = useSelector((state) => selectProductsById(state, id));
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const login = useSelector(state => state.users.status)
  const user = useSelector(selectAllUsers)[0];
  const dispatch = useDispatch();

  let editButton = ""
  let cancelButton = ""
  if(user){
    editButton = (<div class="col-sm">
                    <Link to={`/productForm/${product.id}`}>
                      <p>Editar</p>
                    </Link>
                  </div>)
    cancelButton = (<Button
                   color={"Red"}
                   title={"Excluir"}
                   onClick={handleDelete}
                 />)

  }

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
        Carregando o produto...
      </p>
    );
  } else if (status === "failed") {
    return <p className="h6 text-center">Error: {error}</p>;
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
    return `${dia}/${mes}/${ano} ${hora} - `;
  }

  function handleReserve(e) {
    if (!(login === "logged_in")) {
      history.push("/login")
    }
    else {
      const booking = {
        idProduct: product.id,
        idSeller: product.idSeller.id,
        date: dataAtualFormatada(),
        status: "em andamento",
        messages: [],
      };
      dispatch(addBookingServer(booking));
      dispatch(updateProductsServer({ ...product, status: "reservado", idSeller: product.idSeller.id }));
      e.preventDefault();
      alert("Produto adicionado à lista de reserva.");
      history.push("/bookingList");
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteProductsServer(id));
    alert("Produto excluido!");
    history.push("/");
  }

  return (
    <>
      <Navbar />
      <Jumbotron title={product.name} text={"Anunciante: " + product.idSeller.name} />
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-sm-6">
            <div class="row d-flex justify-content-center">
              <Carrousel images={product.images} id={product.id} />
            </div>
          </div>

          <div class="col-sm-6">
            <form class="needs-validation" novalidate>
              <div class="row">
                {editButton}
              </div>

              <div class="row">
                <div class="col-sm">
                  <label>
                    <b>Título</b>
                  </label>
                  <p>{product.name}</p>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-6">
                  <label>
                    <b>Preço</b>
                  </label>
                  <p>
                    <span>R$ </span>
                    <span>{product.price}</span>
                  </p>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>
                      <b>Categoria</b>
                    </label>
                    <p>{product.category}</p>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm">
                  <div class="form-group">
                    <label>
                      <b>Descrição do anúncio</b>
                    </label>
                    <p style={{ "word-wrap": "break-word" }}>
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <Link to={"/wishList"}>
                    <img
                      src={heart}
                      width="25"
                      height="25"
                      class="d-inline-block "
                      alt=""
                      title="Lista de Desejos"
                    />
                  </Link>
                </div>
                <div class="col">
                  <Button
                    color={"LightGreen"}
                    title={"Reservar"}
                    onClick={handleReserve}
                  />
                  {cancelButton}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      &nbsp;
      <div class="d-flex shadow p-3 mb-5 bg-white rounded bd-highlight justify-content-center">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <p>
              <b>Vendedor: </b>
              {product.idSeller.name}
            </p>
          </div>
          <div class="row d-flex justify-content-center">
            <p>
              <b>Bairro: </b>
              {product.idSeller.district}
            </p>
          </div>
          <div class="row d-flex justify-content-center">
            <p>
              <b>Telefone: </b>
              {product.idSeller.ddd + product.idSeller.number}
            </p>
          </div>
          <div class="row d-flex justify-content-center">
            <p>
              <b>E-mail: </b>
              {product.idSeller.email}
            </p>
          </div>
        </div>
      </div>
      &nbsp;
      <Footer></Footer>
    </>
  );
}
