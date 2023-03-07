import classRouter from "./ruteo.routes.js";

const router = new classRouter();

export default class wordRouter extends classRouter{
    init() {
        this.get('/', ["PUBLIC"], (req, res) => {
            res.sendSuccess("Hola, estoy probando una nueva forma con control de errores de Custom Responses");
        })

        this.get('/currentUser', ["USER", "USER_PREMIUM"], (req, res) => {
            res.sendSuccess(req.user);
        })
    }
}

// router.param("id", (req, res, next, id) => {
//     console.log("Esta es la funcion con el param");
//     next();
// })

// router.get('/input/:word([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC%]+)', (req, res) => {
//     let {word} = req.params;
//     res.send(word);
// })

// router.delete('/input/:word([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC%]+)', (req, res) => {
//     let {word} = req.params;
//     res.send(word);
// })

// router.get('/:id([a-z]+)', async(req, res) => {
//     console.log("Esta es la funcion con el get");
//     res.send("Hi")
// })

// router.get('*', (req, res) => {
//     res.status(404).send("El valor enviado no es válido");
// })

// export default router;