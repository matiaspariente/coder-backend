import express from "express";
import Productos from '../productos.js';

const router = express.Router();

const managerProductos = new Productos("Productos");

router.get('/',(req,res)=>{
    let content = managerProductos.leer() //llamo a la funcion leer los productos
    if(content.length!=0) res.send(content); //lo informo
    else res.send({error: 'no hay productos cargados'})
})

router.get('/:pid',(req,res)=>{
let {pid} = req.params; //tomo el id
let content = managerProductos.leer() 
content = content.find(content=>content.id == pid) // llamo a leer pero solo tomo el elememento de ese ID
if(content!=undefined)  res.send(content); // lo informo
else res.send({error: 'producto no encontrado'}) 
})

router.post('/',(req,res)=>{
let id = managerProductos.guardar(req.body.title,req.body.description,req.body.code,req.body.thumbnail,req.body.price,req.body.stock) //llamo a la funcion guardar elemento
let content = managerProductos.leer()
res.send(content[id-1]) // lo informo
})

router.delete('/:pid',(req,res)=>{
let {pid} = req.params;
let content = managerProductos.leer() 
content = content.find(content=>content.id == pid) //leo el producto con ese ID
if(content!=undefined) {
    managerProductos.borrar(pid) // una vez leido llamo a la funcion borrar
    res.send({status:'success',message:`Producto con ID:${pid} borrado`})  //lo informo
} 
else res.send({error: 'producto no encontrado'})
})

router.put('/:pid',(req,res)=>{
let {pid} = req.params;
let content = managerProductos.leer()
content = content.find(content=>content.id == pid)//leo el producto
if(content!=undefined) {
    managerProductos.modificar(req.body.title,req.body.description,req.body.code,req.body.thumbnail,req.body.price,req.body.stock,pid) // llamo a la funcion modificar
    res.send({status:'success',message:`Producto con ID:${pid} modificado`}) // lo informo
} 
else res.send({error: 'producto no encontrado'})
})

export default router;