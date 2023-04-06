import express from 'express';
import compression from 'express-compression';

const app = express();

// app.use(compression()); // Punto medio
app.use(compression({ // Comprime más pero consume más RAM
    brotli: {enabled: true, zlib: {}}
}))

app.get('/stringdemasiaolargo', (req, res) => {
    let resultado = "Soy un string que es demasiado largo y no deberia enviarse como una cadena de texto pero bueno ahi vas vos enviando el texto porque pinto <br>";
    for (let i=0; i < 5e4; i++) {
        resultado += "Y bueno pasa que soy un string que es demasiado largo y no deberia enviarse como una cadena de texto pero bueno ahi vas vos enviando el texto porque pinto xD, querés un mate por mientras? <br>";
    }
    res.send(resultado); // Pasa de 9.7 MB a 37.9 kB y a 468 B
})

const server = app.listen(8080, () => console.log("Listening on port 8080"));