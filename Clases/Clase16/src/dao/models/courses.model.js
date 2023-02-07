import mongoose from 'mongoose';

const courseCollection = 'courses';

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    difficulty: String,
    topic: {
        type: Array,
        default: []
    },
    students: {
        type: Array,
        default: []
    }
})

const courseModel = mongoose.model(courseCollection, courseSchema);

export default courseModel;