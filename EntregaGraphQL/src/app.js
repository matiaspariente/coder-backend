import express from 'express';
import graphqlRouter from './routes/graphqlRoute.js';
import __dirname from './utils.js';

const app= express();
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname+'/public'))

app.use('/graphql',graphqlRouter)

