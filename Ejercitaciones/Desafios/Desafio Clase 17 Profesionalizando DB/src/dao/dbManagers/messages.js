import messageModel from "../models/messages.js";

export default class Message {
    constructor() {
        console.log("Working in MongoDB");
    }

    getAll = async() => {
        let messages = await messageModel.find();
        messages = messages.map(message => message.toObject());
        return messages;
    }

    addMessage = async(message) => {
        let result = await messageModel.create(message);
        return result;
    }

    clearAll = async() => {
        let result = await messageModel.deleteMany();
        return result;
    }
}