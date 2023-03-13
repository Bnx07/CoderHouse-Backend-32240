import userModel from "../models/users.js";

export default class userManager {    
    addUser = async(user) => {
        let result = userModel.create(user);
        return result;
    }

    findUser = async(search) => {
        let result = userModel.findOne(search);
        return result;
    }
}
