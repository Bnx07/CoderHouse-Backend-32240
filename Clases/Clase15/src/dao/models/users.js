import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    dni: Number,

    birthDay: Date,

    gender: {
        type: String,
        enum: ["M", "F"]
    }
    
})

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;