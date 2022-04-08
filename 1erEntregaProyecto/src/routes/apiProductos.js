import express from "express";
import Productos from '../productos.js';
import io from "../app.js";

const administrator = true; //true: Admin  False: user

const router = express.Router();

const managerProductos = new Productos("Productos");

const administratorCheck = (req,res,next) =>{ // middleware de verificacion de administrador  a traves de booleano
    if(administrator) next()
    else {
        res.status(401).send({
            error: -1,
            descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizado`
        })
    }
}

router.get('/',(req,res)=>{ 
    let content = managerProductos.leer() // se llama a la funcion leer los productos
    if(content.length!=0) res.status(200).send(content); //se informa
    else res.status(404).send({status:'error',message:'no hay productos cargados'})
})

router.get('/:pid',(req,res)=>{
let {pid} = req.params; //se toma el pid
let content = managerProductos.leer() 
content = content.find(content=>content.id == pid) // se llama  a leer pero solo se toma el elememento de ese ID
if(content!=undefined)  res.status(200).send(content); // se informa
else res.status(404).send({status:'error', message:'producto no encontrado'}) 
})

router.post('/',administratorCheck,(req,res)=>{
    if(!req.body.check){
        let id = managerProductos.guardar(req.body.title,req.body.description,req.body.code,req.body.thumbnail,req.body.price,req.body.stock) //se llama a la funcion guardar elemento
        let content = managerProductos.leer()
        res.status(200).send(content[id-1]) // se informa
        io.emit('log',managerProductos.leer()) // se envia mensaje al servidor para que se modifique la tabla de productos
    }
    else res.send(({status:'error',message:'post de inicio de verificacion admin'})) // si se recibe post de verificacion de administrador se devuelve con este mensaje
})

router.delete('/:pid',administratorCheck,(req,res)=>{ 
let {pid} = req.params;
let content = managerProductos.leer() 
content = content.find(content=>content.id == pid) //se lee el producto con ese ID
if(content!=undefined) {
    managerProductos.borrar(pid) // una vez leido se llama a la funcion borrar
    res.status(200).send({status:'success',message:`Producto con ID:${pid} borrado`})  //se informa
} 
else res.status(404).send({status:'error',message: 'producto no encontrado'})
io.emit('log',managerProductos.leer()) // se envia mensaje al servidor para que se modifique la tabla de productos
})

router.put('/:pid',administratorCheck,(req,res)=>{
let {pid} = req.params;
let content = managerProductos.leer()
content = content.find(content=>content.id == pid)//se lee el producto
if(content!=undefined) { // si no hay productos no se hace nada
    managerProductos.modificar(req.body.title,req.body.description,req.body.code,req.body.thumbnail,req.body.price,req.body.stock,pid) // se llama a la funcion modificar
    res.status(200).send({status:'success',message:`Producto con ID:${pid} modificado`}) // se informa
} 
else res.status(404).send({status:'error',message: 'producto no encontrado'}) 
io.emit('log',managerProductos.leer()) // se envia mensaje al servidor para que se modifique la tabla de productos
})

export default router;