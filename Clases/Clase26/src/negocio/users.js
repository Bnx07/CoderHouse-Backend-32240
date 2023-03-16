import { create as createUser, read as readUsers } from "../persistencia/users.js";

async function create(a, b) {
    let result = {
        a,
        b
    }

    await createUser(result)
    return result;
}

async function read() {
    return await readUsers();
}

export {
    create,
    read
}