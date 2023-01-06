const { rejects } = require("assert")
const { resolve } = require("path")

const dividir =(dividiendo,divisor)=>{
    return new Promise((resolve,rejects)=>{
       // console.log("Dividendo"+ divisor);
        if(divisor===0){
            rejects('no se puede dividir por 0')
        }else{
            resolve(dividiendo/divisor)
        }
    })
}
/*
let pruebaDiv= dividir(5,2);
console.log(pruebaDiv);*/

const funcionAsincrona =async () =>{
    try{
        let resultado=await dividir(5,10);
        console.log(resultado);
    } 
    catch(error){
        console.log(error);
    }
}
funcionAsincrona();
