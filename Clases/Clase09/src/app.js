import express from 'express';
import path from 'path' // ?
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import foodRouter from './routes/views.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'views')));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars'); // Asi?

app.listen(8080, () => console.log("Server initiated in port 8080"));

app.use('/', foodRouter);

app.get('/', (req, res) => {
    res.render('register',
    {
        user: testUser,
        isAdmin:testUser.role==='admin',
        style: 'styles.css',
        food});
})

// npm install express express-handlebars
// npx nodemon app.js