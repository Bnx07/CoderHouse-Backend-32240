import mongoose from 'mongoose';

const userCollection = 'Users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    cart: {
        type: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'carts'
            }
        ],
        default: []
    },
    role: {
        type: String,
        default: 'user'
    },
    last_connection: {
        type: String
    },
    documents: {
        type: [
            {
                name: String,
                reference: String
            }
        ],
        default: []
    }
})

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;