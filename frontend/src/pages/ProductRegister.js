import { React, useState } from "react";
import Navbar from "../components/navbar";
import Jumbotron from "../components/jumbotron";
import Button from "../components/button";
import casaco from "../images/casaco.jpg";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductsServer,
  updateProductsServer,
  selectProductsById,
} from "../slices/ProductsSlice";
import { productSchema } from "./ProductSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Footer from "../components/footer";
import Modal from "../components/modal";
import { selectAllUsers } from "../slices/UserSlice";

export default function ProductRegister(props) {
  let { id } = useParams();
  const productFound = useSelector((state) => selectProductsById(state, id));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  const user = useSelector(selectAllUsers)[0]
  const dispatch = useDispatch();
  const history = useHistory();
  if (!user.isSeller) {
    history.push("/sellerProfile");
  }

  const [productOnLoad] = useState(
    id ? productFound ?? productSchema.cast({}) : productSchema.cast({})
  );
  const [actionType] = useState(
    id
      ? productFound
        ? "productForm/updateProduct"
        : "productForm/addProduct"
      : "productForm/addProduct"
  );

  //const products = useSelector(state => state.products)

  function onSubmit(newProduct) {
    if (actionType === "productForm/addProduct") {

      newProduct.status = "aberto";
      dispatch(addProductsServer(newProduct));
      alert("Produto cadastrado com sucesso!");
    } else {
      dispatch(updateProductsServer({ ...newProduct, id: productFound.id }));
      alert("Produto atualizado com sucesso!");
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
        <div class="row">
          <div class="col-sm-6">
            <label for="validationTooltip01">
              <b>URL da imagem</b>
            </label>
            <div class="row d-flex justify-content-center">
              <input
                type="text"
                class="form-control"
                placeholder="URL"
                name="images"
                defaultValue={productOnLoad.images}
                {...register("images")}
              ></input>
              <div style={{ color: "red" }}>{errors.images?.message}</div>
            </div>
          </div>

          <div class="col-sm-6">
            <form class="needs-validation" onSubmit={handleSubmit(onSubmit)}>
              <div class="row">
                <div class="col-sm">
                  <label for="validationTooltip01">
                    <b>Título</b>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationTooltip01"
                    placeholder="Título do anúncio"
                    name="name"
                    defaultValue={productOnLoad.name}
                    {...register("name")}
                  />
                  <p style={{ color: "red" }}>{errors.name?.message}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <label for="validationTooltipUsername">
                    <b>Preço</b>
                  </label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="validationTooltipUsernamePrepend"
                      >
                        R$
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      class="form-control"
                      id="validationTooltipUsername"
                      name="price"
                      placeholder="Preço do Produto"
                      defaultValue={productOnLoad.price}
                      {...register("price")}
                    />
                    <p style={{ color: "red" }}>
                      {errors?.price ? "Digite um valor para o preço." : ""}
                    </p>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">
                      <b>Categoria</b>
                    </label>
                    <select
                      class="form-control"
                      id="exampleFormControlSelect1"
                      name="category"
                      defaultValue={productOnLoad.category}
                      {...register("category")}
                    >
                      <option></option>
                      <option>Camisa</option>
                      <option>Casaco</option>
                      <option>Calça</option>
                      <option>Chapéu</option>
                      <option>Calçado</option>
                      <option>Cachecol</option>
                      <option>Vestido</option>
                      <option>Macacão</option>
                      <option>Óculos</option>
                      <option>Meia</option>
                      <option>Saia</option>
                      <option>Outros</option>
                    </select>
                    <p style={{ color: "red" }}>
                      {errors?.category ? "Selecione uma categoria" : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">
                      <b>Descrição do anúncio</b>
                    </label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="description"
                      placeholder="Descrição do anúncio"
                      defaultValue={productOnLoad.description}
                      {...register("description")}
                    ></textarea>
                    <p style={{ color: "red" }}>
                      {errors.description?.message}
                    </p>
                  </div>
                </div>
              </div>
              <br />
              &nbsp;
              <div class="row">
                <div class=" col-6 d-flex">
                  <Button
                    color={"purple"}
                    title={"Publicar"}
                    type="submit"
                    data-toggle="modal"
                    data-target="#modal"
                  />
                  <Modal
                    warning="Produto cadastrado/atualizado com sucesso!"
                    id="modal"
                  />
                </div>
                <div class="col-4 d-flex justify-content-end">
                  <Button
                    color={"gray"}
                    title={"Cancelar"}
                    onClick={(e) => cancelButton(e)}
                  />
                </div>
              </div>
              &nbsp;
            </form>
          </div>
        </div>
      </div>
      &nbsp;
      <Footer></Footer>
    </>
  );
}
