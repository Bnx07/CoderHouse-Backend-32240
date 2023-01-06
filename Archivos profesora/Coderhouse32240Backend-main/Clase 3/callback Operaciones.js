const sumar=( numero1, numero2)=>numero1+numero2;
const restar=( numero1, numero2)=>numero1-numero2;
const multi=( numero1, numero2)=>numero1*numero2;
const div=( numero1, numero2)=>numero1/numero2;

const  operacion= (numero1,numero2,micallback)=>{
    //console.log("tenemos prueba de operaciones");
    let resultado=micallback(numero1,numero2);
    console.log("el resultado es "+ resultado);
}

operacion(3,9,sumar);
operacion(9,3,restar);
operacion(2,5,multi);
operacion(8,4,div);



