import express from 'express';
import session from 'express-session';

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(session({
    secret: 'secretClase',
    resave: true, // Mantener activa la sesion
    saveUninitialized: true // Guardar el objeto de la sesion
}))

app.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se inicio sesion por ${req.session.counter} vez`);
    } else {
        req.session.counter = 1;
        res.send(`Bienvenido por primera vez`);
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(error => (!error) ? res.send("El logout ha funcionado") : res.send({status: 502, payload: "No se ha podido cerrar sesion", body: error}));
})

app.get('/login', (req, res) => {
    const {username, password} = req.body;
    if (username !== 'admin' || password !== 'admin') {
        return res.send('Login failed');
    }
        req.session.user = username;
        req.session.admin = true;
        res.send("Logged in");
})