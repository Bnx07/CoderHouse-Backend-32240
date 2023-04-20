import express from 'express';
import cluster from 'cluster';
import { cpus } from 'os';

const threads = cpus().length;

if (cluster.isPrimary) {

    console.log("Soy primario");
    console.log(process.pid)
    for (let i = 0; i < threads; i ++)
    cluster.fork();

    console.log(threads);

} else {

    console.log("Me explotan laboralmente, no soy primario ni estoy en blanco");
    console.log(`El ID del worker es: ${process.pid}`);

    const app = express();

    app.get('/', (req, res) => res.send({status: "Ok", message: "Tenga respuesta"}));

    app.get('/operacionSencilla', (req, res) => {
        let sum = 1;
        for (let i = 0; i < 100000; i ++) {
            sum += sum + i;
        }

        res.send({status: "Ok", message: `La peticion fue atendida por ${process.pid} y el resultado fue ${sum}`})
    })

    app.get('/operacionCompleja', (req, res) => {
        let sum = 1;
        for (let i = 0; i < 5e8; i ++) {
            sum += sum + i;
        }

        res.send({status: "Ok", message: `La peticion fue atendida por ${process.pid} y el resultado fue ${sum}`})
    })

    app.listen(8080, () => console.log("Listening on port 8080"));
}

// En CMD usar: tasklist /fi "imagename eq node.exe"