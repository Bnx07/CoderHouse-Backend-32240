const fs= require('fs');
fs.writeFileSync('./archivoFs','Probando Callback',(error)=>{

    if(error) return console.log("se valida si el error existe")
    fs.readFile('./archivoFS.txt','utf-8',(error,resultado)=>{
    
        if(error) return console.log("se valida si el error existe")
        fs.readFile('./archivoFS.txt','utf-8',(error,resultado)=>{
       
            if(error) return console.log("error al leer el archivo")
            console.log(resultado)
            fs.appendFile('./archivo', 'se debe adicionar más datos al archivo',(error)=>{

                if(error) return console.log("error al actualizar el archivo")
                    fs.readFile('.archivo','utf-8',(error,resultado)=>{

                        if(error) return console.log("error al leer el archivo")
                        console.log(resultado) // en caso de que todo este bien debe mosrar el mensaje positivo 
                        fs.unlink('./archivo',(error)=>{
                            if(error)return console.log("no se pudo leer el archivo");
                        })
                    })
            })
        })
    })
})
