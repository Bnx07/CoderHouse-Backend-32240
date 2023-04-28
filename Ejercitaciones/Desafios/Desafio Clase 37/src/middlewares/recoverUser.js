import userManager from "../dao/dbManagers/users.js";
import { isValidPassword } from "../utils/utils.js";

const um = new userManager();

export const recoverUser = async(req, res, next) => {
    req.logger.debug("Estoy en el middleware del recover");
    const {email, password} = req.body;
    
    try {
        const user = await um.getOne({email});
        if (!user) {
            req.logger.info("El usuario no existe");
            return res.send({status: "error", message: "El usuario no existe"});
        }

        if (isValidPassword(user, password)) return res.send({status: "error", message: "La contraseña no fue modificada"});

        req.user = user;
        next();
    } catch(error) {
        next(error);
    }
}