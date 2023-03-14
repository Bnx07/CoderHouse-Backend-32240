import express from "express";

const app = express();

let operacion = () => {
    let result = 0;
    for (let i = 0; i<5e9; i++){
        result += i;
    }
    return result;
}

app.get('/suma', (req, res) => {
    const result = operacion();
    res.send('El resultado es ' + result);
})

const httpServer = app.listen(8080, () => console.log(`Listening on port 8080`));

// process.on('exit', code => {
//     console.log('Finalizo antes de terminar el proceso');
// })

// process.on('uncaughtException', exception => {
//     console.log('Control de excepciones');
// })

// process.on('message', message => {
//     console.log("Este se ejecutara cuando reciba un mensaje de otro proceso");
// })

// console();