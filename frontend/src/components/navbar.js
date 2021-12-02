import React from 'react';
import logo from '../images/logo2.png'
import Dropdown from './dropdown';
import Avatar from '../images/avatar.png'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#ccb5f7" }}>
                <a className="navbar-brand" href="index.html">
                    <Link to='/'><img src={logo} width="90" height="50" className="d-inline-block align-top" alt="" /></Link>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Alterna navegação">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Dropdown avatar={Avatar} menu={"Menu"} />
            </nav>
        </>
    );
}