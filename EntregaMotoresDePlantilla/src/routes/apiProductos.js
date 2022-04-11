import express from "express";
import productManager from '../models/productsManager.js';

const router = express.Router();

router.get('/',(req,res)=>{
    let content = productManager.leer() //llamo a la funcion leer los productos
    if(content.length!=0) res.send(content); //lo informo
    else res.send({error: 'no hay productos cargados'})
})

router.get('/:id',(req,res)=>{
let {id} = req.params; //tomo el id
let content = productManager.leer() 
content = content.find(content=>content.id == id) // llamo a leer pero solo tomo el elememento de ese ID
if(content!=undefined)  res.send(content); // lo informo
else res.send({error: 'producto no encontrado'}) 
})

router.post('/',(req,res)=>{
let id = productManager.guardar(req.body.title,req.body.price,req.body.thumbnail) //llamo a la funcion guardar elemento
let content = productManager.leer()
res.send(content[id-1]) // lo informo
})

router.delete('/:id',(req,res)=>{
let {id} = req.params;
let content = productManager.leer() 
content = content.find(content=>content.id == id) //leo el producto con ese ID
if(content!=undefined) {
    productManager.borrar(id) // una vez leido llamo a la funcion borrar
    res.send({status:'success',message:`Producto con ID:${id} borrado`})  //lo informo
} 
else res.send({error: 'producto no encontrado'})
})

router.put('/:id',(req,res)=>{
let {id} = req.params;
let content = productManager.leer()
content = content.find(content=>content.id == id)//leo el producto
if(content!=undefined) {
    productManager.modificar(req.body.title,req.body.price,req.body.thumbnail,id) // llamo a la funcion modificar
    res.send({status:'success',message:`Producto con ID:${id} modificado`}) // lo informo
} 
else res.send({error: 'producto no encontrado'})
})

export default router;