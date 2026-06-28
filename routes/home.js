const express = require( "express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const authmiddleware = require("../middleware/authmiddleware")

const Secret_key = process.env.Secret_key;

router.get('/',authmiddleware, (req,res)=> {
    
   
        return res.status(200).json({
            success:true,
            username:req.user.username} )
    
   

})

module.exports = router;