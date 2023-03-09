import mongoose from "mongoose";

const userCollection ='users';

const usersSchema = new mongoose.Schema({
    first_name: {
        type:String,
        require:true
    },
    last_name: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true,
        unique:true
    },
    age: Number,
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["student", "teacher"],
        default: "student"
    },
    courses: {
        type: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Courses'
            }
        ],
        default: []
    }
})

export const usersModel= mongoose.model (userCollection,usersSchema);