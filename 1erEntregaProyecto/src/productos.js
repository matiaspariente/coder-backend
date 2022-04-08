import { DateTime } from "luxon";
import fs from 'fs';
import __dirname from './utils.js';

export default class Productos { 
    constructor() {
        this.productos = JSON.parse(fs.readFileSync(__dirname+'/fs/products/products.txt','utf-8')) // se carga la informacion de productos desde filesystem
        this.idBorrado = JSON.parse(fs.readFileSync(__dirname+'/fs/products/idBorrado.txt','utf-8'))
        this.idFinal = fs.readFileSync(__dirname+'/fs/products/idFinal.txt','utf-8')
    }
    guardar = (title,description,code,thumbnail,price,stock) =>{
            let id = 0;
            this.idBorrado[0] ? id=this.idBorrado[0] : id =this.idFinal++ // si no estan guardados IDs Borrados se van generando nuevos ID
            fs.writeFileSync(__dirname+'/fs/products/idFinal.txt',JSON.stringify(this.idFinal))
            let dt = DateTime.now() //se toma el dia
            let timestamp=dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            const productoActual = { //se toma los valores ingresados
                id:id,
                timestamp:timestamp,
                title : title,
                description:description,
                code:code,
                thumbnail : thumbnail,
                price:price,
                stock:stock
            }   
            this.productos.push(productoActual);// se agregan a productos
            this.productos.sort((a,b)=>a.id-b.id) // se ordena por Id
            fs.writeFileSync(__dirname+'/fs/products/products.txt',JSON.stringify(this.productos));
            if(this.idBorrado.length){
                this.idBorrado.shift();//si hay IdsBorrados guardados, se saca el primero que se acaba de utilizar
                fs.writeFileSync(__dirname+'/fs/products/idBorrado.txt',JSON.stringify(this.idBorrado))
            } 
            return id //se retorna id
    }
    leer = () =>{
        return this.productos //se retorna Json de productos
    }
    borrar = (id) =>{
    this.productos = this.productos.filter((productos)=>productos.id != id) // se elimina el producto con el id recibido
    fs.writeFileSync(__dirname+'/fs/products/products.txt',JSON.stringify(this.productos));
    this.idBorrado.push(id) // se agrega el Id al array de IDs borrados
    this.idBorrado.sort((a,b)=>a-b) //se ordena el array
    fs.writeFileSync(__dirname+'/fs/products/idBorrado.txt',JSON.stringify(this.idBorrado))
    }
    modificar(title,description,code,thumbnail,price,stock,id){
        this.productos = this.productos.filter((productos)=>productos.id != id) //se elimina el producto con el id recibido
        let dt = DateTime.now() //se toma el dia
        let timestamp=dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
        const productoActual = { //se guarda el producto con los nuevos valores
            id:id,
            timestamp:timestamp,
            title : title,
            description:description,
            code:code,
            thumbnail : thumbnail,
            price:price,
            stock:stock
        }   
        this.productos.push(productoActual); // se agrega a productos
        this.productos.sort((a,b)=>a.id-b.id) // se ordena por ID
        fs.writeFileSync(__dirname+'/fs/products/products.txt',JSON.stringify(this.productos));
    }
}