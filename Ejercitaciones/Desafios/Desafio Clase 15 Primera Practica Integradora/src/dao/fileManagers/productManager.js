import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct = async(product) => { // Funciona
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

    getProducts = async() => { // Funciona
        if (fs.existsSync(`${this.path}productos.json`)) { // Si el archivo existe, se lee y añade el dato
            const objects = await JSON.parse(fs.readFileSync(`${this.path}productos.json`, "utf-8"));
            return objects;

        } else { // Si no existe, se crea el archivo con el producto directamente
            return false;
        }
    }

    getProductById = async(id) => { // Funciona
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

    updateProduct = async(id, upProduct) => { // Funciona
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

    deleteProduct = async(id) => { // Funciona
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

export default ProductManager;