import { users, carts, products } from "../factory";
import CartsRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";
import UsersRepository from "./users.repository.js";

export const CartsService = new CartsRepository(new Carts());
export const ProductsService = new ProductsRepository(new Products());
export const UsersService = new UsersRepository(new Users());