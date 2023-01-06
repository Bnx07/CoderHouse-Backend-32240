let nombres = ["juan", "pepe", "jorge"];

if (nombres.includes("juan")) {
    console.log("La variable se encuentra presente");
} else {
    console.log("No está la variable");
}

console.log(nombres.indexOf("juan")) // Muestra la posicion

objetoPersonaCualq = {
    nombre: "pepe",
    apellido: "argento",
    edad: 25
}

let getValue = Object.entries(objetoPersonaCualq);
console.log("entries");
console.log(getValue); // Muestra todo

let getKey = Object.keys(objetoPersonaCualq);
console.log("keys");
console.log(getKey); // Muestra solo las keys

let obtainOnlyValues = Object.values(objetoPersonaCualq);
console.log("values")
console.log(obtainOnlyValues); // Muestra solo los valores

let valorTotal = obtainOnlyValues.reduce((valorInicio, valorAcumulado) => valorInicio + valorAcumulado);
console.log(valorTotal);

let objectECMA9P1 = {
    property1: 1,
    property2: "nombre",
    property3: true
}

let objectECMA9P2 = {
    property2: "apellido",
    property3: false,
    property4: [0,1,0,2,6,47,78]
}

let {property1, property2} = objectECMA9P1; // DESESTRUCTURA

let objectECMA9P3 = {...objectECMA9P1,...objectECMA9P2}

console.log(objectECMA9P3);

let objectECMA9P4 = {
    a: 1,
    b: 2,
    c: 3
}

let {a,...rest} = objectECMA9P4; // b: 2, c: 3;

console.log(rest);

const productos = [
    {
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

let allValues = Object.entries(productos);
let showValues = Object.values(allValues);
console.log(showValues);

let sumarValores = showValues.reduce((valorInit, valorSuma) => valorInit + valorSuma);
console.log(sumarValores);

let texto = "Benja            "; // Solo borra al comienzo o final y no al medio

console.log(texto.trim() + "Hola");

console.log(showValues.flat());

// let nulli = 0;
// let nulli2 = 0 || "nuloX_X";

// let nullish = variable??"nulo";

class Persona {
    #fullname ; // Variable privada dec antes de constructor y se le asignan esos 2 valores del constructor

    constructor (nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.#fullname = `${this.nombre} ${this.apellido}`;
    }

    getName() {
        return this.#fullname;
    }

    #methodName = () => {
        let suma;
        suma +=1;
        return suma;
    }
}

let persona1 = new Persona("Pepe", "Argento");
console.log(persona1.methodName);