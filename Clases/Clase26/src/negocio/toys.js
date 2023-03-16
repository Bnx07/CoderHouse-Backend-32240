import { create as createToy, read as readToys } from "../persistencia/toys.js";

async function create(a, b) {
    let result = {
        a,
        b
    }

    await createToy(result);
    return result;
}

async function read() {
    return await readToys();
}

export {
    create,
    read
}