import userModel from "../models/users.js";

export default class userManager {    
    post = async(user) => {
        let result = userModel.create(user);
        return result;
    }

    getOne = async(search) => {
        let result = userModel.findOne(search);
        return result;
    }

    editOne = async(email, user) => {
        let result = userModel.updateOne({email}, user);
        return result;
    }

    editLastConnection = async(user, lastConnection) => {
        user.last_connection = lastConnection;

        let result = await userModel.updateOne({email: user.email}, user)

        return result;
    }
}
