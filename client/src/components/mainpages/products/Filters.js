import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import Form from 'react-bootstrap/Form';

function Filters() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;

    const [category, setCategory] = state.productsAPI.category;
    const [sort, setSort] = state.productsAPI.sort;
    const [search, setSearch] = state.productsAPI.search;


    const handleCategory = e => {
        setCategory(e.target.value);
        setSearch('');
    };

    return (
        <div className="w-100 d-flex flex-row justify-content-center align-items-center flex-wrap mb-3">
            <div className="d-flex flex-row align-items-center me-3 mb-2">
                <Form.Select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </Form.Select>
            </div>

            <div className="d-flex flex-row align-items-center mb-2 me-3">
                <Form.Select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </Form.Select>
            </div>

            <Form.Control className=' mb-2 customInput' type="text" value={search} placeholder="Enter your search!" onChange={e => setSearch(e.target.value.toLowerCase())} />


        </div>
    );
}

export default Filters;