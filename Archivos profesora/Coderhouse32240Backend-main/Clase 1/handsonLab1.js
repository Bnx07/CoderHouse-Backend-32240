class Contador {
    constructor(nombre){
        this.nombre=nombre;
    }
    static init =0;
    suma(){ Contador.init++
    console.log(`Quien sumo ${this.nombre} el contador ${Contador.init}`)
}
}
let resultado = new Contador("Mariano");
resultado.suma();