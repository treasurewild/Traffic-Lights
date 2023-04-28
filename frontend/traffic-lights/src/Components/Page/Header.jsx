import React from 'react';
import logo from '../../Assets/Logo.svg';
import { Navbar } from 'react-bootstrap';


const Header = () => {
    return (
        <Navbar className="header navbar bg-light p-2">
            <Navbar.Brand className="navbar-brand" href="/">
                <img src={logo} alt="Logo" width="90" height="30" className="d-inline-block align-text-top" />
                Traffic Lights
            </Navbar.Brand>
        </Navbar>
    )
}

export default Header