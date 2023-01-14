import express from 'express';

const router = express.Router();

let users = [
    {
        name: 'Benjamin',
        lastname: 'Bastan',
        age: 18,
        mail: 'a@gmail.com',
        phone: 1,
        role: 'admin'
    },
    {
        name: 'Martin',
        lastname: 'Pelleritti',
        age: 18,
        mail: 'b@gmail.com',
        phone: 2
    },
    {
        name: 'Camila',
        lastname: 'Grilletti',
        age: 17,
        mail: 'c@gmail.com',
        phone: 3
    },
    {
        name: 'Santiago',
        lastname: 'Amengual',
        age: 18,
        mail: 'd@gmail.com',
        phone: 4
    },
    {
        name: 'Agustina',
        lastname: 'Pintos',
        age: 25,
        mail: 'e@gmail.com',
        phone: 5
    }
]

let food = [
    {name: 'taco'},
    {name: 'Hamburguesa'},
    {name: 'Pizza'}
]


router.get('/', (req, res) => {
    let testUser = users[Math.floor(Math.random() * users.length)]
    res.render('index',
    {
        user: testUser,
        isAdmin:testUser.role==='admin',
        style: 'styles.css',
        food});
})

export default router;