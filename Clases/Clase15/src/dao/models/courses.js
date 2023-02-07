import mongoose from 'mongoose';

const courseCollection = 'courses';

const courseSchema = new mongoose.Schema({ // Swapear con el otro schema
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    teacher: {
        type: String
    }
})

const courseModel = mongoose.model(courseCollection, courseSchema); // ERROR EN ESTA LINEA, en .model más exactamente

export default courseModel;