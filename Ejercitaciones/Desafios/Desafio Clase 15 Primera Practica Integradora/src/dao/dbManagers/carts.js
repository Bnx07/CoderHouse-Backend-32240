import cartModel from "../models/carts.js";

export default class Cart {
    constructor() {
        console.log("Working in MongoDB");
    }

    getAll = async() => {
        let carts = await cartModel.find();
        return carts.map(cart => cart.toObject());
    }

    getOne = async(id) => {
        let cart = await cartModel.findOne({_id: id});
        return cart;
    }

    createCart = async cart => {
        let result = await cartModel.create(cart);
        return result;
    }

    updateCart = async(id, cart) => {
        let result = await cartModel.updateOne({_id: id}, cart);
        return result;
    }

    deleteCart = async(id) => {
        let result = await cartModel.deleteOne({_id: id});
        return result;
    }
}