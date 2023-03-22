import mongoose from 'mongoose';

export default class mongoSingleton {
    static #instance;

    constructor () {
        mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    }

    static getInstance() {
        if (this.#instance) {
            console.log("La conexión ya existe");
            return this.#instance;
        }
        this.#instance = new mongoSingleton();
        console.log("Connected");
        return this.#instance;
    }
}