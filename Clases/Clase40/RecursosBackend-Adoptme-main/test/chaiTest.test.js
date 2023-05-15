import mongoose from "mongoose";
import chai from 'chai';

import Users from "../src/dao/Users.dao.js";
import UserDTO from "../src/dto/User.dto.js";
import { createHash, passwordValidation } from '../src/utils/index.js';

const expect = chai.expect;

const mockUser = {
    first_name: "Coder",
    last_name: "House",
    email: "correo@gmail.com",
    password: "2"
}

describe("Pruebas con Chai dentro del DAO", () => {
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

    it("1. Validar los datos cuando están dentro del GET", async function() {
        const result = await this.userDao.get();
        expect(result).to.be.deep.equal([]);
        // expect(result).to.be.deep.equal([]);
    })

    it("2. El DAO va a insertar datos", async function() { // If
        const result = await this.userDao.get();
        expect(result).to.be.deep.equal([]);
    });

    it("3. El DAO va a borrar datos", async function() { // If
        const result = await this.userDao.get();
        expect(result).to.be.deep.equal([]);
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

        expect(user.email).to.be.equal(mockUser.email);
        // expect(user.email).to.be.equal("");
        // expect(user.email).to.deep.include("@");
    })

    it("5. Agregar usuario al DAO", async function() {
        const result = await this.userDao.save(mockUser);
        expect(mongoose.Types.ObjectId.isValid(result._id)).to.be.true;
    })
})