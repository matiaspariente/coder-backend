import express from 'express';
import apiProductosRouter from './routes/apiProductos.js';
import apiProductosTestRouter from './routes/apiProductosTest.js';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import { DateTime } from "luxon";
import {schema, normalize, denormalize} from 'normalizr'
import fs from 'fs';



const app= express();
const PORT = process.env.PORT||8050;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const io = new Server(server);

app.use('/',express.static(__dirname+'/public'))

app.use('/api/productos/',apiProductosRouter)
app.use('/api/productos-test/',apiProductosTestRouter)


const log = [];
console.log()
const chatLog = JSON.parse(fs.readFileSync(__dirname+'/data/chat.json','utf-8'));



io.on('connection',socket=>{ // escucho conexiones nuevas
    socket.on('start',data=>{ //espero mensaje del fetch del primer GET para cargar tabla al conectar
        io.emit('log',data) // envio la data obtenida con el metodo GET 
    })
    socket.on('message',data=>{ //espero mensajes nuevos del chat
        if(data){ // este if es para evitar el primer mensaje  luego de ser ingresado el mail en la notificacion, es para poder mostrar el chat completo al iniciar la conexion si no pushearia basura al log
            const messageCurrent = {
                author:{
                id: data.id,
                nombre: data.nombre,
                apellido: data.apellido,
                edad: data.edad,
                alias: data.apellido,
                avatar: data.avatar
                },
                text: data.text
            }
            //data.fecha=dt.toLocaleString(DateTime.DATE_SHORT) // guardo la fecha actual para el mensaje
            //data.hora=dt.toLocaleString(DateTime.TIME_WITH_SECONDS) // guardo hora actual para el mensaje
            chatLog.messages.push(messageCurrent); // agrego el mensaje al array de mensajes
            fs.writeFileSync(__dirname+'/data/chat.json',JSON.stringify(chatLog),'utf-8');
        }
        const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'id' });
        const schemaChat = new schema.Entity('chat', { messages: [{author: schemaAuthor}] });
        let chatNormalizada = normalize(chatLog,schemaChat)
        let chatDesnormalizada = denormalize(chatNormalizada.result,schemaChat,chatNormalizada.entities)
        let compresion = 100 - (JSON.stringify(chatNormalizada).length*100 / JSON.stringify(chatDesnormalizada).length)
        io.emit('chat',chatLog,compresion) // lo envio a los clientes
    })
})

export default io;