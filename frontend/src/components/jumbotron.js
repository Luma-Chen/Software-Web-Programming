import React from 'react';

export default function Jumbotron(props) {
  return(
    <>
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container">
          <h1 className="display-6" style={{color:"purple"}}> { props.title } </h1>
          <p className="lead">{props.text}</p>
        </div>
      </div>
    </>
  );
}