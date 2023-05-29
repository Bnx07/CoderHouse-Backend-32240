import { users, carts, products } from "../factory.js";
import CartsRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";
import UsersRepository from "./users.repository.js";

export const CartsService = new CartsRepository(new carts());
export const ProductsService = new ProductsRepository(new products());
export const UsersService = new UsersRepository(new users());