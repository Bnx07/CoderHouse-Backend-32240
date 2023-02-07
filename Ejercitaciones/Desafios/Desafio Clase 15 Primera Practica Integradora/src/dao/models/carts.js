import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: Array,
})

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;