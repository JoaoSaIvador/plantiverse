import React, { useContext } from 'react';
import { GlobalState } from '../../../../GlobalState';
import Button from 'react-bootstrap/Button';
import AddIcon from '@mui/icons-material/Add';

function BtnRender({ product, deleteProduct }) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;

    return (
        <div className="d-flex flex-row" style={isAdmin ? { justifyContent: "center" } : { justifyContent: "end" }}>
            {
                isAdmin ?
                    <>
                        <Button variant="dark" className='me-3 custom-btn' to="#!" onClick={() => deleteProduct(product._id, product.images.public_id)}>Delete</Button>
                        <Button variant="dark" className='custom-btn' href={`/edit_product/${product._id}`}>Edit</Button>
                    </>
                    : <>
                        <Button variant="dark" className='add-product-btn d-flex align-items-center justify-content-center' to="#!" onClick={() => addCart(product)}>
                            <AddIcon />
                        </Button>
                    </>
            }

        </div>
    );
}

export default BtnRender;