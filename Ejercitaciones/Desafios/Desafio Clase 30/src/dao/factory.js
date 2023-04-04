import config from "../config/config.js";
import mongoose from 'mongoose';

export let users, carts, products, connection;

switch (config.persistence) {
    case "MONGO":
        connection = mongoose.connect(config.connection);
        users = await import('./dbManagers/users.js');
        carts = await import('./dbManagers/carts.js');
        products = await import('./dbManagers/products.js');
        break;
    case "MEMORY":
        products = await import('./memory/products.js');
        console.log("I have my PC freezed, so there is no memory");
        break;
}