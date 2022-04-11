class productsManager { 
    constructor() {
        this.productos = [];
        this.idBorrado = [];
        this.idFinal = 1;
    }
    guardar = (title,price,thumbnail) =>{
            let id = 0;
            this.idBorrado[0] ? id=this.idBorrado[0] : id =this.idFinal++ // si no tengo guardados IDs Borrados se van generando nuevos ID
            const productoActual = { //tomo los valores ingresados
                title : title,
                price : price,
                thumbnail : thumbnail,
                id:id
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
    modificar(title,price,thumbnail,id){
        this.productos = this.productos.filter((productos)=>productos.id != id) //elimino el producto con el id recibido
        const productoActual = { // guardo el producto con los nuevos valores
            title : title,
            price : price,
            thumbnail : thumbnail,
            id:id
        }   
        this.productos.push(productoActual); // lo agrego a productos
        this.productos.sort((a,b)=>a.id-b.id) // los ordeno por ID
    }
}

export default new productsManager();