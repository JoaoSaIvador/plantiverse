import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://localhost:5000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
