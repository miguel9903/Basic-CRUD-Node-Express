const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },

    description: {
        type: String,
        required: [true, 'Description is required']
    },

    price: {
        type: String,
        required: [true, 'Price is required']
    },

    image: {
        type: String
    },

    available: {
        type: Boolean,
        default: true
    },

    status: {
        type: Boolean,
        default: true
    }

});

ProductSchema.methods.toJSON = function() {
    const { _id, __v, status, ...product } = this.toObject();
    return product;
}

module.exports = model('Product', ProductSchema);