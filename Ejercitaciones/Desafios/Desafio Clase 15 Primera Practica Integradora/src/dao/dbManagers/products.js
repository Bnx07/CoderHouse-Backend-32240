import productsModel from "../models/products.js";

export default class Product {
    constructor() {
        console.log("Working in MongoDB");
    }

    getAll = async() => {
        let products = await productsModel.find();
        return products.map(user => user.toObject());
    }

    saveProduct = async product => {
        let result = await productsModel.create(product);
        return result;
    }

    updateProduct = async(id) => {
        let result = await productsModel.updateOne({_id: id}); // Poner todos los campos como ({_id: id}, {campos})
        return result;
    }

    deleteProduct = async(id) => {
        let result = await productsModel.deleteOne({_id: id});
        return result;
    }
}