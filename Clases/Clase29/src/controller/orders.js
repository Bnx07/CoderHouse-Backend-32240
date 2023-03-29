import orderManager from "../dao/dbManagers/order.js";
import bussinessManager from "../dao/dbManagers/bussiness.js";
import userManager from "../dao/dbManagers/users.js";

const om = new orderManager();
const bm = new bussinessManager();
const um = new userManager();

export default class ordersController {
    getOrders = async(req, res) => {
        let result = await om.get();
        if (!result) return res.status(500).send({status: "error", message: "No se ha podido conectarse"});
        res.send({status: "Ok", payload: result});
    }

    getOrderById = async(req, res) => {
        const {oid} = req.params;
        let result = await om.getOne(oid);
        res.send({status: "Ok", payload: result});
    }

    createOrder = async(req, res) => {
        const {user, bussiness, products} = req.body;
        const resultUser = await um.getOne({_id: user._id});
        const resultBussiness = await bm.getOne({_id: bussiness._id});

        let actualOrders = resultBussiness.products.filter(product => products.includes(product.id));

        let sum = actualOrders.reduce((acc, prev) => {
            acc += prev.prev;
            return acc;
        }, 0);

        let orderNumber = Data.now() + Math.floor(Math.random * 1000000 + 1);

        let order = {
            number: orderNumber,
            bussiness,
            user,
            status: "pending",
            products: actualOrders.map(product => product.id),
            totalPrice: sum
        }

        let orderResult = await om.post(order);
        resultUser.orders.push(orderResult._id);
        await um.put(user._id, resultUser);

        res.send({status: "Ok", payload: orderResult, message: "Orden creada"});
    }

    putOrder = async(req, res) => {
        const {resolve} = req.query;
        let result = await om.getOne(req.params.oid);
        result.status = resolve;
        await om.put(user._id, result);
        res.send({status: "Ok", payload: result, message: "Estado actualizado correctamente"});
    }
}