import React, { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CategoryItem from './CategoryItem';

function Categories() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const [category, setCategory] = useState('');
    const [token] = state.token;
    const [callback, setCallback] = state.categoriesAPI.callback;
    const [onEdit, setOnEdit] = useState(false);
    const [id, setID] = useState('');

    const createCategory = async e => {
        e.preventDefault();
        try {
            if (onEdit) {
                const res = await axios.put(`/api/categories/${id}`, { name: category }, {
                    headers: { Authorization: token }
                });
                alert(res.data.msg);
            } else {
                const res = await axios.post('/api/categories', { name: category }, {
                    headers: { Authorization: token }
                });
                alert(res.data.msg);
            }
            setOnEdit(false);
            setCategory('');
            setCallback(!callback);

        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const editCategory = async (id, name) => {
        setID(id);
        setCategory(name);
        setOnEdit(true);
    };

    const deleteCategory = async id => {
        try {
            const res = await axios.delete(`/api/categories/${id}`, {
                headers: { Authorization: token }
            });
            alert(res.data.msg);
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="category-list bg-light d-flex flex-column justify-content-center align-items-center p-5 my-5">
            <h1 className='mb-5' style={{ color: "#212529" }}>Categories</h1>
            <Form className="w-100 my-4 d-flex flex-row justify-content-around align-items-center flex-nowrap" onSubmit={createCategory}>
                <input
                    placeholder="Enter your category"
                    className="me-2 search-bar bg-light form-control"
                    type="text"
                    name="category"
                    value={category}
                    required
                    onChange={e => setCategory(e.target.value)}
                />

                <button type="submit" className="create-category d-flex align-items-center justify-content-center">
                    {onEdit ? <EditIcon /> : <AddIcon />}
                </button>

            </Form>

            <div className="w-100 d-flex flex-column align-items-center scroll">
                {
                    categories.map(category => (
                        <CategoryItem category={category} editCategory={editCategory} deleteCategory={deleteCategory} key={category._id} />
                    ))
                }
            </div>
        </div >
    );
}

export default Categories;