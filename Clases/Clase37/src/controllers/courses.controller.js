import { courseService } from "../repositories/services.js"

const getCourses = async(req, res) => {
    let courses = await courseService.getCourses();
    res.send({status: "Ok", payload: courses});
}

const createCourses = async(req, res) => {

}