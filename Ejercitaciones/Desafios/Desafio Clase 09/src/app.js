import express from 'express';
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.routes.js';
import path from 'path';

const app = express();

import __dirname from './utils.js';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "./public"))); // Si public va afuera de src poner ../ para que salga de la carpeta src al buscar el archivo
// app.use(express.static(`${__dirname}/public`))
// app.use('/static', express.static(__dirname + '/public'))

app.use('/api/carts', cartRouter); // Desde localhost:8080/api/users se accede a lo de users.routes.js
app.use('/api/products', productsRouter);
app.get('/', (req, res) => {
    res.send('Acceda a /api/carts o a /api/products');
})

app.listen(8080, () => console.log("Server initiated in port 8080"));