import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function CategoryItem({ category, editCategory, deleteCategory }) {
    return (
        <div className="w-100 px-3 py-2 my-2 d-flex flex-row flex-wrap justify-content-between align-items-center category-content">
            <label className="d-flex flex-row justify-content-start align-items-center">
                <span>{category.name}</span>
            </label >
            <div className='d-flex flex-row'>
                <a className="delete-category d-flex align-items-center justify-content-center me-2" onClick={() => editCategory(category._id, category.name)}>
                    <EditIcon sx={{ fontSize: 20 }} />
                </a >
                <a className="delete-category d-flex align-items-center justify-content-center" onClick={() => deleteCategory(category._id)}>
                    <DeleteIcon sx={{ fontSize: 20 }} />
                </a >
            </div>
        </div >
    );
}

export default CategoryItem;