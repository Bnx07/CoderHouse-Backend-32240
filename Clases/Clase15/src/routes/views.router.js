import Router from "express";
import User from "../dao/dbManagers/users.js";
import Course from "../dao/dbManagers/courses.js";

const router = Router();

const userManager = new User();
const courseManager = new Course();

router.get('/', async(req, res) => {
    let users = await userManager.getAll();
    console.log(users);

    res.render(users, {users});
})

router.get('/courses', async(req, res) => {
    let courses = await courseManager.getAll();
    console.log(courses);

    res.render(courses, {courses});
})

export default router;