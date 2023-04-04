console.log("");

// Ejemplo 1 de suma

// const sum = (a, b) => {
//     let suma;
//     if (!a || !b) return 0;
//     if (typeof a != "number" || typeof b != "number") return null;
//     if (a > 0 && b > 0) {
//         suma = a+b;
//     }
//     return suma;
// }

const validate = (user, password) => {
    if (!user) return false;
    if (!password) return null;
    if (user != "coderUser") return "BadUser";
    if (password != "123") return "BadPassword";
    return "Ok";
}

console.log("<------------Initial test------------>");

console.log("<------------Test 1------------>");

let result = validate("coderUser");

let test = 0;

if (result == null) {
    console.log("Test 1 aprobado");
    test++;
} else {
    console.log("No se ha proporcionado un password");
}

console.log("<------------Test 2------------>");

let result2 = validate();

if (result2 == false) {
    console.log("Test 2 aprobado");
    test++;
} else {
    console.log("No se ha proporcionado un user");
}

console.log("<------------Test 3------------>");

let result3 = validate("coderUser", "password");

if (result3 == "BadPassword") {
    console.log("Test 3 aprobado");
    test++;
} else {
    console.log("Contraseña incorrecta");
}

console.log("<------------Test 4------------>");

let result4 = validate("ada", "adwas");
if (result4 == "BadUser") {
    console.log("Test 4 aprobado");
} else {
    console.log("Credenciales incorrectas");
}

console.log("<------------Test 5------------>");

let result5 = validate("coderUser", "123");
if (result5 == "Ok") {
    console.log("Test 5 aprobado, logged in");
} else {
    console.log("El test 5 no se ha pasado porque se esperaba aprobado");
}