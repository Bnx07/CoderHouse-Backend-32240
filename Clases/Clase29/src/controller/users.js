import userManager from "../dao/dbManagers/users.js";

const um = new userManager();

export default class usersController {
    getUsers = async(req, res) => {
        let result = await um.get()
        res.send({status: "Ok", payload: result});
    }

    getUserById = async(req, res) => {
        let result = await um.getOne(req.params.uid);
        res.send({status: "Ok", payload: result});
    }

    createUser = async(req, res) => {
        let result = await um.post(req.body);
        res.send({status: "Ok", payload: result});
    }
}