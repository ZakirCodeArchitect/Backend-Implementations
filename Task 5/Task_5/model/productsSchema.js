const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    product_name: String,
    firm_name: String,
    price: Number,
    quantity: Number,
    expiry_date: Date
})

module.exports = mongoose.model("products", productsSchema);