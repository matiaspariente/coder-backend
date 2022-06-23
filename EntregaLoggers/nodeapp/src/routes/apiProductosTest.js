import express from "express";
import faker from "faker";

const router = express.Router();


router.get('/',(req,res)=>{
    let content = [];
    let max = 5;
    for(let i = 0; i< max ; i++){
        content.push({
            title:faker.commerce.product(),
            price:faker.commerce.price(0, 1000, 0),
            thumbnail:faker.image.image(84,64)
        })
    }
    res.send(content);   
})

export default router;