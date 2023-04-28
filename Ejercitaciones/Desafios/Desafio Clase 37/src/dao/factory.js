import config from "../config/config.js";
import mongoose from 'mongoose';
import { logger } from "../utils/logger.js";

export let users, carts, products, tickets, messages, connection;

switch (config.persistence) {
    case "MONGO":
        connection = mongoose.connect(config.connection);
        logger.info("Connected to MongoDB");
        const {default: usersMongo} = await import('./dbManagers/users.js');
        const {default: cartsMongo} = await import('./dbManagers/carts.js');
        const {default: productsMongo} = await import('./dbManagers/products.js');
        const {default: ticketsMongo} = await import('./dbManagers/tickets.js');
        const {default: messagesMongo} = await import('./dbManagers/messages.js')
        users = usersMongo;
        carts = cartsMongo;
        products = productsMongo;
        tickets = ticketsMongo;
        messages = messagesMongo;
        break;
    case "MEMORY":
        const {default: usersMemory} = await import('./memory/users.js');
        const {default: cartsMemory} = await import('./memory/cartManager.js');
        const {default: productsMemory} = await import('./memory/productManager.js');
        const {default: ticketsMemory} = await import('./memory/tickets.js');
        const {default: messagesMemory} = await import('./memory/messagesManager.js')
        users = usersMemory;
        carts = cartsMemory;
        products = productsMemory;
        tickets = ticketsMemory;
        messages = messagesMemory;
        break;
}