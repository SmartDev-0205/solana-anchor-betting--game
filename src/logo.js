import React from 'react';

import logo from './images/logo.png';
import '../src/App.css';
const Logo = () => {
    return (
        <div >
			<img src={logo} alt="Logo"  className='logo'/>
        </div>
    );
};

export default Logo;