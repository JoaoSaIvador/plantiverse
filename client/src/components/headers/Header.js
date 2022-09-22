import React, { useState, useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';


function Header() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;

    const logoutUser = async () => {
        await axios.get('/users/logout');
        localStorage.removeItem('firstLogin');
        window.location.href = "/";
    };

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        );
    };

    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        );
    };

    return (
        <header>
            <div className='menu'>
                <MenuIcon sx={{ fontSize: 40 }} />
            </div>

            <div className='logo'>
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'Plantiverse'}</Link>
                </h1>
            </div>

            <ul>
                <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login/Register</Link></li>
                }

                <li><CloseIcon sx={{ fontSize: 40 }} className="menu" /></li>
            </ul>

            {
                isAdmin ? '' :
                    <div className='cart-icon'>
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <ShoppingCartIcon sx={{ fontSize: 40 }} />
                        </Link>
                    </div>
            }


        </header>
    );
}

export default Header;