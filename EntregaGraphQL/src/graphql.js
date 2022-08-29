import { buildSchema } from 'graphql'
import crypto from 'crypto'

let funciones = {};

let productoArr = {}

const schema = buildSchema(`
    type Producto{
        id: ID!
        title: String
        price: Int
        thumbnail: String
    }
    input ProductoInput{
        title: String
        price: Int
        thumbnail: String
    }
    type Query{
        getProducto(id: ID!): Producto
        getProductos(campo: String, valor: String):[Producto]
    }
    type Mutation{
        crearProducto(datos:ProductoInput):Producto
        actualizarProducto(id: ID!, datos:ProductoInput):Producto
        eliminarProducto(id: ID!):Producto
    }
`);

class Producto{
    constructor(id,{title,price,thumbnail}){
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

funciones.getProducto = ({id})=>{
    const producto = Object.values(productoArr);
    return producto.find(p=>p.id==id)
};

funciones.getProductos  = ({campo,valor})=>{
    const productoDB = Object.values(productoArr);
    if ( campo && valor) return productoDB.filter(p=>p[campo]==valor)
    return productoDB
};

funciones.crearProducto = ({datos})=>{
    let id = crypto.randomBytes(10).toString('hex');
    let nuevoProducto = new Producto(id,datos)
        productoArr[id] = nuevoProducto;
        return nuevoProducto;
};
funciones.eliminarProducto = ({id})=>{
    if(!productoArr[id]) throw new Error("El producto no existe");
    const producto = productoArr[id]  
    delete productoArr[id];
    return producto

};
funciones.actualizarProducto = ({id,datos}) =>{
    if(!productoArr[id]) throw new Error("El producto no existe");
    const nuevoProducto = {
        id: id,
        title: datos.title,
        price: datos.price,
        thumbnail: datos.thumbnail
    }
    productoArr[id] = nuevoProducto
    return nuevoProducto
};

export {funciones,schema}