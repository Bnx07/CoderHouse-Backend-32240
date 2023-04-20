import express  from 'express'
const app = express();

//console.log(`El total de nucleos es ${cpuCount}`)
//console.log(cluster.isPrimary);

app.use(express.json());
app.get('/',(req,res)=>{
  res.send("Hola estoy probando docker")
})

app.get('/operacionSencilla',(req,res)=>{
  let sum=0;
  for(let i=0; i<100000;i++){
    sum+=i;
  }
  res.send({status:"success", message:`La peticon fue atendida por ${process.pid} el resultado fue: ${sum}`})
})

app.get('/operacionCompleja',(req,res)=>{
  let sum=0;
  for(let i=0; i<5e8;i++){
    sum+=i;
  }
  res.send({status:"success", message:`La peticon fue atendida por ${process.pid} el resultado fue: ${sum}`})
})

app.listen(8080,()=>{console.log("Server arriba")})