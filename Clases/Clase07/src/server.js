const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let frase = ["Frase", "inicial"];

app.get("/api/frase", (req, res) => { // FUNCIONA
    let object = {
        frase: frase
    }

    res.send({status:"Ok",message:object});
})

app.get("/api/palabras/:pos", (req, res) => {
    let position = req.params.pos;
    position = position.slice(1);
    position = parseInt(position);

    if (position > frase.length) {
        return res.status(400).send({status:"error",error:"Información erronea"});
    }

    res.send({status:"Ok",message:frase[position-1]}); // Esto tenia que ser -1 no +1 para que lea la posicion que debe
})

app.post("/api/palabras", (req, res) => {
    let consultas = req.query;
    if (!consultas.palabra) {
        return res.status(400).send({status:"error",error:"Información erronea"});
    }

    let newFrase = frase;
    newFrase.push(consultas.palabra);
    res.send({status:"Ok",message:newFrase});
})

app.put("/api/palabras/:pos", (req, res) => {
    
})

app.delete("/api/palabras/:pos", (req, res) => {
    let position = req.params.pos;
    let newFrase = frase;
    newFrase.splice(position+1, 1)
    res.send({status:"Ok",message:newFrase});
})

app.listen(8080, () => 
    console.log("Servicio arriba en el puerto 8080"));