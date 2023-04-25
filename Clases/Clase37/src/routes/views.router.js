import { Router } from "express";
import Users from "../dao/dbManagers/users.js"
import Courses from "../dao/dbManagers/courses.js"


const router = Router();
const usersManager =new Users();
const coursesManager =new Courses();


router.get('/',async (req,res)=> {
    let users =await usersManager.getAll();
    console.log(users);
    res.render ('users',{users})
})

router.get('/courses',async (req,res)=> {
    let courses =await coursesManager.getAll();
    console.log(courses);
    res.render (courses,{courses})
})

export default router;
