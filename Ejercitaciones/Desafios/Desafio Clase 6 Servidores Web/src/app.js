import productManager from "./productManager.js";
import express from 'express';
const app = express();
const pm = new productManager("./")

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(8080, () => 
    console.log("Servicio arriba en el puerto 8080"));

app.get("/products", async(req, res) => { // http://localhost:8080/products?limit=3
    let consultas = req.query;
    
    let array = await pm.getProducts();

    if (!consultas.limit) {
        res.send({status: "Ok", message: array})
    } else {
        let limitedArray = array.slice(0, consultas.limit);
        res.send({status: "Ok", message: limitedArray})
    }

})

app.get("/products/:pid", async(req, res) => { // http://localhost:8080/products/1
    let pid = req.params.pid;
    pid = parseInt(pid);
    
    let product = await pm.getProductById(pid);

    res.send({status: "Ok", message: product})
})