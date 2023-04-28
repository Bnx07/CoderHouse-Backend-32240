import fs from 'fs';

class Product {
    constructor(path) {
        this.path = path;
    }

    get = async() => { // Funciona
        if (fs.existsSync(`${this.path}productos.json`)) { // Si el archivo existe, se lee y añade el dato
            const objects = await JSON.parse(fs.readFileSync(`${this.path}productos.json`, "utf-8"));
            return objects;

        } else { // Si no existe, se crea el archivo con el producto directamente
            return false;
        }
    }

    getOne = async(id) => { // Funciona
        if (fs.existsSync(`${this.path}productos.json`)) {
            const objects = await JSON.parse(fs.readFileSync(`${this.path}productos.json`));

            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);
            if (position == -1) {
                return 'Product not found';
            } else {
                return objects[position];
            }
        } else {
            return false;
        }
    }

    getSome = async(limit, page, query, sort) => {
        if (fs.existsSync(`${this.path}productos.json`)) {
            const objects = await JSON.parse(fs.readFileSync(`${this.path}productos.json`, "utf-8"));
            const filtered = [];
            
            if (query.name) objects.forEach(element => {if (element.name == query.name) filtered.push(element)});
            if (query.category) objects.forEach(element => {if (element.category == query.category) filtered.push(element)});
            if (query.price) objects.forEach(element => {if (element.price == query.price) filtered.push(element)});

            if (filtered.length > limit) filtered.splice(limit*page+1);

            return objects;
        } else {
            return false;
        }
    }

    post = async(product) => { // Funciona
        if (fs.existsSync(`${this.path}productos.json`)) { // Si el archivo existe, se lee y añade el dato
            let objects = await JSON.parse(fs.readFileSync(`${this.path}productos.json`, "utf-8"));
            let lastProduct = await objects.pop()
            objects.push(lastProduct);
            product.id = await lastProduct.id+1;
    
            objects.push(product);
    
            objects = JSON.stringify(objects);
            fs.writeFileSync(`${this.path}productos.json`, objects);
            return 'Product added';
        } else { // Si no existe, se crea con el producto directamente
            product.id = 0;
            let objects = [product];
    
            objects = JSON.stringify(objects);
            fs.writeFileSync(`${this.path}productos.json`, objects);
            return 'Product added';
        }
    }

    put = async(id, upProduct) => { // Funciona
        if (fs.existsSync(`${this.path}productos.json`)) {
            let objects = await JSON.parse(fs.readFileSync(`${this.path}productos.json`));

            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);
            
            if (position === -1) {
                return 'Product not found';
            } else {
                let product = objects[position];

                if (upProduct.title) product.title = upProduct.title;
                if (upProduct.description) product.description = upProduct.description;
                if (upProduct.code) product.code = upProduct.code;
                if (upProduct.price) product.price = upProduct.price;
                if (upProduct.status) product.status = upProduct.status;
                if (upProduct.stock) product.stock = upProduct.stock;
                if (upProduct.category) product.category = upProduct.category;
                if (upProduct.thumbnail) product.thumbnail = upProduct.thumbnail;

                objects.splice(position, 1, product);
    
                objects = JSON.stringify(objects);
                fs.writeFileSync(`${this.path}productos.json`, objects);

                return product;
            }
        } else {
            return false;
        }
    }

    delete = async(id) => { // Funciona
        if (fs.existsSync(`${this.path}productos.json`)) {
            let objects = await JSON.parse(fs.readFileSync(`${this.path}productos.json`));

            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);

            if (position === -1) {
                return 'Product not found';
            } else {
                objects.splice(position, 1);
                if (objects.length == 0) {
                    fs.unlinkSync(`${this.path}productos.json`, objects);
                } else {
                    objects = JSON.stringify(objects);
                    fs.writeFileSync(`${this.path}productos.json`, objects);
                }
                return 'Product has been deleted'
            }
        } else {
            return false;
        }
    }
}

export default Product;