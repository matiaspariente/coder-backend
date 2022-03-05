const mostrarPalabras = (palabra,cb,tiempoInterval=1000) =>{ 
    return new Promise((resolve)=>{ 
            let i=0;
            palabraSeparada = palabra.split(" "); // Separo el texto en los espacios
            const recorrerPalabra = ()=>{
                if(i<palabraSeparada.length){ // Recorro las palabras desde la primera hasta la ultima y las voy mostrando
                    console.log(palabraSeparada[i])
                    i++;
                }else{
                    clearInterval(timer);// libero el interval
                    cb(i); // llamo al callback
                    resolve(); // libero la promesa
                }
         }       
         const timer = setInterval(recorrerPalabra,tiempoInterval); 
        })
}

const funcionFinalizado = (cantidadPalabras) => console.log(`Proceso Completo, el texto tiene ${cantidadPalabras} palabras`);

const llamarMostrarPalabras = async () =>{
    await mostrarPalabras('Palabra1 Palabra2 Palabra3 Palabra4',funcionFinalizado,500);
    await mostrarPalabras('Palabra4 Palabra5 Palabra6',funcionFinalizado,500);
    await mostrarPalabras('Palabra7 Palabra8',funcionFinalizado,500);
}

llamarMostrarPalabras();

