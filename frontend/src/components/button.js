import React from 'react'


export default function Button(props){
    return(
        <button className="btn m-1" style={{backgroundColor:""+props.color}} onClick={props.onClick}>{props.title}</button>
    );
}