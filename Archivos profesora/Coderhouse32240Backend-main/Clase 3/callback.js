/*function soyAsincrona(){
    console.log("mensaje Asincrono")
}
console.log('inicio');
soyAsincrona();
console.log('fin');




*/


function soyAsincrona(){
    console.log("mensaje Asincrono")
    setTimeout(function(){
        console.log('probando asincronia')
    },1000);
}
console.log('inicio');
soyAsincrona();
// callback es una funcion 
console.log('fin');

function soyAsincronaMejorada(callbackpropio){
    console.log("mensaje Asincrono mejorado")
    setTimeout(function(){
        console.log('probando asincronia');
        callbackpropio();
    },1000);
}
console.log('inicio');
soyAsincronaMejorada(function(){
    console.log("mejorando la asincronia");
});
// callback es una funcion 
console.log('fin');