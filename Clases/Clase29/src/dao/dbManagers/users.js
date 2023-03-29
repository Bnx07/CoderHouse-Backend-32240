import userModel from "../models/users.model.js";

export default class userManager {
    get = async() => {
        try {
            let users = await userModel.find({});
            return users;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    getOne = async(id) => {
        try {
            let user = await userModel.findOne({_id: id});
            return user;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    post = async(user) => {
        try {
            let result = await userModel.create(user);
            return result;
        } catch(error) {
            return null;
        }
    }
}