import { ProductsService as pm } from '../dao/repository/index.js';

export default class ProductController {
    get = async(req, res) => {
        try {
            let {limit = 10, page = 1, query = 'none', sort} = req.query;
            let products;
        
            if (query != "none") {
        
                let replaces = 0; // Reemplazar ' por "
                for (var i = 0; i < query.length; i++) {
                    if (query[i] == "'") replaces += 1;
                }
                for (var i = 0; i < replaces; i ++) {
                    query = query.replace(/'/, '"');
                }
        
                JSON.parse(query);
                products = await pm.getSome(limit, page, query, sort);
            } else {
                products = await pm.getSome(limit, page, undefined, sort);
            }
        
            page = parseInt(page);
            let nextLink, prevLink;
        
            let invCharacters = 0; // Reemplaza los "" por su equivalente ASCII asi los links son validos
            for (var i = 0; i < query.length; i++) {
                if (query[i] == '"') invCharacters += 1;
            }
            for (var i = 0; i < invCharacters; i ++) {
                query = query.replace(/"/, '%22');
            }
            query = query.replace(" ",""); // Quita un espacio por las dudas
        
            (products.hasNextPage == true ) ? nextLink = `http://localhost:8080/api/products/?limit=${limit}&page=${page+1}&query=${query}` : nextLink = null;
            (products.hasPrevPage == true ) ? prevLink = `http://localhost:8080/api/products/?limit=${limit}&page=${page-1}&query=${query}` : prevLink = null;
            
            (!products)?res.status(500).send({status: "Error", error: "No info avaliable"}):res.send({status: "Ok", payload: products.docs, totalPages: products.totalPages, prevPage: products.prevPage, nextPage: products.nextPage, page: products.page, hasPrevPage: products.hasPrevPage, hasNextPage: products.hasNextPage, nextLink: nextLink, prevLink: prevLink});
        } catch {
            res.send({status: 400, message: "Query must me sent in the format query={'property':'condition'} with single or double marks"});
        }
    }

    post = async(req, res) => {
        try {
            const {title, description, code, price, stock, thumbnails} = req.body;
            let newProduct = {
                title,
                description,
                code,
                price,
                stock,
                thumbnails
            }
        
            if (!title || !description || !code || !price || !stock) {
                res.send({status: 404, payload: "Some data is missing"});
            } else {
                const result = await pm.saveProduct(newProduct);
                res.send({status: "Ok", payload: result});
            }
        } catch {
            res.send({status: 400, message: "This method only allows to create one product and the code must be not used"});
        }
    }

    put = async(req, res) => {
        try {
            const id = req.params.pid;
    
            const {title, description, code, price, stock, thumbnails} = req.body;
            let newProduct = {
                title,
                description,
                code,
                price,
                stock,
                thumbnails
            }
    
            let result = await pm.put(id, newProduct);
            res.send({status: "Ok", payload: result});
        } catch {
            res.send({status: 400, message: "The pid doesnt exist"});
        }
    }

    delete = async(req, res) => {
        try {
            const id = req.params.pid;
    
            let result = await pm.delete(id);
            res.send({status: "Ok", payload: result});
        } catch {
            res.send({status: 400, message: "The pid doesnt exist"});
        }
    }
}