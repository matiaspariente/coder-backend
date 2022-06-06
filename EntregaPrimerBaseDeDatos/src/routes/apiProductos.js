import express from "express";
import io from "../app.js";
import ProductosMariadb from "../productos.js";

const router = express.Router();

const managerProductos = new ProductosMariadb();

router.get('/', async (req,res)=>{
    let content = await managerProductos.leer() // se llama a la funcion leer los productos
    console.log(content)
    if(content.length!=0) res.status(200).send(content); //se informa
    else res.status(404).send({status:'error',message:'no hay productos cargados'})
})

router.get('/:pid', async(req,res)=>{
    let {pid} = req.params; //se toma el pid
    let content = await managerProductos.leerId(pid) 
    if(content!=undefined)  res.status(200).send(content); // se informa
    else res.status(404).send({status:'error', message:'producto no encontrado'}) 
})

router.post('/', async (req,res)=>{
    if(!req.body.check){
        let id = await managerProductos.guardar(req.body.title,req.body.description,req.body.code,req.body.thumbnail,req.body.price,req.body.stock) //se llama a la funcion guardar elemento
        let content = await managerProductos.leer()
        res.status(200).send(content[id-1]) // se informa
        io.emit('log', await managerProductos.leer()) // se envia mensaje al servidor para que se modifique la tabla de productos
    }
    else res.send(({status:'error',message:'post de inicio de verificacion admin'})) // si se recibe post de verificacion de administrador se devuelve con este mensaje
})

router.delete('/:pid', async (req,res)=>{ 
    let {pid} = req.params;
    let content = await managerProductos.leerId(pid) 
    if(content!=undefined) {
        await managerProductos.borrar(pid) // una vez leido se llama a la funcion borrar
        res.status(200).send({status:'success',message:`Producto con ID:${pid} borrado`})  //se informa
    } 
    else res.status(404).send({status:'error',message: 'producto no encontrado'})
    io.emit('log',await managerProductos.leer()) // se envia mensaje al servidor para que se modifique la tabla de productos
})

router.put('/:pid', async (req,res)=>{
    let {pid} = req.params;
    let content = await managerProductos.leerId(pid)
    if(content!=undefined) { // si no hay productos no se hace nada
        await managerProductos.modificar(req.body.title,req.body.description,req.body.code,req.body.thumbnail,req.body.price,req.body.stock,pid) // se llama a la funcion modificar
        res.status(200).send({status:'success',message:`Producto con ID:${pid} modificado`}) // se informa
    } 
    else res.status(404).send({status:'error',message: 'producto no encontrado'}) 
    io.emit('log',await managerProductos.leer()) // se envia mensaje al servidor para que se modifique la tabla de productos
})

export default router;