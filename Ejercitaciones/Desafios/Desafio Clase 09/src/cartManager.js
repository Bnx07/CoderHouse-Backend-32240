import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    addCart = async() => { // FUNCIONA ADAPTADA
        let newCartId = 0;
        if (fs.existsSync(`${this.path}carrito.json`)) { // Si el archivo existe, se lee y añade el dato
            let carts = await JSON.parse(fs.readFileSync(`${this.path}carrito.json`, "utf-8"));
            let lastCart = await carts.pop()
            carts.push(lastCart);
            console.log(carts)
            let cart = {
                id: lastCart.id + 1,
                objects: []
            }
            newCartId = lastCart.id + 1;

            carts.push(cart);
            console.log(carts)

            carts = JSON.stringify(carts);
            fs.writeFileSync(`${this.path}carrito.json`, carts);

        } else { // Si no existe, se crea con el carrito directamente
            let cart = {
                id: 0,
                objects: []
            }
            let carts = [cart];

            carts = JSON.stringify(carts);
            fs.writeFileSync(`${this.path}carrito.json`, carts);
        }

        return `Tu carrito tiene la ID ${newCartId}`;
    }

    getCartById = async(id) => { // FUNCIONA ADAPTADA
        if (fs.existsSync(`${this.path}carrito.json`)) { // Si el archivo existe, se lee y añade el dato
            let carts = await JSON.parse(fs.readFileSync(`${this.path}carrito.json`, "utf-8"));
            let cart = carts.find(element => element.id == id);
            if (cart == undefined) {
                return 'No se encuentra ningun carrito con ese ID';
            } else {
                return cart; // Pondria return cart.objects pero es que [] == false y me rompe la condicion jajant
            }
        } else {
            return false
        }
    }

    addProductToCart = async(cartId, productId) => { // FUNCIONA?? Creo que no che
        if (fs.existsSync(`${this.path}carrito.json`) && fs.existsSync(`${this.path}productos.json`)) {
            let carts = await JSON.parse(fs.readFileSync(`${this.path}carrito.json`, "utf-8"));
            let cart = carts.find(element => element.id == cartId);
            if (cart == undefined) {
                return 'No se encuentra ningun carrito con ese ID';
            } else {
                let products = await JSON.parse(fs.readFileSync(`${this.path}productos.json`, "utf-8"));
                console.log(products);
                let product = products.find(element => element.id == productId);
                if (product == undefined) {
                    return 'No se encuentra ningun producto con ese ID';
                } else { // SI ENCUENTRA EL PRODUCTO EN EL ARRAY ENTONCES += 1, SI NO, LO CREA
                    let idToSearch = (element) => element.id === productId;
                    let position = await cart.objects.findIndex(idToSearch);
                
                    if (position === -1) {
                        cart.objects.push({id: productId, quantity: 1});
                    } else {
                        let cartProduct = cart.objects[position];
                        cartProduct.quantity += 1;
                        console.log(cartProduct)
                        cart.objects.splice(position, 1, cartProduct);
                    }
                    let cartIdToSearch = (element) => element.id == cartId;
                    let cartPos = await carts.findIndex(cartIdToSearch);
                    carts.splice(cartPos, 1, cart);
                    carts = JSON.stringify(carts);
                    fs.writeFileSync(`${this.path}carrito.json`, carts);
                    return 'Producto agregado con exito';
                }
            }
        } else {
            return false;
        }
    }
}

export default CartManager;