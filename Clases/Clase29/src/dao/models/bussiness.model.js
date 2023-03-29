import mongoose from 'mongoose';

const collection = 'bussiness';
const schema = new mongoose.Schema({
    name: String,
    products: []
})

const bussinessModel = mongoose.model(collection, schema);
export default bussinessModel;