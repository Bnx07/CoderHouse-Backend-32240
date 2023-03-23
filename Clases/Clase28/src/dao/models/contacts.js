import mongoose from 'mongoose';

const contactsCollection = 'users';
const contactsSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: {
        type: String,
        unique: true
    }

})

const contactsModel = mongoose.model(contactsCollection, contactsSchema);
export default contactsModel;