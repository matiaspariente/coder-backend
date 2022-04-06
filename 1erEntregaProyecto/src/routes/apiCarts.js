import express from "express";
import Carts from '../carts.js';

const router = express.Router();

const managerCarts = new Carts("Carts");

router.get('/:cid/products',(req,res)=>{
    let {cid} = req.params
    let content = managerCarts.leer(cid) 
    if(content!=undefined) {
        if(content.products.length!=0) res.send(content.products); //lo informo
        else res.send({status:'error',message: 'no hay productos guardados en el carrito'})
    } 
    else res.send({status:'error',message: 'carrito inexistente'})
})

router.post('/',(req,res)=>{
    let id = managerCarts.crear() //llamo a la funcion guardar elemento
    res.send({status:'success',message:`carrito creado con ID: ${id}`}) // lo informo
})

router.post('/:cid/products',(req,res)=>{
    let {cid} = req.params;
    let content = managerCarts.guardar(cid,req.body.id,req.body.quantity) //llamo a la funcion guardar elemento
    res.send(content) // lo informo
    })

router.delete('/:cid',(req,res)=>{
let {cid} = req.params;
let content = managerCarts.leer(cid) 
if(content!=undefined) {
    managerCarts.borrar(cid) // una vez leido llamo a la funcion borrar
    res.send({status:'success',message:`Carrito con ID:${cid} borrado`})  //lo informo
} 
else res.send({status:'error',message: 'carrito inexistente'})
})

router.delete('/:cid/products/:pid',(req,res)=>{
    let {cid,pid} = req.params;
    let content = managerCarts.leer(cid) 
    if(content!=undefined) {
        content=managerCarts.borrarProducto(cid,pid) // una vez leido llamo a la funcion borrar
        if(content==-1) res.send({status:'error',message:`Producto con ID:${pid} inexistente en carrito con ID${cid}`})
        else res.send({status:'success',message:`Producto con ID:${pid} borrado de carrito con ID:${cid}`})  //lo informo
    } 
    else res.send({status:'error',message: 'carrito inexistente'})
    })

export default router;