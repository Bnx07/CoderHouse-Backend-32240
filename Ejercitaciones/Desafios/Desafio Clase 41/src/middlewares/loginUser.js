import userManager from "../dao/dbManagers/users.js";
import { isValidPassword } from "../utils/utils.js";

const um = new userManager();

export const loginUser = async(req, res, next) => {
    const {email, password} = req.body;
    console.log(req.body)
    try {
        const user = await um.getOne({email});
        if (!user) {
            req.logger.info("El usuario no existe");
            return res.send({status: "error", message: "El usuario no existe"});
        }
        if (!isValidPassword(user, password)) return res.send({status: "error", message: "La contraseña no es válida"});

        req.user = user;
        next();
    } catch(error) {
        next(error);
    }
}