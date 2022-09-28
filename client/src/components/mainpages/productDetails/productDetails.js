import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import Button from 'react-bootstrap/Button';

function ProductDetails() {
    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const addCard = state.userAPI.addCard;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        if (params.id) {

            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product);
            });
        }
    }, [params.id, products]);

    if (detailProduct.length === 0) {
        return null;
    };

    return (
        <>
            <div className="main-div d-flex flex-row justify-content-center flex-wrap mx-3 mb-5">
                <img src={detailProduct.images.url} alt="" className='w-100 my-3 me-5 product-details-img' />
                <div className="w-100 m-3 d-flex flex-column justify-content-between product-details">
                    <div className='d-flex flex-column'>
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <h2 className='text-uppercase fs-1'>{detailProduct.title}</h2>
                            <h6>#id: {detailProduct.product_id}</h6>
                        </div>

                        <span className='fs-4 fw-bold'>$ {detailProduct.price}</span>

                        <h6 className='mt-3 mb-0 fs-5'>Description</h6>
                        <p className='m-0'>{detailProduct.description}</p>

                        <h6 className='mt-3 mb-0 fs-5'>Species</h6>
                        <p className='mt-0 mb-3'>{detailProduct.content}</p>
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <p>Sold: {detailProduct.sold}</p>
                        <Button className='product-details-btn' variant="dark" href="/cart" onClick={() => { addCard(detailProduct); }}>Add to Cart</Button>
                    </div>
                </div>
            </div>

            <div className='main-div d-flex flex-column align-items-center my-5'>
                <h2 className='mb-4'>Related Products</h2>
                <div className="w-100 mb-3 products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category
                                ? <ProductItem key={product._id} product={product} /> : null;
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default ProductDetails;