const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    nama_produk: {
        type: String
    },
    harga_produk: {
        type: Number,
        minlength: 10
    },
    desk_produk: {
        type: String,
    },
    availability: {
        type: Boolean
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Product', ProductSchema)