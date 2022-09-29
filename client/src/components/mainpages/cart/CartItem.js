import React from 'react';
import Button from 'react-bootstrap/Button';

function CartItem({ product, removeProduct, decrement, increment }) {

    return (
        <tr>
            <td>
                <div className={'d-flex flex-row justify-content-between mt-5'}>
                    <img className='cart-item-img me-5' src={product.images.url} alt="" />
                    <div className='cart-item-info d-flex flex-column align-items-start justify-content-between'>
                        <div className='d-flex flex-column align-items-start justify-content-start'>
                            <h6 className='fs-3 mb-2'>{product.title}</h6>
                            <p className='cart-item-category fs-5'>{product.category}</p>
                        </div>
                        <Button className='cart-item-remove p-0' variant="link" onClick={() => removeProduct(product._id)}>Remove</Button>
                    </div>
                </div>
            </td>
            <td>
                <div className="cart-item-amount d-flex flex-row align-items-center justify-content-center m-5">
                    <button className='fs-2 d-flex justify-content-center align-items-center' onClick={() => decrement(product._id)}> - </button>
                    <span className='py-1 px-3 mx-2'>{product.quantity}</span>
                    <button className='fs-2 d-flex align-items-center' onClick={() => increment(product._id)}> + </button>
                </div>
            </td>
            <td>
                <div className='d-flex align-items-center justify-content-center m-5'>
                    <span className='fs-5'>{product.price}$</span>
                </div>
            </td>
            <td>
                <div className='d-flex align-items-center justify-content-center m-5'>
                    <span className='fs-5'>{product.price * product.quantity}$</span>
                </div>
            </td>
        </tr>
    );
}

export default CartItem;