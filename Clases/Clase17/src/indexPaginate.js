import mongoose from "mongoose";
import userModel from "./dao/models/users.js";

const enviroment = async() => {
    await mongoose.connect('mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority');
    let users = await userModel.paginate({gender: "Female"}, {limit: 20, page: 1});
    console.log(users);
}

enviroment();