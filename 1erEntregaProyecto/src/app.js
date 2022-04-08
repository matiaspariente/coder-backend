import express from 'express';
import apiProductsRouter from './routes/apiProductos.js';
import apiCartsRouter from './routes/apiCarts.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';

const app= express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`))

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname+'/public'))

app.use('/api/products/',apiProductsRouter)

app.use('/api/carts/',apiCartsRouter)

app.use((req, res, next) => { // si se accede es por que no se accedio a una ruta valida, se informa como error
    res.status(404).send(`error : -2, descripcion: ruta ${req.originalUrl} método ${req.method} no implementada`)
    next()
  })

io.on('connection',socket=>{ // escucho conexiones nuevas
    socket.on('start',data=>{ //espero mensaje del fetch del primer GET para cargar tabla al conectar
        io.emit('log',data) // envio la data obtenida con el metodo GET 
    })
    socket.on('startCart',data=>{ //espero mensaje del fetch del primer POST para cargar tabla al conectar
        socket.emit('logCart',data) // envio la data obtenida con el metodo POST
    })
    socket.on('checkAdmin',data=>{ //espero mensaje del fetch del primer POST para informar condicion de administrador
        socket.emit('logAdmin',data) // envio la data obtenida con el metodo POST
    })
})

export default io