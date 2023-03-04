import mongoose from 'mongoose';

const userCollection = 'Users';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: {
        type: String,
    }
})

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;