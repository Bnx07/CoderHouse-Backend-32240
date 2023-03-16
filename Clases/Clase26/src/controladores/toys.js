import { create, read } from "../negocio/toys.js";

const createToy = async(req, res) => {
    let {price, name} = req.query;
    res.send(await create(name, price));
}

const readToys = async(req, res) => {
    res.json({status: "Ok", message: await read()})
}

export default {
    readToys,
    createToy
}