import Router from "express";
import Course from "../dao/dbManagers/courses.js";

const router = Router();

const coursesManager = new Course();

router.get('/', async(req, res) => {
    let courses = await coursesManager.getAll();
    res.send({status: "Ok", payload:courses});
})

router.post('/', async(req, res) => {
    const {title, description} = req.body;
    let newCourse = {
        title,
        description,
        teacher: 'Sin asignar'
    }

    const result = await coursesManager.saveCourse(newCourse);
    res.send({status: "Ok", payload: result})
})

export default router;