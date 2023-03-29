import mongoose from 'mongoose';

const collection = 'orders';
const schema = new mongoose.Schema({
    number: Number,
    bussiness: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'bussiness'
        }
    ],
    user: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Orders'
        }
    ],
    products: [],
    totalPrice: Number
})

const orderModel = mongoose.model(collection, schema);
export default orderModel;