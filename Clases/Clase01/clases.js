class people {
    constructor(valor) {
        this.var = valor;
    }

    static soyEspecie = "humano";

    saludar = () => {
        console.log(`Hola, soy ${this.var}`);
    }

    especie = () => {
        console.log(`Soy un ${people.soyEspecie}`);
    }
}

let persona = new people("Jorge");

persona.saludar();
persona.especie();

console.log("");
console.log("");
console.log("");
console.log("");

class claseContador {
    static contador = 0;
    static soyUn = "contador"

    contadorParte = () => {
        claseContador.contador ++;
        console.log(`Vamos por el numero ${claseContador.contador} y te lo dice tu ${claseContador.soyUn} de confianza`)
    }
}

let counter = new claseContador();

counter.contadorParte();
counter.contadorParte();
counter.contadorParte();
