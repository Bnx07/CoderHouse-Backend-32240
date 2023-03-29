import bussinessModel from "../models/bussiness.model.js";

export default class bussinessManager {
    get = async() => {
        try {
            let bussinesses = await bussinessModel.find({});
            return bussinesses;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    getOne = async(id) => {
        try {
            let bussiness = await bussinessModel.findOne({_id: id});
            return bussiness;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    post = async(bussiness) => {
        try {
            let result = await bussinessModel.create(bussiness);
            return result;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    put = async(id, bussiness) => {
        try {
            let result = await bussinessModel.updateOne({_id: id}, {$set: bussiness});
            return result;
        } catch(error) {
            console.log(error);
            return null;
        }
    }
}