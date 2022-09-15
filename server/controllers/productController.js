const Product = require('../models/productModel');

const productController = {
    getProducts: async (req, res) => {
        try {
            // Find all products
            const products = await Product.find();

            return res.json(products);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;

            // Check if image was selected
            if (!images) {
                return res.status(400).json({ msg: "No image selected!" });
            }

            // Check if product already exists
            const product = await Product.findOne({ product_id });
            if (product) {
                return res.status(400).json({ msg: "Product already exists!" });
            }

            // Save new category
            const newProduct = new Product({
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            });
            await newProduct.save();

            res.json({ msg: "Product created!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, images, category } = req.body;

            // Check if image was selected
            if (!images) {
                return res.status(400).json({ msg: "No image selected!" });
            }

            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            })

            if (!updatedProduct) {
                return res.status(400).json({ msg: "Product does not exist!" });
            }

            res.json({ msg: "Category updated!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            // Find product and delete it
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            if (!deletedProduct) {
                return res.status(400).json({ msg: "Product does not exist!" });
            }

            res.json({ msg: "Product deleted!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = productController;