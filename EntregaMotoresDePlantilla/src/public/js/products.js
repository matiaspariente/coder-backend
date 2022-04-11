let btnIngreso = document.getElementById('btnIngresoProductos')

btnIngreso.addEventListener('click',(evt)=>{ // evento de boton de ir a ingreso de productos
    evt.preventDefault();
    window.location.href = "../" // se redirecciona a Ingreso de productos
})