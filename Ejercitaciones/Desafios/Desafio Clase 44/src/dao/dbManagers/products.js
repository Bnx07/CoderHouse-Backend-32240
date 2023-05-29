import productsModel from "../models/products.js";

export default class Product {
    constructor() {}

    get = async() => {
        let products = await productsModel.find();
        return products.map(product => product.toObject());
    }

    getSome = async(limit, page, query, sort) => { // Funciona
        (query != undefined) ? query = JSON.parse(query) : query = {};
        let products = await productsModel.paginate(query, {limit: limit, page: page, sort: {price:sort}, lean: true});
        
        return products;
    }

    getOne = async(id) => {
        let product = await productsModel.findOne({_id: id}).lean();
        return product;
    }

    post = async product => {
        let result = await productsModel.create(product);
        return result;
    }

    put = async(id, product) => {
        let result = await productsModel.updateOne({_id: id}, product);
        return result;
    }

    delete = async(id) => {
        let result = await productsModel.deleteOne({_id: id});
        return result;
    }
}