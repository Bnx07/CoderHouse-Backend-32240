class Persona{
    constructor(nombre){
        this.nombre=nombre;
    }
    static especie= "humano";

    saludar=()=>{
        console.log(`hola , soy ${this.nombre} , mucho gusto`)
    }
    getEspecie =() =>{
        console.log(`Aunque no lo creas, soy un ${Persona.especie}`)
    }
}

//et persona1=new Persona("Jorge");
let persona1=new Persona("Catalina ");

persona1.saludar();
persona1.getEspecie();