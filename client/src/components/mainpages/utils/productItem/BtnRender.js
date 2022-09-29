import React, { useContext } from 'react';
import { GlobalState } from '../../../../GlobalState';
import Button from 'react-bootstrap/Button';

function BtnRender({ product, deleteProduct }) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;


    return (
        <div className="d-flex flex-row justify-content-center">
            {
                isAdmin ?
                    <>
                        <Button variant="dark" className='me-3 custom-btn' to="#!" onClick={() => deleteProduct(product._id, product.images.public_id)}>Delete</Button>
                        <Button variant="dark" className='custom-btn' href={`/edit_product/${product._id}`}>Edit</Button>
                    </>
                    : <>
                        <Button variant="dark" className='me-3 custom-btn' to="#!" onClick={() => addCart(product)}>Buy</Button>
                        <Button variant="dark" className='custom-btn' href={`/details/${product._id}`}>View</Button>
                    </>
            }

        </div>
    );
}

export default BtnRender;