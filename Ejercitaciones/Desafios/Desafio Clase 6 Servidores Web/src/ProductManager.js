// const fs = require('fs');
import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    getProducts = async() => { // FUNCIONA
        if (fs.existsSync(`${this.path}dataBase.json`)) { // Si el archivo existe, se lee y añade el dato
            const objects = await JSON.parse(fs.readFileSync(`${this.path}dataBase.json`, "utf-8"));
            return objects;

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
                return "No se encuentra ningún producto con ese ID"
            } else {
                return objects[position];
            }
        } else {
            console.log("No se encontró el archivo");
        }
    }
}

export default ProductManager;