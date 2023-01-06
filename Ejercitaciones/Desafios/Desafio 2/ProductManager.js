const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct = async(setTitle, setDescription, setPrice, setThumbnail, setCode, setStock) => { // FUNCIONA
        const product = {
            title: setTitle,
            description: setDescription,
            price: setPrice,
            thumbnail: setThumbnail,
            code: setCode,
            stock: setStock
        }

        let valid = true;

        if ((setTitle && setDescription && setPrice && setThumbnail && setStock && setCode) == undefined) {
            console.log("Some data is missing");
            valid = false;
        }
        if ((setTitle.trim() && setDescription.trim() && setThumbnail.trim() && setCode.trim()) == 0) {
            console.log(`Some data is empty so the product won't be created`);
            valid = false;
        }
        if (typeof(setPrice) != "number" || typeof(setStock) != "number") {
            console.log(`Stock and price need to be numbers so ${setTitle} won't be created`);
            valid = false;
        }

        if (valid) {
            if (fs.existsSync(`${this.path}dataBase.json`)) { // Si el archivo existe, se lee y añade el dato
                let objects = await JSON.parse(fs.readFileSync(`${this.path}dataBase.json`, "utf-8"));
                let lastProduct = await objects.pop()
                objects.push(lastProduct);
                product.id = await lastProduct.id+1;
    
                objects.push(product);
    
                objects = JSON.stringify(objects);
                fs.writeFileSync(`${this.path}dataBase.json`, objects);
            } else { // Si no existe, se crea con el producto directamente
                console.log("No se encontró el archivo, por lo que se ha creado uno nuevo");
                product.id = 0;
                let objects = [product];
    
                objects = await JSON.stringify(objects);
                await fs.writeFileSync(`${this.path}dataBase.json`, objects);
            }
        }
    }

    getProducts = async() => { // FUNCIONA
        if (fs.existsSync(`${this.path}dataBase.json`)) { // Si el archivo existe, se lee y añade el dato
            const objects = await JSON.parse(fs.readFileSync(`${this.path}dataBase.json`, "utf-8"));
            console.log(objects);

        } else { // Si no existe, se crea el archivo con el producto directamente
            console.log("No se encontró el archivo");
        }
    }

    getProductById = async(id) => { // FUNCIONA
        if (fs.existsSync(`${this.path}dataBase.json`)) {
            const objects = await JSON.parse(fs.readFileSync(`${this.path}dataBase.json`));

            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);
            if (position == -1) {
                console.log("No se encuentra ningún producto con ese ID");
            } else {
                console.log(objects[position]);
            }
        } else {
            console.log("No se encontró el archivo");
        }
    }

    updateProduct = async(id, setTitle, setDescription, setPrice, setThumbnail, setCode, setStock) => { // FUNCIONA
        let product = {
            title: setTitle,
            description: setDescription,
            price: setPrice,
            thumbnail: setThumbnail,
            code: setCode,
            stock: setStock
        }
        
        if (fs.existsSync(`${this.path}dataBase.json`)) {
            let objects = await JSON.parse(fs.readFileSync(`${this.path}dataBase.json`));

            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);
            
            if (position === -1) {
                console.log("No se encuentra ningun producto con esa ID");
            } else {
                product.id = objects[position].id;

                objects.splice(position, 1, product);
                console.log(objects);
    
                objects = JSON.stringify(objects);
                fs.writeFileSync(`${this.path}dataBase.json`, objects);
            }
        } else {
            console.log("No se encontró el archivo");
        }
    }

    deleteProduct = async(id) => { // FUNCIONA
        if (fs.existsSync(`${this.path}dataBase.json`)) {
            let objects = await JSON.parse(fs.readFileSync(`${this.path}dataBase.json`));

            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);

            if (position === -1) {
                console.log("No se encuentra ningún producto con esa ID");
            } else {
                objects.splice(position, 1);
            }

            if (objects.length == 0) {
                await fs.unlinkSync(`${this.path}dataBase.json`, objects);
            } else {
                objects = JSON.stringify(objects);
                await fs.writeFileSync(`${this.path}dataBase.json`, objects);
            }
        } else {
            console.log("No se encontró el archivo");
        }
    }
}

const pm = new ProductManager("./");

// pm.addProduct("Pera", "Es una pera", 30, "ubicacionImagen.txt", "ab04", 15);

// pm.getProductById(19)

// pm.getProducts();

// pm.updateProduct(8, "Manzana", "Es una manzana", 40, "ubicacionArchivo.txt", "ab30", 20);

// pm.deleteProduct(10);
