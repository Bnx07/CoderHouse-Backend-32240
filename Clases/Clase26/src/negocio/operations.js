import { save, list } from "../persistencia/operations.js";

async function sumar(a, b) {
    let result = suma(a+b)

    await save({
        type: "suma",
        params: [a, b],
        result: result
    })
    return result;
}

async function listar() {
    return await list();
}

export {
    sumar,
    listar
}