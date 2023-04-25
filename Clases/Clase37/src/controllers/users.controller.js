import { userService, courseService } from "../repositories/services.js";
import MailingService from "../services/mailling.js";

const getUsers = async(req, res) => {
    let users = await userService.getUser();
    if (!users) return res.status(500).send({status: "error", error: "DB empty"});
    res.send({status: "Ok", payload: users});
}

const addUserToCourse = async(req, res) => {
    const { uid, cid } = req.params;
    
    const course = await courseService.getOne(cid);
    if (!course) return res.status(400).send({status: "error", error: "Course not found"});

    const user = await userService.getBy({_id: uid});
    if (!user) return res.status(400).send({status: "error", error: "User not found"});

    let courseExists = user.courses.some(course => course._id.toString() === cid);
    if (courseExists) res.status(400).send({status: "error", error: "Already in course"});

    user.courses.push(cid);
    course.students.push(uid);

    await userService.update(uid, user);
    await courseService.update(cid, course);

    const mailer = new MailingService();
    const result = await mailer.sendSimpleMail({
        from: "CoderTest",
        to: "benjabastan@gmail.com", // user.email
        subject: "Curso registrado",
        html: `<h1>Has sido registrado al curso</h1>`
    })

    console.log(result, " // Registro de usuario a curso");
    res.send({status: "Ok", message: "Has sido agregado al curso"});
}

const createUser = async(req, res) => {
    let {first_name, last_name, email, dni, birthDate, gender} = req.body;
    if (!first_name, !last_name, !email, !dni, !birthDate, !gender) return res.status(400).send("Fill all inputs");

    let result = await userService.createUser({
        first_name,
        last_name,
        email,
        dni,
        birthDate,
        gender
    });

    if (!result) return res.status(500).send({status: "error", error: "Algo salio mal en la creacion del usuario"});
    res.send({status: "Ok", payload: result});
}

export { addUserToCourse, getUsers, createUser };