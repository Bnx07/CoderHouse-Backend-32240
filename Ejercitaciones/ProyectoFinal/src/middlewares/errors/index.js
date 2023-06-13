import { errorCodes } from "../../utils/errors.js";

export default (error, req, res, next) => {
    req.logger.info(error.cause);
    console.log(error)
    switch (error.code){
        case errorCodes.INVALID_TYPES_ERROR:
            res.status(error.status).send({status: "error", error: error.name, details: error.message});
            break;
        case errorCodes.DATABASE_ERROR:
            res.status(error.status).send({status: "error", error: error.name || "Ha ocurrido un error con la base de datos", details: error.message});
            break;
        case errorCodes.MISSING_DATA:
            res.status(error.status).send({status: "error", error: error.name || "hay datos que no han sido enviados", details: error.message});
            break;
        case errorCodes.RENDERING_ERROR:
            res.render('error');
            break;
        case errorCodes.ROUTING_ERROR:
            res.render('unauthorized');
            break;
        default:
            req.logger.fatal(error);
            res.status(500).send({status: "error", error: "Error desconocido"});
    }
}