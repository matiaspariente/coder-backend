import express from 'express';
import apiProductosRouter from './routes/apiProductos.js';
import viewsRouter from './routes/viewRouter.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';

const app= express();
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`))

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.use('/',viewsRouter)
app.use('/api/productos/',apiProductosRouter)

