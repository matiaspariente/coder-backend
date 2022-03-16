export default class Productos { 
    constructor() {
        this.productos = [];
    }
    guardar = (title,price,thumbnail) =>{    
            const productoActual = {
                title : title,
                price : price,
                thumbnail : thumbnail,
                id:((this.productos.length)+1)
            }    
            this.productos.push(productoActual);
    }
    leer = () =>{
        return this.productos
    }
}