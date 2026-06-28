const express = require( "express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const Secret_key = process.env.Secret_key;

router.get('/', (req,res)=> {
    const authheader = req.headers.authorization;
    if(!authheader){
        res.status(401).json('no token')
    }
    const token = authheader.split(" ")[1];

    try{
        const decode = jwt.verify(
            token,Secret_key
        )
         res.status(200).json({username:decode.username} )
    }catch{

        res.status(401).json({
            message: 'invalid jwt'
        })
    }
   

})

module.exports = router;