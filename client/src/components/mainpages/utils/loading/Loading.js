import React from 'react';
import './loading.css';

function Loading() {
    return (
        <div className='loader-container d-flex justify-content-center align-items-center'>
            <div className='spinner'></div>
        </div>
    );
}

export default Loading;