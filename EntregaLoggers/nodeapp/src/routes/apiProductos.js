import express from "express";
import Productos from '../productos.js';
import io from "../app.js";

const router = express.Router();

const managerProductos = new Productos("Productos");

router.get('/',(req,res)=>{
    let content = managerProductos.leer() //llamo a la funcion leer los productos
    if(content.length!=0) res.send(content); //lo informo
    else res.send({error: 'no hay productos cargados'})
})

router.get('/:id',(req,res)=>{
let {id} = req.params; //tomo el id
let content = managerProductos.leer() 
content = content.find(content=>content.id == id) // llamo a leer pero solo tomo el elememento de ese ID
if(content!=undefined)  res.send(content); // lo informo
else res.send({error: 'producto no encontrado'}) 
})

router.post('/',(req,res)=>{
let id = managerProductos.guardar(req.body.title,req.body.price,req.body.thumbnail) //llamo a la funcion guardar elemento
let content = managerProductos.leer()
res.send(content[id-1]) // lo informo
io.emit('log',managerProductos.leer())// envio mensaje al servidor para que se modifique la tabla de productos
})

router.delete('/:id',(req,res)=>{
let {id} = req.params;
let content = managerProductos.leer() 
content = content.find(content=>content.id == id) //leo el producto con ese ID
if(content!=undefined) {
    managerProductos.borrar(id) // una vez leido llamo a la funcion borrar
    res.send({status:'success',message:`Producto con ID:${id} borrado`})  //lo informo
} 
else res.send({error: 'producto no encontrado'})
io.emit('log',managerProductos.leer()) // envio mensaje al servidor para que se modifique la tabla de productos
})

router.put('/:id',(req,res)=>{
let {id} = req.params;
let content = managerProductos.leer()
content = content.find(content=>content.id == id)//leo el producto
if(content!=undefined) {
    managerProductos.modificar(req.body.title,req.body.price,req.body.thumbnail,id) // llamo a la funcion modificar
    res.send({status:'success',message:`Producto con ID:${id} modificado`}) // lo informo
} 
else res.send({error: 'producto no encontrado'})
io.emit('log',managerProductos.leer())// envio mensaje al servidor para que se modifique la tabla de productos
})

export default router;