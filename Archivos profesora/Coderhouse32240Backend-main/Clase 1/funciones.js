//Ejemplo 1

function mostrarNumero(){
    let valor=2;
    console.log(valor);
}

mostrarNumero();

function sumar(numero1,numero2){
    let suma=numero1+numero2;
    console.log(suma);
   // return(suma);
}

function restar(numero1,numero2){
    let restar=numero1-numero2;
    console.log(suma);
   // return(suma);
}


sumar(2,3);



//---- funcion flecha 

const pruebaFlecha1=( variable)=>
{
    let variable1=2
    return variable1
}

pruebaFlecha1();
//---- funcion flecha con argumentos

const pruebaFlecha2=( numero1,numero2)=>
{
    let suma=numero1+numero2;
    return suma
}
pruebaFlecha2(1,2);