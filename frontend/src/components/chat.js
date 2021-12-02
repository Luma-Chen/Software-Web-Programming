import React from 'react';


export default function Chat({ messages }) {
    return( 
        <>
            <div className="col">
                {messages.map(message => {
                    return (
                            <div className="d-flex shadow p-3 mb-5 bg-white rounded bd-highlight justify-content-start">
                                <h4>
                                    <p style={{fontSize: 15}}> {message.date} <b>{message.userType}</b>: {message.userName } </p>
                                    <p style={{fontSize: 15}}> {message.message } </p>
                                </h4>
                            </div>
                    )
                })}
            </div>
        </>
    );
}