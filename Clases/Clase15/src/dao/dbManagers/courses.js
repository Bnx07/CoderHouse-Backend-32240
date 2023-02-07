import courseModel from "../models/courses.js";

export default class Course {
    constructor() {
        console.log("Working in MongoDB");
    }

    getAll = async() => {
        let courses = await courseModel.find.lean();
        return courses;
    }

    saveCourse = async course => {
        let result = await courseModel.create(course);
        return result;
    }

    updateCourse = async(id) => {
        let result = await courseModel.updateOne({_id: id});
        return result;
    }
}