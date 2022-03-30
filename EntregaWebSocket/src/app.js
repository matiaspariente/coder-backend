import express from 'express';
import apiProductosRouter from './routes/apiProductos.js';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import { DateTime } from "luxon";


const app= express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const io = new Server(server);

app.use('/',express.static(__dirname+'/public'))

app.use('/api/productos/',apiProductosRouter)


const log = [];

io.on('connection',socket=>{ // escucho conexiones nuevas
    socket.on('start',data=>{ //espero mensaje del fetch del primer GET para cargar tabla al conectar
        io.emit('log',data) // envio la data obtenida con el metodo GET 
    })
    socket.on('message',data=>{ //espero mensajes nuevos del chat
        if(data){ // este if es para evitar el primer mensaje  luego de ser ingresado el mail en la notificacion, es para poder mostrar el chat completo al iniciar la conexion si no pushearia basura al log
            let dt = DateTime.now() //tomo el dia
            data.fecha=dt.toLocaleString(DateTime.DATE_SHORT) // guardo la fecha actual para el mensaje
            data.hora=dt.toLocaleString(DateTime.TIME_WITH_SECONDS) // guardo hora actual para el mensaje
            log.push(data); // agrego el mensaje al array de mensajes
        }    
        io.emit('chat',log) // lo envio a los clientes
    })
})

export default io;