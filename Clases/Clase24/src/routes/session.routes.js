import { Router } from "express";
import Users from "../dao/dbManagers/users.js"
import passport from 'passport';
import jwt from 'jsonwebtoken';
import cousersModel from "../dao/models/courses.js";

const router = Router();
const usersManager = new Users();

router.get('/', async (req,res)=> {
    let users =await usersManager.getAll();

    if(!users) return res.status(500).send ({ status:"error",error:"No pude traer informacion"})

    res.send({status:"success",payload:users})
})

router.post('/', async (req,res)=> {
 const {first_name,last_name,  email, dni,birthDate, gender} =req.body;
 let result =await usersManager.saveUser({
    first_name,
    last_name,
    email,
    dni,
    birthDate,
    gender
 })     
 res.send({status:"success",payload:result})

})

router.post('/register', passport.authenticate('register', {passReqToCallback: true, session: false, failureRedirect: '/api/users/failedRegister', failureMessage: true}), async(req, res) => {
    res.send({status: "Ok", message: "User registered succesfully", payload: req.user._id});
})

router.get('/failedRegister', (req, res) => {
    console.log(req.message);
    res.send("Register failed");
})

router.get('/failedLogin', (req, res) => {
    console.log(req.message);
    res.send("Login failed");
})

router.post('login', passport.authenticate('login', {passReqToCallback: true, failureRedirect: '/api/users/failedLogin'}), (req, res) => {
    const serializedUser = {
        id: req.user._id,
        name: `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.role,
        email: req.user.email
    }

    const token = jwt.sign(serializedUser, 'CoderSecretUser', {expiresIn: "1h"})

    res.cookie('coderCookie', token, {maxAge: 3600}).send({status: "Ok", payload: serializedUser});
})

router.post('/:uid/courses/:cid', async(req, res) => {
    const {uid, cid} = req.params;

    const courses =  await cousersModel.findOne({_id: id});
    if (!courses) return res.status(404).send({status: "error", error: "Course not found"});
    
    const user = await usersManager.getById(uid);
    if (!user) return res.status(404).send({status: "error", error: "User not found"});

    let courseExist = user.course.some(c._id.toString() === cid)
    if (!courseExist) return res.status(404).send({status: "erorr", error: "User doesnt exist in this course"});

    user.course.push(courses._id);
    courses.students.push(user._id);

    await usersManager.updateUser(uid, user);
    await cousersModel.updateOne({_id: cid}, {$set: courses});
    res.send({status: "Ok", message: "Se agrego al curso"});
})

export default router;