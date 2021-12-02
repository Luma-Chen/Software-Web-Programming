import { Link } from "react-router-dom";
import { React } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegisterSchema } from "./UserRegisterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addUserServer } from "../slices/UserSlice";
import "../styles.css";
import logo2 from "../images/logo2.png";

export default function UserRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegisterSchema),
  });

  const dispatch = useDispatch();
  const history = useHistory();

  function onSubmit(user) {
    console.log("Funcionando")
    dispatch(
      addUserServer({
        userName: user.userName,
        password: user.password,
        name: user.name
      })
    );
    alert("Cadastrado com sucesso!");
    history.push("/login");
  }

  function cancelButton(e) {
    e.preventDefault();
    history.push("/");
  }

  return (
    <>
      <title>Cadastro Usuário</title>

      <link rel="stylesheet" type="text/css" href={`../styles.css`} />

      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous"
      />

      <div className="container">
        <div className="card card-container">
          <img
            id="profile-img"
            className="profile-img-card"
            src={logo2}
            alt=""
          />
          <p id="profile-name" className="profile-name-card">
            Cadastre-se
          </p>
          <form class="form-signin" onSubmit={handleSubmit(onSubmit)}>
            <span id="reauth-email" className="reauth-email"></span>
            <input
              type="text"
              id="nome"
              className="form-control"
              placeholder="Nome"
              name="name"
              {...register("name")}
              required
              autofocus
            />
            <p style={{ color: "red" }}>{errors.name?.message}</p>
            <input
              type="text"
              id="nome"
              className="form-control"
              placeholder="E-mail"
              name="userName"
              {...register("userName")}
              required
              autofocus
            />
            <p style={{ color: "red" }}>{errors.userName?.message}</p>
            <input
              type="password"
              id="senha"
              className="form-control"
              placeholder="Senha"
              name="password"
              {...register("password")}
              required
              autofocus
            />
            <p style={{ color: "red" }}>{errors.password?.message}</p>
            <input
              type="password"
              id="senhaConfirmar"
              className="form-control"
              placeholder="Confirmar Senha"
              name="confirmPassword"
              {...register("confirmPassword")}
              required
            />
            <p style={{ color: "red" }}>
              {errors.confirmPassword
                ? "As senhas devem ser iguais e com pelo menos 6 caracteres."
                : ""}
            </p>
            <button type="button" className="btn btn-link">
              <Link to="/login">Já possuo login.</Link>
            </button>
            <button className="btn  btn-primary btn-signin" type="submit">
              Cadastrar
            </button>
            <button
              className="btn  btn-primary btn-signin"
              type="submit"
              onClick={(e) => cancelButton(e)}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
