import contactsModel from "../models/contacts.js";

export default class Contacts {
    constructor() {

    }

    get = async() => {
        let result = await contactsModel.find()
        return result;
    }

    post = async(contact) => {
        let result = await contactsModel.create(contact);
        return result;
    }

    delete = async(email) => {
        let result = await contactsModel.delete({email: email});
        return result
    }

    put = async(email, contact) => {
        let result = await contactsModel.updateOne({email}, contact);
    }
}