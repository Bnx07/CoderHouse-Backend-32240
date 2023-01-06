const suma = (n1, n2) => {
    return new Promise((resolve, reject) => {
        if (n1 === 0 || n2 === 0) {
            reject("Operación innecesaria");
        } else {
            resolve(n1 + n2);
        }
    })
}

const funcionSumar = async() => {
    try {
        let resultado = await suma(10, 20);
        console.log(resultado);
    }
    catch(error) {
        console.log(error);
    }
}

const resta = (n1, n2) => {
    return new Promise((resolve, reject) => {
        if (n1 === 0 || n2 === 0) {
            reject("Operación innecesaria");
        } else if (n1 < n2) {
            reject("El resultado solo puede dar numeros positivos");
        } else {
            resolve(n1 - n2);
        }
    })
}

const funcionRestar = async() => {
    try {
        let resultado = await resta(20, 10);
        console.log(resultado);
    }
    catch(error) {
        console.log(error);
    }
}

const multiplicacion = (n1, n2) => {
    return new Promise((resolve, reject) => {
        if (n1 === 0 || n2 === 0) {
            reject("Operación innecesaria");
        } else if (n1 < 0 || n2 < 0) {
            reject("Los numeros tienen que ser positivos");
        } else {
            resolve(n1*n2)
        }
    })
}

const funcionMultiplicar = async() => {
    try {
        let resultado = await multiplicacion(5, 4);
        console.log(resultado); 
    }
    catch(error) {
        console.log(error);
    }
}

// let trySuma = suma(500,10).then(resultado=>{
//     console.log(resultado);
// })

// let trySuma2 = suma(500,10).catch(error=>{
//     console.log(error); 
// });

// console.log(pruebaSum);

// const funcionAsincrona = async() => {
//     try {
//         let resultado=await dividir(5,10);
//         console.log(resultado);
//     } 
//     catch(error) {
//         console.log(error);
//     }
// }
// funcionAsincrona();

funcionSumar();

funcionRestar();

funcionMultiplicar();