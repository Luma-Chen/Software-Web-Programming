import React from 'react';


export default function Carrousel(props){
    return(
        <>
            <div id={"carouselExampleControls"+props.id} className="carousel slide" data-ride="false">
                <div className="carousel-inner">
                  {props.images.map((image, index)=>{
                    if(index === 0){
                      return (
                            <div className="carousel-item active">
                                <img className="d-block w-100" src={image} width="350" height="350" alt="Primeiro Slide"/>
                            </div>)
                  }
                  else{
                    return (
                      <div className="carousel-item">
                          <img className="d-block w-100" src={image} width="350" height="350" alt="Primeiro Slide"/>
                      </div>)
                  }
                })}
                </div>
                <a className="carousel-control-prev" href={"#carouselExampleControls"+props.id} role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Anterior</span>
                </a>
                <a className="carousel-control-next" href={"#carouselExampleControls"+props.id} role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Próximo</span>
                </a>
            </div>
        </>
    );
}