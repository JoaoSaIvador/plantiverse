import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import Button from 'react-bootstrap/Button';

function LoadMore() {
    const state = useContext(GlobalState);
    const [page, setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;

    return (
        <div className="load_more">
            {
                result < page * 10 ? "" : <Button variant="outline-dark" className='mb-4 p-2' onClick={() => setPage(page + 1)}>Load More</Button>
            }
        </div>
    );
}

export default LoadMore;