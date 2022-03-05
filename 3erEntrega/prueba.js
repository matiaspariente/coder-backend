const fin = (cantPalabras)=> console.log(`Fin, se mostraron ${cantPalabras} palabras`);

const mostrarPalabras = (texto, callback, ms=1000)=>{
    return new Promise((resolve)=>{
        const arr = texto.split(" ");
        let contador = 0;
        let intervalID = setInterval(() => {
            if (contador < arr.length) {
                console.log(arr[contador]);
                contador++;
            }else{
                clearInterval(intervalID);
                callback(contador);
                resolve(contador);
            }
        }, ms);
    })
}

const llamarFunciones = async () =>{
    let total = 0;
    total = await mostrarPalabras("Hola mi nombre es Ramiro Porta",fin,100);
    total+= await mostrarPalabras("Espero que esto funcione",fin,100);
    total+= await mostrarPalabras("Gracias vuelva prontos",fin,100);
    console.log("PROCESO COMPLETO");
    console.log(`La cantidad TOTAL de palabras fue: ${total}`);
}
llamarFunciones();