const Product = require('../models/product');

const controller = {
    
    getProducts: async (req, res) => {

        try {

            const { start = 0, limit = 10 } = req.query;
            const query = { status: true };
            let total = 0;
            let products = [];
    
            const results = await Promise.all([
                Product.countDocuments(query),
                Product.find(query).skip(start).limit(limit)
            ]);
    
            total = results[0];
            products = results[1];
    
            if(products.length === 0) {
                return res.status(400).json({
                    message: 'Not products found'
                });
            }
    
            res.json({
                total,
                products
            });

        } catch(error) {
            res.status(500).json({
                message: 'Could not get products',
                error
            });
        }

    },

    getProduct: async (req, res) => {

        try {

            const { id } = req.params;
            const product = await Product.findById(id);
            res.json(product);

        } catch(error) {
            res.status(500).json({
                message: 'Could not get product',
                error
            });
        }

    },

    createProduct: async (req, res) => {

        try {

            const { name, description, price, image } = req.body;
            const productData = {
                name,
                description,
                price
            }
            if(image) {
                productData.image = image;
            }

            const product = new Product(productData);
            await product.save();

            res.json({
                message: 'Product saved',
                product
            });

        } catch(error) {
            res.status(500).json({
                message: 'Product could not be saved',
                error
            });
        }

    },

    updateProduct: async (req, res) => {

        try {

            const { id } = req.params;
            const { name, description, price, image } = req.body;
            const productData = {
                name,
                description,
                price
            }
            if(image) {
                productData.image = image;
            }

            const product = await Product.findByIdAndUpdate(id, productData, { new: true });

            res.json({
                message: 'Product updated',
                product
            });

        } catch(error) {
            res.status(500).json({
                message: 'Product could not be updated',
                error
            });
        }

    },

    deleteProduct: async (req, res) => {

        try {

            const { id } = req.params;
            const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });
            res.json({
                message: 'Product deleted',
                product
            });

        } catch(error) {
            res.status(500).json({
                message:  'Product could not be deleted',
                error
            });
        }

    }
    
}

module.exports = controller;