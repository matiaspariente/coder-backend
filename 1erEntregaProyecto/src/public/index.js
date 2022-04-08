let socket = io();
let ingresoProductos = document.getElementById('ingresoProductos')
let card = document.getElementById('cardsProductos')
let idCarrito = 0
let carritoEliminado = false
let Administrator = false


const options = {
    method: "GET"
  }; 

fetch('/api/products/', options) // se hace un fetch para atraves del metodo get obtener los productos cargados hasta el momento al iniciar la conexion con el cliente nuevo
    .then(response => response.text())
    .then(data => {
        socket.emit('start',JSON.parse(data))
});

fetch('/api/carts/',{method:'POST'}) // se hace un post a la api de carrito para generar el carrito
    .then(response => response.text())
    .then(data =>{
    socket.emit('startCart',JSON.parse(data))})
    
fetch('/api/products/',{ // se hace un post a la api de productos para verificar condicion de administrador
        method:'POST',
        body:JSON.stringify({check:1}), // se envia un obj cualquiera con un elemento check, para recibir respuesta de condicion de administrador
        headers:{
            "Content-Type":"application/json"
        }
        })
        .then(response => response.text())
        .then(data =>{
            socket.emit('checkAdmin',JSON.parse(data))}) // envio un obj cualquiera con un elemento check, para recibir respuesta de condicion de administrador
    
socket.on('logAdmin',checkAdmin=>{
    if(checkAdmin.message=="post de inicio de verificacion admin"){ // se verifica si recibo respuesta del post de verificacion
        Administrator = true // se cambia condicion a true
        ingresoProductos.innerHTML = `<h1>Formulario Ingreso de productos</h1><br>  
            <form id="userForm" class="flex-column formularioIngreso">
                <label class="form-label">Titulo</label>
                <input name="title" type="text" class="form-control">
                <label class="form-label">Descripcion</label>
                <input name="description" type="text" class="form-control">
                <label class="form-label">Codigo</label>
                <input name="code" type="text" class="form-control">
                <label class="form-label">Thumbnail</label>
                <input name="thumbnail" type="text" class="form-control">
                <label class="form-label">Precio</label>
                <input name="price" type="number" class="form-control">
                <label class="form-label">Stock</label>
                <input name="stock" type="number" class="form-control"> <br>
                <a type="submit" class="btn btn-primary" id="botonEnviar">Enviar</a>
            </form>  <br></br>`
        let form = document.getElementById('userForm') // se agrega el formulario de ingreso de productos
        let btnEnviar = document.getElementById('botonEnviar')  
        btnEnviar.addEventListener('click',(evt)=>{
            evt.preventDefault();
            let data = new FormData(form);
            let obj = {};
            data.forEach((value,key)=>obj[key]=value);
            fetch('/api/products/',{
                method:'POST',
                body:JSON.stringify(obj),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(Swal.fire({ icon: 'success', title: `Producto ingresado`})) // notificacion de ingreso de producto al presionar boton, el ingreso es a traves del post
        })
    }        
})

socket.on('log',products=>{ // se espera  respuesta del get de productos para cargar el listado de productos
    card.innerHTML = ''
    let viewAdmin = ""
    let styleAdmin = ""
    if(!Administrator){ // si es admin solo se permite la visualizacion 
        viewAdmin = "disabled readonly";
        styleAdmin = 'style="display:none;"'
    }
    if(!products.status) for (const productsCard of products) {  // carga de cards con los productos
                                if (card) {
                                    const contentCard = document.createElement('div');
                                        contentCard.innerHTML = ` 
                                            <div class="col">
                                                <div class="card text-center text-white bg-dark">
                                                    <form id="productForm${productsCard.id}">
                                                        <label class="form-label">ID</label>
                                                        <input class="form-control" name="id" type="number" value="${productsCard.id}" disabled readonly>
                                                        <label class="form-label">Timestamp</label>
                                                        <input class="form-control" name="timestamp" type="text" value="${productsCard.timestamp}" disabled readonly>
                                                        <label class="form-label">Titulo</label>
                                                        <input class="form-control" name="title" class="title" type="text" value="${productsCard.title}" ${viewAdmin}>
                                                        <label class="form-label">Descripcion</label>
                                                        <input class="form-control" name="description" type="text" value="${productsCard.description}" ${viewAdmin}>
                                                        <label class="form-label">Codigo</label>
                                                        <input class="form-control" name="code" type="text" value="${productsCard.code}" ${viewAdmin}>
                                                        <label class="form-label">Thumbail</label>
                                                        <input class="form-control" name="thumbnail" type="text" value="${productsCard.thumbnail}" ${viewAdmin}>
                                                        <label class="form-label">Precio</label>
                                                        <input class="form-control" name="price" type="number" value="${productsCard.price}" ${viewAdmin}>
                                                        <label class="form-label">Stock</label>
                                                        <input class="form-control" name="stock" type="number" value="${productsCard.stock}" ${viewAdmin}>
                                                        <a class="btn btn-primary" id="botonActualizar${productsCard.id}" ${styleAdmin}>Actualizar</a>
                                                        <a class="btn btn-primary" id="botonBorrar${productsCard.id}" ${styleAdmin}>Borrar</a>
                                                        <a class="btn btn-primary" id="botonAgregar${productsCard.id}">Agregar al Carrito</a>
                                                    </form>    
                                                </div>
                                            </div>
                                            `;       
                                    card.append(contentCard);
                                    let btnBorrar = document.getElementById(`botonBorrar${productsCard.id}`)  // botones de modificacion, eliminacion y agregar al carrito
                                    let btnActualizar = document.getElementById(`botonActualizar${productsCard.id}`)
                                    let btnAgregar = document.getElementById(`botonAgregar${productsCard.id}`)
                                    let productForm = document.getElementById(`productForm${productsCard.id}`)
                                    btnBorrar.addEventListener('click',(evt)=>{ // boton de borrar fetch con metodo delete
                                        evt.preventDefault();
                                        fetch(`/api/products/${productsCard.id}`,{
                                        method:'DELETE',
                                        }).then(Swal.fire({ icon: 'success', title: `Producto con id: ${productsCard.id} borrado`}))
                                    })
                                    btnActualizar.addEventListener('click',(evt)=>{ // boton de actualizar fetch con metodo put y body con los datos cargados en la card correspondiente
                                        evt.preventDefault();
                                        let data = new FormData(productForm);
                                        let obj = {};
                                        data.forEach((value,key)=>obj[key]=value);
                                        fetch(`/api/products/${productsCard.id}`,{
                                            method:'PUT',
                                            body:JSON.stringify(obj),
                                            headers:{
                                            "Content-Type":"application/json"
                                            }
                                        }).then(Swal.fire({ icon: 'success', title: `Producto con id: ${productsCard.id} modificado`}))
                                    })
                                    btnAgregar.addEventListener('click',(evt)=>{ // boton de agregar producto, fetch con metodo post con el body informando id de carrito y cantidad a agregar"
                                        evt.preventDefault();
                                        let obj = {id:`${productsCard.id}`,quantity:1}
                                        fetch(`/api/carts/${idCarrito}/products`,{
                                            method:'POST',
                                            body:JSON.stringify(obj),
                                            headers:{
                                                "Content-Type":"application/json"
                                            }
                                        }).then(Swal.fire({ icon: 'success', title: `Producto con id: ${productsCard.id} Agregado al carrito`}))    
                                    })    
                                }
                }           
})  


socket.on('logCart',carts=>{ // se espera respuesta del get de carrito para cargar el listado de productos
    let tabla="" 
    let content = []
    let idMax = 0
    let carritoAsignado = ""
    if(carts.message){                            // verificacion de ID de carrito y de asignacion en el caso de que se borre.
        carritoAsignado=carts.message.slice(0,21)
    } 
    if(carritoAsignado=="carrito creado con ID"){ 
        carts.message= carts.message.slice(22)
        idCarrito=parseInt(carts.message)
        carritoAsignado=true
        }
    else if (!carritoEliminado){  // si no esta eliminado se genera la tabla correspondiente
        content=carts.find(carts=>carts.id == idCarrito)
        tabla="<thead><tr><th>ProductID</th><th>Cantidad</th><th>Borrar</th></thead>"
        if(!content.products.length) tabla=""
        if(!carts.status) for (const elementCart of content.products){
            tabla +=`<tr><td>${elementCart.products.id}</td><td>${elementCart.products.quantity}</td>
            <td><a class="btn btn-danger" id="botonEliminar${elementCart.products.id}">Borrar</a></tr></td>`
            if(elementCart.products.id>idMax) idMax = elementCart.products.id
        }
    }
    if(carts.message!=idCarrito && !carritoEliminado){
        tabla+='<a class="btn btn-danger" id="botonEliminarTodo">FinalizarCompra</a>'
        if(!content.products.length) tabla=""
        document.getElementById("carrito").innerHTML = tabla
        let btnEliminarTodo = document.getElementById(`botonEliminarTodo`) // botones de elimniar carrigo y de eliminar producto de carrito a traves del metodo delete
        if(btnEliminarTodo){
                btnEliminarTodo.addEventListener('click',(evt)=>{
                carritoEliminado = true;
                evt.preventDefault();
                fetch(`/api/carts/${idCarrito}`,{method:'DELETE'})
                .then(()=>{
                    Swal.fire({ icon: 'success', title: `Compra Finalizada Carrito Eliminado`})
                    .then(()=>{location.reload()})
                })
            })
        }         
        for(let i=1;i<=idMax;i++){
            let btnEliminar = document.getElementById(`botonEliminar${i}`)
            if(btnEliminar){
                btnEliminar.addEventListener('click',(evt)=>{
                evt.preventDefault();
                fetch(`/api/carts/${idCarrito}/products/${i}`,{method:'DELETE'})
                .then(Swal.fire({ icon: 'success', title: `Producto eliminado del carrito`}))
                })        
            }
        }         
    }
                
})
