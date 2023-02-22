import productsModel from "../models/products.js";

export default class Product {
    constructor() {
        console.log("Working in MongoDB");
    }

    getAll = async() => {
        let products = await productsModel.find();
        return products.map(product => product.toObject());
    }

    getDeterminate = async(limit, page, query, sort) => { // Funciona
        (query != undefined) ? query = JSON.parse(query) : query = {};
        let products = await productsModel.paginate(query, {limit: limit, page: page, sort: {price:sort}, lean: true});
        
        return products;
    }

    getOne = async(id) => {
        let product = await productsModel.findOne({_id: id}).lean();
        return product;
    }

    saveProduct = async product => {
        let result = await productsModel.create(product);
        return result;
    }

    updateProduct = async(id, product) => {
        let result = await productsModel.updateOne({_id: id}, product);
        return result;
    }

    deleteProduct = async(id) => {
        let result = await productsModel.deleteOne({_id: id});
        return result;
    }
}