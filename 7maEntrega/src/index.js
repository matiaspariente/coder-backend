import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

let visits1 = 0;
let visits2 = 0;

app.get('/items',async(req,res)=>{
    try{
        visits1++
        let content = await fs.promises.readFile(`../files/productos.txt`,'utf-8')
        content = await JSON.parse(content)
        let resultado = {item:content,cantidad:content.length}
        res.send(resultado)
    }catch(error){
        console.log(error)
    }    
})

app.get('/item-random',async(req,res)=>{
    try{
        visits2++
        let content = await fs.promises.readFile(`../files/productos.txt`,'utf-8')
        content = await JSON.parse(content)
        let resultado = {item:content[Math.floor(Math.random()*(content.length))]}
        res.send(resultado)
    }catch(error){
        console.log(error)
    }    
})

app.get('/visitas',(req,res)=>{
        res.send({visitas:{items:visits1,item:visits2}})     
})