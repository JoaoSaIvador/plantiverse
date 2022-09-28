import React from 'react';
import BtnRender from './BtnRender';
import Card from 'react-bootstrap/Card';

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {

    return (
        <Card className='mb-4'>
            {
                isAdmin && <input type="checkbox" className='custom-checkbox' checked={product.checked} onChange={() => handleCheck(product._id)} />
            }
            <Card.Img variant="top" src={product.images.url} className="card-img" />
            <Card.Body>
                <Card.Title>{product.title[0].toUpperCase() + product.title.substring(1)}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{product.price}$</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <BtnRender product={product} deleteProduct={deleteProduct} />
            </Card.Body>
        </Card>
    );
}

export default ProductItem;