let variable=0;
let variableAsig=variable || "nuloX_x";

let variableNullish=variable??"nulo";

class Persona{
     #fullname ; // variable privada

     constructor(nombre,apellido){
        this.nombre=nombre;
        this.apellido=apellido;
        this.#fullname= `${this.nombre} ${this.apellido}`
     }

     getnombreFull=() =>{
        return this.#fullname;
     }

     #metodoPrivadoNombre= () =>{
        let suma;
        suma =suma+1;
     }
}

let variableNombre= new Persona('Pepito','Perez');
console.log(variableNombre.getnombreFull()) //Pepito Perez
