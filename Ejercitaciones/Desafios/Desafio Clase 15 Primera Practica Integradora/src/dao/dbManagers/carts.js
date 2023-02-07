import cartModel from "../models/carts.js";

export default class Cart {
    constructor() {
        console.log("Working in MongoDB");
    }

    getAll = async() => {
        let carts = await cartModel.find();
        return carts.map(user => user.toObject());
    }

    createCart = async cart => {
        let result = await cartModel.create(cart);
        return result;
    }

    updateCart = async(id) => {
        let result = await cartModel.updateOne({_id: id}); // Poner todos los campos como ({_id: id}, {campos})
        return result;
    }

    deleteCart = async(id) => {
        let result = await cartModel.deleteOne({_id: id});
        return result;
    }

    addProductToCart = async(cid, pid) => {
        console.log("Todavia no existe JAJANT");
    }
    
    removeProductToCart = async(cid, pid) => {
        console.log("Todavia no existe JAJANT");
    }
}