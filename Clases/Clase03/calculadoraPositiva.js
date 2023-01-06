const {rejects} = require("assert")
const {resolve} = require("path")

const sumar = (num1,num2)=>{
    return new Promise((resolve,rejects)=>{
        if(num1===0 || num2===0){
            rejects("Operación innecesaria")
        }else{
            resolve(num1+num2)
        }
    })
}

const restar = (num1,num2)=>{
    return new Promise((resolve,rejects)=>{
        if(num1<=0 || num2<=0){
            rejects("La calculadora solo puede devolver valores positivos")
        }
        else if(num1-num2<0){
            rejects("La calculadora solo puede devolver valores positivos")
        }
        else{
            resolve(num1-num2)
        }
    })
}

const multiplicacion = (num1,num2)=>{
    return new Promise((resolve,rejects)=>{
        if(num1<0 || num2<0){
            rejects("La calculadora solo puede devolver valores positivos")
        }
        else if(num1*num2<0){
            rejects("La calculadora solo puede devolver valores positivos")
        }
        else{
            resolve(num1*num2)
        }
    })
}

const div = (num1,num2)=>{
    return new Promise((resolve,rejects)=>{
        if(num1<=0 || num2<=0){
            rejects("La calculadora solo puede devolver valores positivos")
        }
        else if(num1/num2<0){
            rejects("La calculadora solo puede devolver valores positivos")
        }
        else{
            resolve(num1/num2)
        }
    })
}

let operacion=div(3,15)
.then(resultado=>{
    console.log(resultado)
})
.catch(error=>{
    console.log(error)
})
console.log(operacion)