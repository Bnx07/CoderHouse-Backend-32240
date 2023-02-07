import mongoose from "mongoose";

mongoose.set("strictQuery", false); // Quita el warning

// import userModel from "./dao/models/user.model.js";

// const enviroment = async() => {
//     await mongoose.connect('mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority');
//     let response = await userModel.find().explain('executionStacks');

//     let response1 = await userModel.find({first_name: "Orly"}).explain('executionStacks');

//     console.log(response);
//     console.log(response1); // Es más rápido

// }

// enviroment();

import studentModel from "./dao/models/students.model.js";
import courseModel from "./dao/models/courses.model.js";

const enviroment = async() => {
    await mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority'); // mongodb.net/ecommerce?

    // await studentModel.create({
    //     first_name: "Benjamin",
    //     last_name: "Bastan",
    //     email: "benja@mail",
    //     gender: "M"
    // })

    // await courseModel.create({
    //     title: "Backend",
    //     description: "Un curso de Backend de JS",
    //     difficulty: "M",
    //     topic: ["JS", "Mongo", "DB"]
    // })

    let student = await studentModel.findOne({_id: "63e1a75744a675252771087d"});
    console.log(student);
    student.courses.push({course: "63e1a806df12ed607bd5217b"});

    let result = await studentModel.updateOne({_id: "63e1a75744a675252771087d"}, student);
    console.log(result);

    console.log("Done")
}

enviroment();