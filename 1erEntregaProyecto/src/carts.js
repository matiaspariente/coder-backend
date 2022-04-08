import fs from 'fs';
import __dirname from './utils.js';

export default class Carts { 
    constructor() {
        this.carts = JSON.parse(fs.readFileSync(__dirname+'/fs/carts/carts.txt','utf-8')); // se carga la informacion de carritos desde filesystem
        this.idBorrado = JSON.parse(fs.readFileSync(__dirname+'/fs/carts/idBorrado.txt','utf-8')); 
        this.idFinal = fs.readFileSync(__dirname+'/fs/carts/idFinal.txt','utf-8');
    }

    crear = ()=>{
        let id = 0;
        this.idBorrado[0] ? id=this.idBorrado[0] : id =this.idFinal++ // si no hay guardados IDs Borrados se van generando nuevos ID
        fs.writeFileSync(__dirname+'/fs/carts/idFinal.txt',JSON.stringify(this.idFinal))
        const cartActual = { //se toma los valores ingresados
            id:id,
            products: [],
        }
        this.carts.push(cartActual);// se agregan a carritos
        this.carts.sort((a,b)=>a.id-b.id) // se ordena por Id
        fs.writeFileSync(__dirname+'/fs/carts/carts.txt',JSON.stringify(this.carts));
        if(this.idBorrado.length){ 
        this.idBorrado.shift()//si hay IdsBorrados guardados, se saca el primero que se acaba de utilizar
        fs.writeFileSync(__dirname+'/fs/carts/idBorrado.txt',JSON.stringify(this.idBorrado))
        }
        return id //se retorna id
    }
    guardar = (cid,pid,quantity) =>{
            let content=this.carts.find(carts=>carts.id == cid) // se agrega producto con pid al carrito cid
            if(content==undefined)  return {status:'error', message: 'carrito inexistente'} // si da error es por que no hay carrito
            let indexCart = this.carts.findIndex(carts=>carts.id == cid)
            content= this.carts[indexCart].products
            if(content.length!=0){
                let indexProduct = content.findIndex(content=>content.products.id == pid)
                if(indexProduct!=-1){
                    this.carts[indexCart].products[indexProduct].products.quantity+=quantity // si ya existia el producto en el carrito se suma cantidad
                    return {status:'success', message: `se agrego producto con ID:${pid} en carrito con ID:${cid}`}
                }
            } 
            content={
                id:cid,
                products:{
                    id : pid,
                    quantity: quantity, 
                    }
                }
            this.carts[indexCart].products.push(content) // se guarda en carrito el producto correspondiente
            fs.writeFileSync(__dirname+'/fs/carts/carts.txt',JSON.stringify(this.carts));
            return {status:'success', message:`se agrego producto con ID:${pid} en carrito con ID:${cid}`}  
    }
    leer = (id) =>{
        return this.carts.find(carts=>carts.id == id) // se retorna Json del carrito pedido
    }
    leerTodo = () =>{
        return this.carts //se retorna Json del carrito
    }
    borrar = (id) =>{
    this.carts = this.carts.filter((carts)=>carts.id != id) // se elimina el producto con el id recibido
    fs.writeFileSync(__dirname+'/fs/carts/carts.txt',JSON.stringify(this.carts));
    this.idBorrado.push(id) // se agrega el Id al array de IDs borrados
    this.idBorrado.sort((a,b)=>a-b) //se ordena el array
    fs.writeFileSync(__dirname+'/fs/carts/idBorrado.txt',JSON.stringify(this.idBorrado))
    }
    borrarProducto = (cid,pid) =>{
        let indexCart = this.carts.findIndex(carts=>carts.id == cid) // se busca por cid
        let content = this.carts[indexCart].products.findIndex(products=>products.products.id == pid) // luego por pid y se borra si existe
        this.carts[indexCart].products= this.carts[indexCart].products.filter(products=>products.products.id != pid)
        fs.writeFileSync(__dirname+'/fs/carts/carts.txt',JSON.stringify(this.carts));
        return content
    }
}