var http = require("http");

class Peticion { 
    constructor(id, title, price, thumbnail) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

var server = http.createServer(function(peticion, respuesta){
    let aleatorio1 = Math.ceil( Math.random() * 10)
    let aleatorio2 = Math.ceil( Math.random() * 10)
    let aleatorio3 = (Math.random() * 10000).toFixed(2)
    let aleatorio4 = Math.ceil( Math.random() * 10)
    const resultado = new Peticion(aleatorio1,"Producto " + aleatorio2, aleatorio3,"Foto " + aleatorio4 ) 
    const res = JSON.stringify(resultado);
    respuesta.end(res);
});
server.listen(3000,function(){
    console.log("tu servidor está listo en " + this.address().port);
});