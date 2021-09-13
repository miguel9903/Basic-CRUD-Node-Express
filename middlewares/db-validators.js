const Product = require('../models/product');

const existProductId = async (id) => {
    const existProduct = await Product.findById(id);
    if(!existProduct) {
        throw new Error('Product does not exist');
    }
}

module.exports = existProductId;