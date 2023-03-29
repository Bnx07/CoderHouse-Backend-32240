import orderModel from "../models/orders.model.js";

export default class orderManager {
    get = async() => {
        try {
            let orders = await orderModel.find({});
            return orders;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    getOne = async(id) => {
        try {
            let order = await orderModel.findOne({_id: id});
            return order;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    post = async(order) => {
        try {
            let result = await orderModel.create(order);
            return result;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    put = async(id, order) => {
        try {
            let result = await orderModel.updateOne({_id: id}, {$set: order});
            return result;
        } catch(error) {
            console.log(error);
            return null;
        }
    }
}