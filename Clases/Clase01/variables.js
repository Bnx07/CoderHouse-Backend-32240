// let NO es global, si no local

let i = 0;
function foo () {
    i = 1;
    let j = 2;

    if (true) {
        console.log(i) // 1
        console.log(j) // 2
    }
}

function foo2 () {
    let i = 0;

    if (true) {
        i = 1;
        console.log(i) // 1
    }
    console.log(i) // 0
}

function foo3 () {
    if (true) {
        let k = 0;
    }
    console.log(k) // i is not defined
}

const array = [1, 2, 3, 4] // Se pueden cambiar los valores dentro mientras que no se añadan más valores

// Se puede usar .pop y .push para const 

const userName = "manolo";
// userName = "pepe"; //typeError

const user = {name: "manolo", age: 20};
user.name = "pepe";

console.log(user); // { name: 'pepe', age: 20 }