import React from 'react';
import logo from '../images/logo.png'
import './Header.css'
const Header = () => {
    return (
        <div className='header'>
            <h1>This is header</h1>
            <img src={logo} alt="nai" />
        </div>
    );
};

export default Header;