import userManager from "../dao/dbManagers/users.js";
import CartManager from '../dao/dbManagers/carts.js';

import {createHash, isValidPassword} from "../utils.js";

const um = new userManager();
const cm = new CartManager();

export const registerUser = async(req, res, next) => {
    const {first_name, last_name, age, email, password} = req.body;
    try {
        let user = await um.getOne({email: email});
        console.log("user");
        console.log("User: ", user);
        if (user != null) {
            console.log("El usuario ya existe");
            return res.send({status: "error", message: "El usuario ya existe"});
        }

        let cartObj = await cm.post(); // Puede que rompa por no tener params

        console.log("Cart")
        console.log(cartObj)

        let cart = cartObj._id

        const result = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart
        }

        console.log("Hi")
        req.user = result;

        let newUser = await um.post(result);
        
        next();
    } catch(error) {
        console.log("Error")
        console.log(error)
        next(error)
    }
}