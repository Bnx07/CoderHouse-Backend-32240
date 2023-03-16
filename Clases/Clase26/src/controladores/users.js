import { create, read } from "../negocio/users.js";

const createUser = async(req, res) => {
    let {firstName, lastName} = req.query;
    res.send(await create(firstName, lastName));
}

const readUsers = async(req, res) => {
    res.json({status: "Ok", message: await read()})
}

export default {
    readUsers,
    createUser
}