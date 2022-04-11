let form = document.getElementById('productForm')
let btnVista = document.getElementById('btnVistaProductos')


form.addEventListener('submit',(evt)=>{ // evento de boton de enviar, se realiza el POST a la api productos
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/productos/',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(
        json=>{
            console.log(json)
            form.reset() // una vez recibido se muestra en consola y se resetea el formulario
        })
})

btnVista.addEventListener('click',(evt)=>{ // evento de boton de ir a pagina de vista
    evt.preventDefault();
    window.location.href = "./productos"  // se redirecciona a vista de productos
})


