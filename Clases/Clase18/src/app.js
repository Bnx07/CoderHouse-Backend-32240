import express from "express";
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

// import cookiesapp from './routes/cookies.routes.js';

const port = 8080;
const app = express();

app.engine('handlebars', handlebars.engine());
app.set("view engine", 'handlebars');
app.set("views", __dirname + '/views');
// app.use('/', cookiesRouter);

app.use(cookieParser("CoderS3cret"));

app.get('/setCookie', (req, res) => {
    res.cookie('CookiePrueba', 'Hola galleta (No mundo)', {maxAge: 10000}).send("Cookie");
});

app.get('/getCookie', (req, res) => {
    res.send(req.cookies.CookiePrueba);
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('CookiePrueba').send('Había cookie');
})

app.get('/setSignedCookie', (req, res) => {
    res.cookie('SignedCookie', 'H0la gall3ta firmada', {maxAge: 10000, signed: true}).send("Signed cookie");
})

app.get('/getSignedCookie', (req, res) => {
    res.send(req.signedCookies.signedCookie);
})

app.get('/cookieForm', (req, res) => {
    res.render('home');
})

let array = [];

app.post('/cookieCreation', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

const httpServer = app.listen(port, () => console.log(`Listening on port ${port}`));
