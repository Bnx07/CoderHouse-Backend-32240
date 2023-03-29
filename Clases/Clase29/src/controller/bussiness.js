import bussinessManager from "../dao/dbManagers/bussiness.js";

const bm = new bussinessManager();

export default class bussinessController {
    getBussiness = async(req, res) => {
        let result = await bm.get();
        if (!result) return res.status(500).send({status: "error", message: "No se ha podido conectarse"});
        res.send({status: "Ok", payload: result});
    }

    getBussinessById = async(req, res) => {
        const {bid} = req.params;
        let result = await bm.getBussinessById(bid);
        if (!result) return res.status(500).send({status: "error", message: "No se ha podido conectarse"});
        res.send({status: "Ok", payload: "Archivo unico jaja"});
    }

    createBussiness = async(req, res) => {
        const bussiness = req.body;
        let result = await bm.post(bussiness);
        if (!result) return res.status(500).send({status: "error", message: "No se ha podido conectarse"});
        res.send({status: "Ok", payload: result});
    }

    putBussiness = async(req, res) => {
        let body = req.body;
        let bussiness = await bm.getOne(req.params.bid);
        bussiness.products.push(result);
        let result = await bm.post(bussiness._id, bussiness);


        // const bussiness = req.body;
        // let result = await bm.post(req.params.bid, bussiness);
        if (!result) return res.status(500).send({status: "error", message: "No se ha podido conectarse"});
        res.send({status: "Ok", payload: result, message: "Producto añadido al bussiness"});
    }
}