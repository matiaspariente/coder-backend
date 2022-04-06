import { DateTime } from "luxon";

export default class Productos { 
    constructor() {
        this.productos = [];
        this.idBorrado = [];
        this.idFinal = 1;
    }
    guardar = (title,description,code,thumbnail,price,stock) =>{
            let id = 0;
            this.idBorrado[0] ? id=this.idBorrado[0] : id =this.idFinal++ // si no tengo guardados IDs Borrados se van generando nuevos ID
            let dt = DateTime.now() //tomo el dia
            let timestamp=dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            const productoActual = { //tomo los valores ingresados
                id:id,
                timestamp:timestamp,
                title : title,
                description:description,
                code:code,
                thumbnail : thumbnail,
                price:price,
                stock:stock
            }   
            this.productos.push(productoActual);// los agrego a productos
            this.productos.sort((a,b)=>a.id-b.id) // los ordeno por Id
            if(this.idBorrado.length) this.idBorrado.shift();//si Tengo IdsBorrados guardados, saco el primero que se acaba de utilizar
            return id //retorno id
    }
    leer = () =>{
        return this.productos //retorno Json de productos
    }
    borrar = (id) =>{
    this.productos = this.productos.filter((productos)=>productos.id != id) // elimino el producto con el id recibido
    this.idBorrado.push(id) // agrego el Id al array de IDs borrados
    this.idBorrado.sort((a,b)=>a-b) //ordeno el array
    }
    modificar(title,description,code,thumbnail,price,stock,id){
        this.productos = this.productos.filter((productos)=>productos.id != id) //elimino el producto con el id recibido
        let dt = DateTime.now() //tomo el dia
        let timestamp=dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
        const productoActual = { // guardo el producto con los nuevos valores
            id:id,
            timestamp:timestamp,
            title : title,
            description:description,
            code:code,
            thumbnail : thumbnail,
            price:price,
            stock:stock
        }   
        this.productos.push(productoActual); // lo agrego a productos
        this.productos.sort((a,b)=>a.id-b.id) // los ordeno por ID
    }
}