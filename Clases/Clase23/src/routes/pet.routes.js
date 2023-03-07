import { Router } from "express";

const router = Router();

let pets = [];

router.param("pet", (req, res, next, pet) => {
    console.log("Im a param :D");
})

router.post('/', (req, res) => {
    let {name, specie} = req.body;
    pets.push({name, specie});
    res.send("Agregado correctamente");
})

// router.get('/:pet([a-zA-z)+)', (req, res) => {
//     let position = pets.findIndex(element => element.name == pet);
//     res.send(pets[position]);
// })

// router.put('/:pet([a-zA-z)+)', (req, res) => {
//     let position = pets.findIndex(element => element.name == pet);
//     if (position != -1) {
//         pets[position].adopted = true;
//         return res.send("Done")
//     }

//     res.send("Pet not found");
// })

export default router;