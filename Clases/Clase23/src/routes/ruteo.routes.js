import { Router } from "express";
// import jwt from 

export default class classRouter{
    constructor() {
        this.router = Router();
        this.init()
    }

    getRouter() {
        return this.router;
    }

    init(){}

    appyCallbacks(callbacks) {
        return callbacks.map((callback) => async(...params) => {
            try {
                await callback.apply(this, params);
                // params req, res, next
            } catch(error) {
                console.log(error);
            }
        })
    }

    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = payload => res.send({status: "Ok", payload})
        res.sendServerError = error => res.status(500).send({status: "error", error})
        res.sendUserError = error => res.status(400).send({status: "error", error})
        next();
    }

    handlePolices = policies => (req, res, next) => {
        if (policies[0] == "PUBLIC") return next();
        const authHeaders = req.headers.authorization;
        if (!authHeaders) res.status(401).send({status: "error", error: "No está autorizado"});
        const token = authHeaders.split(" ")[1];

        let user = jwt.verify(token, 'CoderTest');

        if (policies.includes(user.role.toUpperCase())) res.status(403).send({status: "error", error: "No está autorizado"});
    }

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolices(policies), this.generateCustomResponses, this.appyCallbacks(callbacks));
    }

    post(path, policies, ...callbacks) {
        this.router.post(path, this.handlePolices(policies), this.generateCustomResponses, this.appyCallbacks(callbacks));
    }

    put(path, ...callbacks) {
        this.router.put(path, this.generateCustomResponses, this.appyCallbacks(callbacks));
    }

    delete(path, ...callbacks) {
        this.router.delete(path, this.generateCustomResponses, this.appyCallbacks(callbacks));
    }
}