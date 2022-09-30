import React from 'react';
import { useNavigate } from 'react-router-dom';
import BtnRender from './BtnRender';
import Card from 'react-bootstrap/Card';

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
    const navigate = useNavigate();

    return (
        <Card className='mb-4 mx-4 custom-card' onClick={() => { navigate(`/details/${product._id}`); }}>
            {
                isAdmin && <input type="checkbox" className='custom-checkbox' checked={product.checked} onChange={() => handleCheck(product._id)} />
            }
            <Card.Img variant="top" src={product.images.url} className="card-img" />
            <Card.Body>
                <Card.Title>{product.title[0].toUpperCase() + product.title.substring(1)}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
                <div className='mb-3 mt-0 scroll fw-bold' style={{ maxHeight: "150px" }}>
                    <Card.Text>{product.price}$</Card.Text>
                </div>
                <BtnRender product={product} deleteProduct={deleteProduct} />
            </Card.Body>
        </Card>
    );
}

export default ProductItem;