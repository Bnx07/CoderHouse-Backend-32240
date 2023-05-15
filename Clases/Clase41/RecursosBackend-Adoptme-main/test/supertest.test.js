import supertest from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe("Pruebas con supertest", () => {

    describe("Pruebas para mascotas", () => {

    //     it('1. GET /api/pets con statusCode 200', async() => {
    //         const response = await requester.get("/api/pets");

    //         expect(response.statusCode).to.equal(200);
    //         expect(response).to.have.property('status');
    //     })

    //     it('2. POST /api/pets con mascota completa', async() => {
    //         const mockPet = {
    //             name: "Pesho",
    //             specie: "Dog",
    //             birthDate: "12-16-2020"
    //         }

    //         const { statusCode, _body, ok} = await requester.post("/api/pets").send(mockPet);

    //         expect(statusCode).to.equal(200);
    //         expect(_body.payload).to.have.property("adopted").to.be.false;
    //     })

    //     it('3. POST /api/pets con mascota sin nombre', async() => {
    //         const mockPet = {
    //             specie: "Dog",
    //             birthDate: "12-16-2020"
    //         }

    //         const { statusCode, _body, ok} = await requester.post("/api/pets").send(mockPet);

    //         // console.log(`${statusCode} - ${ok}`);
    //         // console.log(_body);

    //         expect(statusCode).to.equal(400);
    //     })

    //     it('4. PUT /api/pets para cambiar nombre', async() => {
    //         const newPet = {
    //             name: "Fatiga",
    //             specie: "Dog",
    //             birthDate: "12-16-2020"
    //         }

    //         const modifiedPet = {
    //             name: "Pepe"
    //         }

    //         const createdPet = await requester.post('/api/pets').send(newPet);

    //         const response = await requester.put(`/api/pets/${createdPet._body.payload._id}`).send(modifiedPet);

    //         // console.log(`${statusCode} - ${ok}`);
    //         console.log(response._body);
    //     })

            it("3. POST /api/pets/withimage", async() => {
                const mockPet = {
                    name: "Pesho",
                    specie: "Dog",
                    birthDate: "12-16-2020"
                }

                const result = await requester.post("/api/pets/withimage")
                    .field("name", "Somebody")
                    .field("specie", "Toucan")
                    .field("birthDate", "12-16-2020")
                    .attach("image", "./src/public/img/1671549990926-coderDog.jpg");
                
                expect(result._body.payload.image).to.be.ok;
            })
    })

    describe("Pruebas para usuarios", () => {

        before(async function() {
            await mongoose.connect("mongodb+srv://CoderUser:123@codercluster.w5adegs.mongodb.net/?retryWrites=true&w=majority");
        })

        // beforeEach(async function() {
        //     await mongoose.connection.collection('user').deleteMany({});
        // })

        // it("1. GET /api/sessions/register en DB", async() => {
        //     const user = {
        //         first_name: "Coder",
        //         last_name: "User",
        //         email: "pepe@gmail.com",
        //         password: "1234"
        //     }

        //     await mongoose.connection.collection("user").deleteMany({})
        //     const { statusCode, ok, _body} = await requester.post("/api/sessions/register").send(user);

        //     console.log(`${statusCode} - ${ok}`);
        //     console.log(_body);
        // })

        // it("2. GET /api/sessions/login en DB", async() => {
        //     const user = {
        //         email: "pepe@gmail.com",
        //         password: "1234"
        //     }

        //     const result = await requester.post("/api/sessions/login").send(user);

        //     // console.log(result)

        //     // console.log(`${statusCode} - ${ok}`);
        //     // console.log(_body);
        // })
    })
})