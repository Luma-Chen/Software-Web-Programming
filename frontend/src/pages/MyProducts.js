import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/card";
import Navbar from "../components/navbar";
import logo from "../images/logo2.png";
import loading from "../images/loading.gif"
import { fetchMyproducts, fetchProducts, selectAllProducts } from "../slices/ProductsSlice";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import Jumbotron from "../components/jumbotron";

export default function Home(props) {
  //const products = useSelector(state=>state.products)
  const products = useSelector(selectAllProducts)
  const status = useSelector(state => state.products.status)
  const error = useSelector(state => state.products.error)
  const dispatch = useDispatch();


  //PEGAR TODOS OS PRODUTOS DO VENDEDOR LOGADO

  const renderProduct = (product) => {
    return (
      <React.Fragment>
        {product.status !== "reservado" && (
          <Card product={product} key={product.name} />
        )}
      </React.Fragment>
    );
  };

  useEffect(() => {
    if (status === 'saved') {
      dispatch(fetchMyproducts());
    }/*else if(status === 'not loaded'){
      setTimeout(() => dispatch(fetchProducts()), 5000)
    }*/
  }, [status, dispatch])

  let footerShow = '';
  let productList = '';
  if (status === 'loaded' || status === 'saved' || status === 'deleted') {
    productList = products.map(renderProduct);
    footerShow = <Footer></Footer>;
    if (productList === '' || (products.filter((product) => product.status === 'reservado')).length === products.length) {
      productList = <p className="h6 text-center">Sem produtos na lista.</p>;
    }
  } else if (status === 'loading') {
    productList = <p className="h6 text-center"> <img src={loading} width="30" height="30" className="d-inline-block " alt="" /> Carregando lista de produtos...</p>;
  } else if (status === 'failed') {
    productList = <p className="h6 text-center">Error: {error}</p>;
  }



  return (
    <>
      <Navbar />
      <Jumbotron title={"Meus produtos à venda"} text={""} />
      <div className='row justify-content-center'>
        <a className="">
          <Link to="/productForm/new">Criar anúncio</Link>
        </a>
      </div>
      <div class="container">
        <div className="row">{productList}</div>
      </div>
      &nbsp;
      {footerShow}
    </>
  );
}
