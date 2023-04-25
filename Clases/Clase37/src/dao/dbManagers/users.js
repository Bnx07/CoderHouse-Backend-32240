import { usersModel } from "../models/users.js";

export default class Users{
    constructor(){
        console.log(" Working in mongoDb")
    }

    getAll =async() =>{
        let users = await usersModel.find().populate('courses');
        return  users.map(user=>user.toObject())
    }

    saveUser =async user=>{
        let result = await usersModel.create(user);
        return result;
    } 
    // ajustado para la tercera practica
    getBy = async(params) =>{
        let result = await userModel.findOne(params).populate('courses').lean();
        return result;
    }
    updateUser = async(id,user) =>{
        delete user._id;
        let result = await userModel.updateOne({_id:id},{$set:user})
        return result;
    }
}