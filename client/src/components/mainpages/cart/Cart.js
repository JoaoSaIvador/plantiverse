import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import CartItem from './CartItem';

function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token;
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity);
            }, 0);

            setTotal(total);
        };

        getTotal();

    }, [cart]);

    const addToCart = async (cart) => {
        await axios.patch('/users/addcart', { cart }, {
            headers: { Authorization: token }
        });
    };

    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1;
            }
        });

        setCart([...cart]);
        addToCart(cart);
    };

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
            }
        });

        setCart([...cart]);
        addToCart(cart);
    };

    const removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1);
                }
            });

            setCart([...cart]);
            addToCart(cart);
        }
    };

    const buyNow = async () => {
        const address = {
            city: 'San Jose',
            country_code: 'US',
            line1: '1 Main St, San Jose',
            postal_code: '95131',
            recipient_name: 'John Doe',
            state: 'CA'
        };

        await axios.post('/api/payment', { cart, address, total }, {
            headers: { Authorization: token }
        });

        setCart([]);
        addToCart([]);
        alert("You have successfully placed an order.");
    };

    if (cart.length === 0) {
        return <h2 style={{ textAlign: "center" }}>There are 0 items in your cart</h2>;
    }

    return (
        <div style={{ width: '60%' }}>
            <div className='d-flex flex-row justify-content-between mb-3'>
                <h1>Shopping Cart</h1>
                <h3>{cart.length}  Items</h3>
            </div>

            <hr className='cart-hr' />

            <Table className='custom-table mb-5' responsive>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', color: '#7c7c7c' }}>PRODUCT DETAILS</th>
                        <th style={{ textAlign: 'center', color: '#7c7c7c' }}>QUANTITY</th>
                        <th style={{ textAlign: 'center', color: '#7c7c7c' }}>PRICE</th>
                        <th style={{ textAlign: 'center', color: '#7c7c7c' }}>SUBTOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((product, index) => (
                            <CartItem product={product} removeProduct={removeProduct} decrement={decrement} increment={increment} key={product._id} />
                        ))
                    }

                </tbody>
            </Table>

            <div className='d-flex flex-row'>
                <h3>Total: {total}$</h3>
                <Button variant="dark" className='d-flex align-items-center justify-content-center ms-3' style={{ width: '100px' }} onClick={buyNow}>Buy Now</Button>
            </div>
        </div>
    );
}

export default Cart;