import Productos from './productos.js';
import express from 'express';

const app= express();
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const managerProductos = new Productos("Productos");

app.get('/api/productos/listar',(req,res)=>{
        let content = managerProductos.leer()
        if(content.length!=0) res.send(content);
        else res.send({error: 'no hay productos cargados'})
})

app.get('/api/productos/listar/:id',(req,res)=>{
    let {id} = req.params;
    let content = managerProductos.leer()
    content = content.find(content=>content.id == id)
    if(content!=undefined)  res.send(content);
    else res.send({error: 'producto no encontrado'}) 
})

app.post('/api/productos/guardar',(req,res)=>{
    managerProductos.guardar(req.body.title,req.body.price,req.body.thumbnail)
    let content = managerProductos.leer()
    res.send(content[content.length-1])
})