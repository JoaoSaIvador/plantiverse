const Product = require('../models/productModel');

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString };

        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete (queryObj[el]));

        // gte = greater than or equal
        // lte = lesser than or equal
        // lt = lesser than
        // gt = greater than
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const productController = {
    getProducts: async (req, res) => {
        try {
            const features = new APIFeatures(Product.find(), req.query).filtering().sorting().paginating();
            const products = await features.query;

            res.json({
                status: 'success',
                result: products.length,
                products: products
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, images, category } = req.body;

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
            const { title, price, description, images, category } = req.body;

            // Check if image was selected
            if (!images) {
                return res.status(400).json({ msg: "No image selected!" });
            }

            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                title: title.toLowerCase(),
                price,
                description,
                images,
                category
            });

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
};

module.exports = productController;