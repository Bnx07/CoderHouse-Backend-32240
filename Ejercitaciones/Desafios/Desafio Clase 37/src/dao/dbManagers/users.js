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
}
