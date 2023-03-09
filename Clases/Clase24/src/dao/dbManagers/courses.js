import cousersModel from "../models/courses.js";

export default class Courses{
    constructor(){
        console.log(" Working in mongoDb")
    }

    getAll =async() =>{
        let courses = await cousersModel.find.lean().populate('students');
        return courses;
    }

    saveCourse =async course=>{
        let result = await cousersModel.create(course).populate('students');
        return result;
    } 

    updateCourse =async (id,course)=>{
        delete course._id; 
        let result = await cousersModel.updateOne({_id:id},{$set:course})
        return result;
    }

    getById = async(id) => {
        let course = await usersModel.find({_id: id}).populate('courses');
        return course;
    }
}