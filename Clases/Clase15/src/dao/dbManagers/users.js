import userModel from "../models/users.js";

export default class User {
    constructor() {
        console.log("Working in MongoDB");
    }

    getAll = async() => {
        let users = await userModel.find();
        return users.map(user => user.toObject());
    }

    saveUser = async user => {
        let result = await userModel.create(user);
        return result;
    }

    updateUser = async(id) => {
        let result = await userModel.updateOne({_id: id});
        return result;
    }
}