import React, { useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrderHistory() {
    const state = useContext(GlobalState);
    const [history, setHistory] = state.userAPI.history;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;


    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: { Authorization: token }
                    });
                    setHistory(res.data);
                } else {
                    const res = await axios.get('/users/history', {
                        headers: { Authorization: token }
                    });
                    setHistory(res.data);
                }
            };
            getHistory();
        }
    }, [token, isAdmin, setHistory]);

    return (
        <div className="history-page">
            <h2>History</h2>
            <h4>You have {history.length} order(s)</h4>

            <table style={{ backgroundColor: "white" }}>
                <thead>
                    <tr>
                        <th>Date of Purchase</th>
                        <th>Total</th>
                        <th>Shipped To</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td>{items.total}$</td>
                                <td>{items.address.line1 + " - " + items.address.city}</td>
                                <td><Link to={`/history/${items._id}`}>Details</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default OrderHistory;