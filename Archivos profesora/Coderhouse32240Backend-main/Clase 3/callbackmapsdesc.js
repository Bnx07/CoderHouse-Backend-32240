let valores=[1,2,3,4,5];

 const funCallback =(valor, callback)=>{
    let nuevoArreglo=[];

    for(let i=0;i< valor.length;i++) {
        let valorNuevo=callback(valor[i]);
        nuevoArreglo.push(valorNuevo)
    }
    return nuevoArreglo;
 }
 
 let prueba1= funCallback(valores, x=>x*2);

 let prueba2= valores.map(x=>x*2);

console.log(prueba1);
console.log(prueba2);