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

describe("Tests Hash de DTO", async() => {
    describe("Tests localizadas del Hash", () => {
        it("Comparación entre pass y hash diferentes", async function() {
            const hash = await createHash(mockUser.password);
            expect(hash).to.not.equal(mockUser.password);
            expect(hash).to.have.length(60);
            expect(hash).to.be.a('string');
        })

        it("Comparacion pass y hash modificado", async function() {
            let hash = await createHash(mockUser.password);
            hash = hash+"a";
            const validar = await passwordValidation(mockUser, hash);
            expect(validar).to.be.false;
        })
    })
})