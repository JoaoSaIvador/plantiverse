const Category = require('../models/categoryModel');

const categoryController = {
    getCategories: async (req, res) => {
        try {
            // Find all categories
            const categories = await Category.find();

            return res.json(categories);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createCategory: async (req, res) => {
        try {
            const name = req.body.name;

            // Check if category already exists
            const category = await Category.findOne({ name });
            if (category) {
                return res.status(400).json({ msg: "Category already exists!" });
            }

            // Save new category
            const newCategory = new Category({ name });
            await newCategory.save();

            res.json({ msg: "Category created!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const name = req.body.name;
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name })
            if (!updatedCategory) {
                return res.status(400).json({ msg: "Category does not exist!" });
            }

            res.json({ msg: "Category updated!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            // Find category and delete it
            const deletedCategory = await Category.findByIdAndDelete(req.params.id);
            if (!deletedCategory) {
                return res.status(400).json({ msg: "Category does not exist!" });
            }

            res.json({ msg: "Category deleted!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = categoryController;