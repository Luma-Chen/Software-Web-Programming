import { React } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAllUsers } from "../slices/UserSlice";
import { useHistory } from "react-router";
import Modal from "../components/modal";
import Button from "../components/button";

export default function Dropdown(props) {
  const dispatch = useDispatch()
  const history = useHistory()

  function handleLogOut(e) {
    dispatch(logout())
    history.push("/")
  }

  const user = useSelector(selectAllUsers)[0];
  var logoutDisabled = {};
  var beASellerDisabled = {};
  var anunciosDisabled = { display: "none" }
  var cadastrarDisabled = {}
  let avatar = {}
  const redirect = () => history.push("/login");
  if (user) {
    avatar = <div>  {user.name} </div>
    cadastrarDisabled = { display: "none" }
    if (user.isSeller) {
      beASellerDisabled = { display: "none" }
      anunciosDisabled = {};
    }
  }
  else {
    avatar = <Button color={"purple"} title={"Login"} onClick={redirect} />
    logoutDisabled = { display: "none" }
    beASellerDisabled = { display: "none" }
  }
  console.log({ beASellerDisabled, anunciosDisabled, logoutDisabled })

  //DESABILITAR LOGIN E CADASTRAR-SE QUANDO LOGADO
  //DESABILITAR LOGOUT QUANDO NAO LOGADO
  //DESABILITAR TORNAR-SE UM VENDEDOR QUANDO JÁ FOR UM VENDEDOR E ESTIVER DESLOGADO
  //DESABILITAR CRIAR ANUNCIO E MEUS ANUNCIOS QUANDO TIVER DESLOGADO E NAO FOR VENDEDOR
  //DESABILITAR LISTA DE RESERVA QUANDO TIVER DESLOGADO

  return (
    <>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <div>
          {avatar}
        </div>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link"
              id="navbarDropdownMenuLink"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {props.menu}
            </button>
            <div
              className="dropdown-menu pull-left"
              style={{ right: "0", left: "auto" }}
              aria-labelledby="navbarDropdownMenuLink"
            >
              <button className="dropdown-item btn btn-link" type="button" style={logoutDisabled}>
                <Link to="/bookingList">Lista de Reservas</Link>
              </button>
              <button className="dropdown-item btn btn-link" type="button" style={cadastrarDisabled}>
                <Link to="/userRegister">Cadastrar-se</Link>
              </button>
              <button className="dropdown-item btn btn-link" type="button" style={anunciosDisabled}>
                <Link to="/productForm/new">Criar anúncio</Link>
              </button>
              <button className="dropdown-item btn btn-link" type="button" style={anunciosDisabled}>
                <Link to="/myProducts">Meus anúncios</Link>
              </button>
              <button className="dropdown-item btn btn-link" style={beASellerDisabled}>
                <Link to="/sellerProfile">Tornar-me Vendedor</Link>
              </button>
              <button className="dropdown-item btn btn-link" type="button" style={anunciosDisabled}>
                <Link to="/seller">Perfil Vendedor</Link>
              </button>
              <button className="dropdown-item" onClick={handleLogOut} style={logoutDisabled}>
                <Link to="/">Sair</Link>
              </button>
              <Modal warning="Obrigado por usar o Brechó Virtual." id="logout" />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

//<a className="dropdown-item">
                //<Link to="/seller/6147b3288bb39ea8acd78dbc">
                //  Perfil Vendedor
               // </Link>
            //  </a>

