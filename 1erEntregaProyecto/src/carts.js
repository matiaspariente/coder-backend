export default class Carts { 
    constructor() {
        this.carts = [];
        this.idBorrado = [];
        this.idFinal = 1;
    }

    crear = ()=>{
        let id = 0;
        this.idBorrado[0] ? id=this.idBorrado[0] : id =this.idFinal++ // si no tengo guardados IDs Borrados se van generando nuevos ID
        const cartActual = { //tomo los valores ingresados
            id:id,
            products: [],
        }
        this.carts.push(cartActual);// los agrego a carritos
        this.carts.sort((a,b)=>a.id-b.id) // los ordeno por Id
        if(this.idBorrado.length) this.idBorrado.shift();//si Tengo IdsBorrados guardados, saco el primero que se acaba de utilizar
        return id //retorno id
    }
    guardar = (cid,pid,quantity) =>{
            let content=this.carts.find(carts=>carts.id == cid)
            if(content==undefined)  return {status:'error', message: 'carrito inexistente'}
            let indexCart = this.carts.findIndex(carts=>carts.id == cid)
            content= this.carts[indexCart].products
            if(content.length!=0){
                console.log(pid)
                let indexProduct = content.findIndex(content=>content.products.id == pid)
                if(indexProduct!=-1){
                    this.carts[indexCart].products[indexProduct].products.quantity+=quantity
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
            this.carts[indexCart].products.push(content)
            return {status:'success', message:`se agrego producto con ID:${pid} en carrito con ID:${cid}`}  
    }
    leer = (id) =>{
        return this.carts.find(carts=>carts.id == id) //retorno Json del carrito pedido
    }
    borrar = (id) =>{
    this.carts = this.carts.filter((carts)=>carts.id != id) // elimino el producto con el id recibido
    this.idBorrado.push(id) // agrego el Id al array de IDs borrados
    this.idBorrado.sort((a,b)=>a-b) //ordeno el array
    }
    borrarProducto = (cid,pid) =>{
        let indexCart = this.carts.findIndex(carts=>carts.id == cid)
        let content = this.carts[indexCart].products.findIndex(products=>products.products.id == pid)
        this.carts[indexCart].products= this.carts[indexCart].products.filter(products=>products.products.id != pid)
        return content
    }
}