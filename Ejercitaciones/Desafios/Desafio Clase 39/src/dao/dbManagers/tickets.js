import ticketsModel from "../models/tickets.js";

export default class Ticket {
    constructor() {}

    get = async() => {
        let tickets = await ticketsModel.find();
        return tickets.map(ticket => ticket.toObject());
    }

    getOne = async(id) => {
        let ticket = await ticketsModel.findOne({_id: id}).lean();
        if (!ticket) {
            return null;
        }
        return ticket;
    }

    post = async ticket => {
        let result = await ticketsModel.create(ticket);
        return result;
    }

    delete = async(id) => {
        let result = await ticketsModel.deleteOne({_id: id});
        return result;
    }
}