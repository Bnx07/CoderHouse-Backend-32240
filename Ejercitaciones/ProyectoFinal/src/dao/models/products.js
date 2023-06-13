import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    thumbnails: {
        type: String,
        default: '/userImages/images/defaultProduct.jpg'
    },

    owner: {
        type: String,
        default:  "Admin"
    }
})

productSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(productsCollection, productSchema);

export default productsModel;