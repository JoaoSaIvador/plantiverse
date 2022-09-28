import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


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
                <Nav.Link href="/create_product">Create Product</Nav.Link>
                <Nav.Link href="/category">Categories</Nav.Link>
            </>
        );
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='w-100 py-2 customNavBar'>
            <Container>
                <Navbar.Brand href="/">Plantiverse</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto align-items-center">
                        <Nav.Link href="/">{isAdmin ? 'Products' : 'Shop'}</Nav.Link>
                        {isAdmin && adminRouter()}
                        {isLogged && <Nav.Link href="/history">History</Nav.Link>}
                    </Nav>

                    <Nav className='align-items-center'>
                        {
                            isLogged ? <Nav.Link href="/" onClick={logoutUser} className="me-3">Logout</Nav.Link> : <Nav.Link href="/login" className="me-3">Login/Register</Nav.Link>
                        }

                        {
                            isAdmin ? '' :
                                <div className='cart-icon'>
                                    <span>{cart.length}</span>
                                    <Link to="/cart">
                                        <ShoppingCartIcon sx={{ fontSize: 30 }} />
                                    </Link>
                                </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;