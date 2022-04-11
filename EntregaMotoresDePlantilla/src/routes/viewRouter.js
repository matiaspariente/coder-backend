import express from 'express';
import productsManager from '../models/productsManager.js';

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('home')
})

router.get('/productos',(req,res)=>{
    let productos = productsManager.leer();
    let sinProductos = "" 
    let avisoProductos = "display:none;"
    if(!productos.length){ // si no hay productos se pone invisible la tabla y se muestra el alerta de sin productos
        sinProductos="display:none;"
        avisoProductos = "" 
    } 
    else { // si hay productos se pone invisible el alerta y se muestra tabla de productos
        sinProductos=""
        avisoProductos = "display:none;"
    } 
    res.render('productos',{ // se renderiza las 3 variables
        productos,
        sinProductos,
        avisoProductos
    }) 
})

export default router;