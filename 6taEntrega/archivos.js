import fs, { readFile } from 'fs';

class Archivo { 
    constructor(nombre) {
        this.nombre = nombre;
        this.productos = [];
    }
    guardar = async(title,price,thumbnail) =>{    
        try{
            const productoActual = {
                title : title,
                price : price,
                thumbnail : thumbnail,
                id:((this.productos.length)+1)
            }
            this.productos.push(productoActual);
            const res = JSON.stringify(this.productos,null,'\t');
            await fs.promises.writeFile(`./files/${this.nombre}.txt`,res);
        }catch(error){
            console.log("Can't write file: "+error)
        }    
    }
    leer = async() =>{
        try{
            let content = await fs.promises.readFile(`./files/${this.nombre}.txt`,'utf-8')
            console.log(content);
        }catch(error){
            if(error.code=='ENOENT'){
                console.log(this.productos)
            }else{
                console.log("Can't read file: "+error)
            } 
        }
    }
    borrar = async() =>{
        try{
            await fs.promises.unlink(`./files/${this.nombre}.txt`)
            console.log("archivo Borrado")
        }
        catch(error){
            console.log("Can't erase file: "+error)
        }   
    }   
}

let archivo = new Archivo("productos");
archivo.guardar("Escuadra",123.45,'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png');
archivo.guardar("Calculadora",234.56,"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png");
archivo.guardar("Globo Terraqueo",345.67,"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geography-plante-school-256.png");
//archivo.leer()
//archivo.borrar();