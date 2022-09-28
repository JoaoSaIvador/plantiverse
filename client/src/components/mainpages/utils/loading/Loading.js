import React from 'react';
import './loading.css';

function Loading() {
    return (
        <div className='loader-container w-100 h-100 d-flex justify-content-center align-items-center'>
            <div className='spinner'></div>
        </div>
    );
}

export default Loading;