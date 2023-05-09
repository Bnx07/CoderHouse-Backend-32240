import { ProductsService as pm } from '../dao/repository/index.js';
import { faker } from '@faker-js/faker';
import { CustomError, generateErrorInfo } from '../utils/errors.js';

export default class ProductController {
    get = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

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
            
            if (!products) {
                req.logger.warning('La base de datos de products está vacía');
                CustomError.createError({statusCode: 500, name: "No info avaliable", cause: generateErrorInfo.getEmptyDatabase(), code: 3});

            }
            res.send({status: "Ok", payload: products.docs, totalPages: products.totalPages, prevPage: products.prevPage, nextPage: products.nextPage, page: products.page, hasPrevPage: products.hasPrevPage, hasNextPage: products.hasNextPage, nextLink: nextLink, prevLink: prevLink});
        } catch(error) {
            next(error);
        }
    }

    getMockProducts = async(req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        let docs = [];
        for (var i = 0; i < 100; i++) {
            docs.push({
                _id: faker.database.mongodbObjectId(),
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                code: faker.datatype.string(),
                price: faker.commerce.price(),
                stock: faker.random.numeric(2),
                __v: 0
            })
        }
        res.send({status: "Ok", payload: {docs, totalDocs: 100, limit: 100, totalPages: 1, page: 1, pagingCounter: 1, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null}});
    }

    post = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

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
                req.logger.error(`Hay datos faltantes en ${req.url}`);
                CustomError.createError({statusCode: 404, name: "Some data is missing", cause: generateErrorInfo.getEmptyDatabase(), code: 4});
            }

            if (req.user.user.role == "admin") newProduct.owner = 'admin';
            if (req.user.user.role == "premium") newProduct.owner = req.user.user.email;

            const result = await pm.post(newProduct);
            res.send({status: "Ok", payload: result});
        } catch(error) {
            next(error);
        }
    }

    put = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

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
            
            let exists = await pm.getOne(id);
            if (!exists) {
                CustomError.createError({statusCode: 400, name: "Product doesnt exist", cause: generateErrorInfo.idNotFound(), code: 2});
                req.logger.error(`El product ID no es válido: ${id} en ${req.url}`);
            }

            if (req.user.user.role == "premium") {
                if (req.user.user.email != exists.owner) CustomError.createError({statusCode: 401, name: "Product isnt yours", cause: generateErrorInfo.unauthorized(), code: 2});
            }

            let result = await pm.put(id, newProduct);
            res.send({status: "Ok", payload: result});
        } catch(error) {
            next(error)
        }
    }

    delete = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            const id = req.params.pid;
    
            let exists = await pm.getOne(id);
            if (!exists) {
                req.logger.error(`El product ID no existe: ${id} en ${req.url}`);
                CustomError.createError({statusCode: 400, name: "Product doesnt exist", cause: generateErrorInfo.idNotFound(), code: 2});
            }

            if (req.user.user.role == "premium") {
                if (req.user.user.email != exists.owner) CustomError.createError({statusCode: 401, name: "Product isnt yours", cause: generateErrorInfo.unauthorized(), code: 2});
            }

            let result = await pm.delete(id);
            res.send({status: "Ok", payload: result});
        } catch(error) {
            next(error);
        }
    }
}