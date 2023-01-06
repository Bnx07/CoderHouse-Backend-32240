let valores=[1,2,3,4,5];
let valoresNuevos= valores.map(x=>x+1);
let valoresMulti=  valores.map(x=>x*2);
let valoresComp= valores.map(x=>"a")
/*
console.log (valoresNuevos + " Nuevos"+
              valoresMulti + " Multi"+
              valoresComp + " Comp")
*/
 // estructurar la funcion callback para validar
 
 const funCallback =(valor)=>{
    if(valor%2===0){
        return valor
    }else{
        return "no es par"
    }
 }
 
 const evaluacion =valores.map(funCallback); // creamos una funcion completa como un argumento 
 console.log(evaluacion);