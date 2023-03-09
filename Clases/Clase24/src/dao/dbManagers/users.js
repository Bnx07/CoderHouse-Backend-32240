import { usersModel } from "../models/users.js";

export default class Users{
    constructor(){
        console.log(" Working in mongoDb")
    }

    getAll =async() =>{
        let users = await usersModel.find().populate('courses');
        return  users.map(user=>user.toObject())
    }

    getById = async(email) => {
        let user = await usersModel.find({email}).populate('courses');
        return user;
    }

    saveUser =async user=>{
        let result = await usersModel.create(user);
        return result;
    }

    getById = async(id) => {
        let user = await usersModel.find({_id: id}).populate('courses');
        return user;
    }

    updateUser = async(id, user) => {
        delete user._id;
        let result = await usersModel.updateOne({_id: id}, {$set: user});
        return result;
    }
}