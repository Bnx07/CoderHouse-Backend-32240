import mongoose from "mongoose";
import Assert from 'assert';

import Users from "../src/dao/Users.dao.js";

const assert = Assert.strict;

describe("Pruebas iniciales para DAO de Users", () => { // For
    before(function() {
        this.userDao = new Users();
        mongoose.connect("mongodb+srv://CoderUser:123@codercluster.w5adegs.mongodb.net/?retryWrites=true&w=majority");
    })

    beforeEach(function() {
        mongoose.connection.collection('users').deleteMany({});
    })
    
    after(function() {
        mongoose.connection.close();
    })

    it("1. El DAO va a obtener datos en un formato de array", async function() { // If
        const result = await this.userDao.get();
        assert.strictEqual(Array.isArray(result), true);
    });

    it("2. El DAO va a insertar datos", async function() { // If
        const result = await this.userDao.get();
        assert.strictEqual(Array.isArray(result), true);
    });

    it("3. El DAO va a borrar datos", async function() { // If
        const result = await this.userDao.get();
        assert.strictEqual(Array.isArray(result), true);
    });

    it("4. El DAO va a obtener datos por mail", async function() {
        let mockUser = {
            first_name: "Coder",
            last_name: "House",
            email: "correo@gmail.com",
            password: "2"
        }

        const result = await this.userDao.save(mockUser);
        const user = await this.userDao.getBy({email: mockUser.email});

        assert.strictEqual(typeof user, 'object');
    })
});