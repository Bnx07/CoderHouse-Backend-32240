import config from "../config/config.js";
import mongoose from 'mongoose';

let users, products, carts;

switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/ecommerce?retryWrites=true&w=majority');
    case "MEMORY":
}