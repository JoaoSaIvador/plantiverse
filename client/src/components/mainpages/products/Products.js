import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import Loading from '../utils/loading/Loading';
import axios from 'axios';
import Filters from './Filters';
import LoadMore from './LoadMore';
import Button from 'react-bootstrap/Button';


function Products() {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productsAPI.callback;
    const [loading, setLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked;
        });
        setProducts([...products]);
    };

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true);
            const destroyImg = axios.post('/api/destroy', { public_id }, {
                headers: { Authorization: token }
            });
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token }
            });

            await destroyImg;
            await deleteProduct;
            setCallback(!callback);
            setLoading(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const checkAll = () => {
        setIsCheck(!isCheck);
        products.forEach(product => {
            product.checked = !isCheck;
        });
        setProducts([...products]);
    };

    const deleteMultiple = () => {
        products.forEach(product => {
            if (product.checked) {
                deleteProduct(product._id, product.images.public_id);
            }
        });
    };

    if (loading) {
        return <div><Loading /></div>;
    }

    return (
        <>
            <div className="main-div d-flex flex-column justify-content-center align-content-center">
                <Filters />

                {
                    isAdmin &&
                    <div className="w-100 d-flex flex-row justify-content-start align-items-center mb-3">
                        <Button variant="dark" className='me-2' onClick={checkAll}>Select All</Button>
                        <Button variant="danger" onClick={deleteMultiple}>Delete</Button>
                    </div>
                }

                <div className="w-100 mb-3 products">
                    {
                        products.map(product => {
                            return <ProductItem key={product._id} product={product} isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />;
                        })
                    }
                </div>

                <LoadMore />
            </div>

            {products.length === 0 && <Loading />}
        </>
    );
}

export default Products;