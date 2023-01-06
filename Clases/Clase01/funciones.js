function switchNum (num1, num2, op) {
    switch (op) {
        case ("suma"):
            console.log(num1+num2);
            break;
        case ("resta"):
            console.log(num1-num2);
            break;
    }
}

switchNum(1, 3, "suma");

const arrowFunction = argumento => {
    console.log(`${argumento} gente que tal andan`);
}

arrowFunction("Hola");

function recorrerArray (arg) {
    let i;

    for (i = 0; i < arg.length; i++) {
        console.log(`Elemento ${i+1} equivale a ${arg[i]}`);
    } 
}

recorrerArray([1,2,3,4]);