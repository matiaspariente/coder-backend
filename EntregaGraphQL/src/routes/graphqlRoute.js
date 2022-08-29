import express from "express";
import { graphqlHTTP } from 'express-graphql'
import { funciones,schema } from '../graphql.js'

const router = express.Router();

router.use('/',graphqlHTTP({
    schema: schema,
    rootValue:{
        ...funciones
    },
    graphiql: true,
}));

export default router;