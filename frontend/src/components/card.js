import React from 'react';
import { Link } from 'react-router-dom';
import heart from '../images/heart.png'
import Carrousel from './carrousel'


export default function Card(props) {
    return(
        <>
        <div className="col-sm-4 d-flex justify-content-center">
            <div className="card shadow-lg p-3 mb-5 bg-white rounded bd-highlight justify-content-center" style={{width: 20+'rem'}}>
                <div className="text-center">
                    <Carrousel images={props.product.images} id={props.product.id} />
                </div>
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/product/${props.product.id}`} title={props.product.name} >{(props.product.name).substring(0,22)}</Link></h5>
                    <h6 className="card-title"><span className="text-right" style={{"color":"green"}}> R${props.product.price}</span></h6>
                    <p className="card-text">{(props.product.description).substring(0,135)}</p>
                    <div className="row">
                        <div className="col">
                            <h6><b>{props.product.category}</b></h6>
                        </div>
                        <div className="col-2 align-middle">
                            <Link  to={"/WishList"} > 
                                <img src={heart} width="15" height="15" className="d-inline-block align-top" alt=""/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     
      </>
    );
}