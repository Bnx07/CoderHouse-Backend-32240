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
}
