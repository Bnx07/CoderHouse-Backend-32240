import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: [],
        required: true
    }
}, {strictPopulate: false})

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;