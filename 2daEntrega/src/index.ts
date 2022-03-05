const operaciones = async ()=>{
    try{
        let operando = await import ("./operacion.js");
        let resultado = await operando.operacion(3,2, "sumar");
        console.log(resultado);
        resultado = await operando.operacion(3, 2, "restar");
        console.log(resultado);
        resultado = await operando.operacion(3, 2, "sdaasd");
        console.log(resultado);
    } catch (error) {
        console.error(error);
    }
}
operaciones();