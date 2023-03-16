import { sumar, listar } from "../negocio/operations.js";

const suma = async(req, res) => {
    let {a, b} = req.query;
    res.send({status: "Ok", message: `La suma de ${a} + ${b} es ${await sumar(Number(a), Number(b))} :D`})
}

const list = async(req, res) => {
    res.json({status: "Ok", message: await listar()})
}

export default {
    suma,
    list
}