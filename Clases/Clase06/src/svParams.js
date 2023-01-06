import express from 'express';
const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/query", (req, res) => { // http://localhost:8080/query?nombre=Benjamin
    let consultas = req.query;
    let {nombre, apellido, edad} = req.query;
    console.log(req.query); 
    res.send(req.query);
})

app.get("/parametros/:nombre", (req, res) => {
    console.log(req.params.nombre);
    res.send(`Nombre ${req.params.nombre}`); // http://localhost:8080/parametros/Benjamin
})

app.get("/masparametros/:nombre/:apellido", (req, res) => {
    console.log(req.params.nombre + " " + req.params.apellido);
    res.send(`Nombre ${req.params.nombre} y apellido ${req.params.apellido}`); // http://localhost:8080/parametros/Benjamin
})

app.listen(8080, () => 
    console.log("Servicio arriba en el puerto 8080"));