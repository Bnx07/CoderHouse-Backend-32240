import supertest from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';

import cartModel from '../src/dao/models/carts.js';
import userModel from '../src/dao/models/users.js';
import productsModel from '../src/dao/models/products.js';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

const user = {
    first_name: "Benjamin",
    last_name: "Bastan",
    email: "benjabastan1234@gmail.com",
    password: "1234"
}

describe("Pruebas con supertest", () => {
    
    const user = {
        first_name: "Benjamin",
        last_name: "Bastan",
        email: "benjabastan@gmail.com",
        password: "1234"
    }

    const product = {
        title: "Potato the potato",
        description: "An awesome RPG about being a potato",
        price: 100,
        stock: 20,
        code: "p0t4t0"
    }

    let coderCookie;
    let oldUser;
    let pid;
    let cid;

    before(async function() {
        await mongoose.connect("mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/test?retryWrites=true&w=majority");
        await cartModel.deleteMany({});
        await productsModel.deleteMany({});
        await userModel.deleteMany({});
    })

    describe("Pruebas para session", () => {

        it('1. POST /api/session/register', async() => {
            const response = await requester.post("/api/session/register").send(user);

            expect(response._body.status).to.eql("Ok");
            expect(response._body.message).to.have.property('cart').to.have.length(24);
        })

        it('2. POST /api/session/login', async() => {
            const response = await requester.post("/api/session/login").send({email: user.email, password: user.password});

            coderCookie = response.headers['set-cookie'][0];

            expect(response._body.status).to.eql("Ok");
            expect(response.headers).to.have.property('set-cookie').to.have.length(1);
            
            cid = response._body.payload.cart[0];
        })

        it('3. POST /api/session/login', async() => {
            const response = await requester.post("/api/session/login").send({email: user.email, password: user.password+"10"});

            expect(response._body.status).to.eql("error");
            expect(response.headers).to.not.have.property('set-cookie');
            expect(response._body).to.have.property('message');
        })

        it('4. GET /api/session/current', async() => {
            const response = await requester.get('/api/session/current').set("Cookie", [coderCookie]);

            expect(response._body).to.have.property('first_name');
            expect(response._body).to.have.property('last_name');
            expect(response._body).to.have.property('email');
            expect(response._body).to.have.property('role');

            oldUser = response._body;
        })

        it('5. POST /api/session/premium/:uid', async() => {
            const response = await requester.post(`/api/session/premium/${user.email}`).set("Cookie", [coderCookie]);

            expect(response._body.status).to.eql("Ok");
            expect(response._body).to.have.property('message');

            coderCookie = response.headers['set-cookie'][0];

            const modifiedUser = await requester.get('/api/session/current').set("Cookie", [coderCookie]);
            expect(modifiedUser._body).to.have.property('role').and.not.eql(oldUser.role);
        })
    })

    describe("Pruebas para products", () => {
        
        it('1. GET /api/products', async() => {
            const response = await requester.get('/api/products');

            expect(response._body).to.have.property('status').to.be.eql("Ok");
            expect(response._body).to.have.property('totalPages').to.be.greaterThanOrEqual(1);
        })

        it('2. GET /api/products/mockProducts', async() => {
            const response = await requester.get('/api/products/mockProducts');

            expect(response._body).to.have.property('status').to.be.eql("Ok");
            expect(response._body.payload).to.have.property('totalDocs').to.be.eql(100);
            expect(response._body.payload).to.have.property('page').to.be.eql(1);
        })

        it('3. POST /api/products/', async() => {
            const response = await requester.post('/api/products/').send(product).set('Cookie', []);

            expect(response._body).to.have.property('status').to.be.eql("error");
            expect(response._body).to.not.have.property('payload');
        })

        it('4. POST /api/products/ with cookie', async() => {
            const response = await requester.post('/api/products/').send(product).set('Cookie', [coderCookie]);

            expect(response._body).to.have.property('status').to.be.eql("Ok");
            expect(response._body.payload).to.have.property('owner').to.be.eql(user.email);

            pid = response._body.payload._id
        })

        it('4. POST /api/products/ with repeated code', async() => {
            const response = await requester.post('/api/products/').send(product).set('Cookie', [coderCookie]);

            expect(response._body).to.have.property('status').to.be.eql("error");
        })

        it('5. DELETE /api/products/:pid', async() => {
            const response = await requester.del(`/api/products/${pid}`).set('Cookie', [coderCookie]);

            expect(response._body.status).to.be.eql("Ok")
            expect(response._body.payload).to.have.property('acknowledged').to.be.true;
            expect(response._body.payload).to.have.property('deletedCount').to.be.eql(1);
        })

        it('6. POST /api/products/ with cookie again', async() => {
            const response = await requester.post('/api/products/').send(product).set('Cookie', [coderCookie]);

            expect(response._body).to.have.property('status').to.be.eql("Ok");
            expect(response._body.payload).to.have.property('owner').to.be.eql(user.email);

            pid = response._body.payload._id
        })
    })

    describe("Pruebas para carts", () => { // GET Add product Delete product

        it('1. GET /api/carts', async() => {
            const response = await requester.get('/api/carts');
            expect(response._body).to.have.property('status').to.be.eql("Ok");
            expect(response._body).to.have.property('payload').to.be.a('array')
        })

        it('2. PUT /api/carts/:cid with own product', async() => {
            const response = await requester.put(`/api/carts/${cid}`).send([{_id: pid, quantity: 1}]).set('Cookie', [coderCookie]);
            expect(response._body).to.have.property('status').to.be.eql("error");
            expect(response._body).to.have.property('message');
        })

        it('3. PUT /api/carts/:cid', async() => { // Por motivos de comodidad del test, se modifica el producto desde aca directo a la DB y no en una petición del servidor
            await productsModel.updateOne({_id: pid}, {$set: {owner: "pacoPerez@gmail.com"}});

            const response = await requester.put(`/api/carts/${cid}`).send([{_id: pid, quantity: 1}]).set('Cookie', [coderCookie]);

            expect(response._body).to.have.property('acknowledged').to.be.true;
            expect(response._body).to.have.property('modifiedCount').to.be.eql(1);
        })

        it('4. DELETE /api/carts/:cid/products/:pid', async() => {
            const response = await requester.delete(`/api/carts/${cid}/product/${pid}`).set('Cookie', [coderCookie]);

            expect(response._body).to.have.property('status').to.be.eql("Ok");
            expect(response._body).to.have.property('payload').to.have.property('acknowledged').to.be.true;
            expect(response._body).to.have.property('payload').to.have.property('modifiedCount').to.be.eql(1);
        })
    })
})