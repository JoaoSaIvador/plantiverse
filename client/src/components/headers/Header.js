import React, { useState, useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function Header() {
    const value = useContext(GlobalState)

    return (
        <header>
            <div className='menu'>
                <MenuIcon sx={{ fontSize: 40 }} />
            </div>

            <div className='logo'>
                <h1>
                    <Link to="/">
                        Plantiverse
                    </Link>
                </h1>
            </div>

            <ul>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/login">Login/Register</Link></li>
                <li><CloseIcon sx={{ fontSize: 40 }} className="menu" /></li>
            </ul>

            <div className='cart-icon'>
                <span>0</span>
                <Link>
                    <ShoppingCartIcon sx={{ fontSize: 40 }} />
                </Link>
            </div>
        </header>
    )
}

export default Header