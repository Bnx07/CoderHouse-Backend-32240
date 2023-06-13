import userModel from "../models/users.js";

export default class userManager {    
    post = async(user) => {
        let result = userModel.create(user);
        return result;
    }

    getAll = async() => {
        let result = userModel.find();
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

    deleteMany = async(users) => {
        let wentWrong = [];

        users.forEach(async(user) => {
            let result = await userModel.deleteOne({email: user});
            console.log(result);
            if (!result.acknowledged) wentWrong.push(user);
        });

        return wentWrong;
    }

    deleteOne = async(email) => {
        let result = userModel.deleteOne({email});
        return result; 
    }
}
