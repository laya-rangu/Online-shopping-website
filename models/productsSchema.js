const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id:String,
    url:String,
    detailUrl:String,
    title:Object,
    price:Object,
    description:String,
    discount:String,
    tagline:String,
    ptype:String
});


const Products = new mongoose.model("products",productSchema);//changed small p to capital

module.exports = Products;