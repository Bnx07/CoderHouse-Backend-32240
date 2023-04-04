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

const sum = (...nums) => {
    if (nums.length == 0) return 0;
    if (!nums.every(nums=>typeof nums == "number")) return null;
    return nums.reduce((prev, current) => prev+current);
}

console.log("<------------Initial test------------>");

console.log("<------------Test 1------------>");

let result = sum(2, "2");

let test = 0;

if (result == null) {
    console.log("Test 1 aprobado");
    test++;
} else {
    console.log("El test no ha pasado porque null was expected");
}

console.log("<------------Test 2------------>");

let result2 = sum();

if (result2 == 0) {
    console.log("Test 2 aprobado");
    test++;
} else {
    console.log("El test 2 no ha pasado porque 0 was expected");
}

console.log("<------------Test 3------------>");

let result3 = sum(3, 3);

if (result3 == 6) {
    console.log("Test 3 aprobado");
    test++;
} else {
    console.log("El test 3 no ha pasado porque 6 was expected");
}

console.log("<------------Test 4------------>");

let result4 = sum(1, 2, 3, 4, 5);
if (result4 == 15) {
    console.log("Test 4 aprobado");
} else {
    console.log("El test 4 no se ha pasado porque 15 was expected");
}

console.log("<------------Test 5------------>");

let result5 = sum(1, 2, 3, 4, -5);
if (result5 == 5) {
    console.log("Test 5 aprobado");
} else {
    console.log("El test 5 no se ha pasado porque 5 was expected");
}