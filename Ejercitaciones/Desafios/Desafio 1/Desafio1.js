class ProductManager {
    constructor () {
        this.products = [];
        this.nextId = 0
    }

    addProduct(productName, productDescription, productPrice, productThumbnail, productStock, productCode) {
        let valid = true;

        if ((productName && productDescription && productPrice && productThumbnail && productStock && productCode) == undefined) {
            valid = false;
            if (productName != undefined) {
                console.log(`Some data is missing so ${productName} won't be created`);
            } else {
                console.log("Some data is missing");
            }
        } else {
            if ((productName.trim() && productDescription.trim() && productThumbnail.trim() && productCode.trim()) == 0) {
                console.log(`Some data is empty so the product ${productName} won't be created`);
                valid = false
            }
        }

        if (typeof(productPrice) != "number" || typeof(productStock) != "number") {
            console.log(`Stock and price need to be numbers so ${productName} won't be created`);
            valid = false;
        }

        if (this.products.find(element => element.code == productCode)) {
            console.log("That code has already been used");
            valid = false;
        }

        if (valid) {
            let newProduct = {
                title: productName,
                description: productDescription,
                price: productPrice,
                thumbnail: productThumbnail,
                stock: productStock,
                code: productCode,
                id: this.nextId
            }

            this.products.push(newProduct);

            this.nextId ++;

            console.log(`The product ${productName}, ID ${newProduct.id} has been created`);
        }
    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(searchId) {
        let found = false;

        this.products.forEach(element => {
            if (element.id == searchId) {
                console.log(element);
                found = true;
            }
        })

        if (!found) {
            // console.log(`There isn't any product with the ID ${searchId}`);
            console.log("Not found");
        }
    }
}

console.log("");

const manager1 = new ProductManager;

manager1.addProduct("Piña", "Fruta amarilla puntiaguda", 10, "location", 10, "zone1p1"); // Creado correctamente
manager1.addProduct("Papa", "Verdura muy utilizada en la cocina", 8, "location", 40, "zone1p2"); // Creado correctamente
manager1.addProduct("Pera", "Fruta sin sabor a nada en especifico", 4, "location", 40, "zone1p3"); // Creado correctamente
manager1.addProduct("Manzana", "Fruta roja utilizada para muchas recetas, incluyendo la manzana rallada", 19, "location", 40, "zone1p4"); // Creado correctamente
manager1.addProduct("Palta", "Es muy cara", "80", "location", 2); // Error puesto que faltan datos y error por no tener el precio en valor numérico
manager1.addProduct("Durazno", "Fruta muy nutritiva", 80, "location", 2, "    "); // Error puesto que un dato está vacío
manager1.addProduct("Mandarina", "Fruta naranja con olor muy fuerte", 19, "location", 2, "zone1p5"); // Creado correctamente

console.log("");

manager1.getProductById(3); // Se imprimen los datos del objeto

manager1.getProductById(6); // Se devuelve un "Not found"

console.log("");

const manager2 = new ProductManager;

manager2.addProduct("Carne", "Rica en proteina", 50, "position", 6, "zone2p1"); // Creado correctamente

manager2.getProducts(); // Se imprime la lista de todos los objetos

console.log("");