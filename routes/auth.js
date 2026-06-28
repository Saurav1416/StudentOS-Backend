const express = require('express');
const path = require('path')
const fs =require('fs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Secret_key=process.env.Secret_key;
const usersFilePath = path.join(

  __dirname,"..",
  "users.json"
);
router.post('/login',(req,res)=>{
    const { username,password} = req.body

    const users = JSON.parse(
    fs.readFileSync(usersFilePath, "utf-8"));
    
    const user = users.find( (u)=>(
         u.username ===username &&
         u.password === password
    ))
    if (!user) {
        return res.status(401).json({
            success :false,
            message : "invalid credentials"
        })

    };
    const token = jwt.sign(
        { 
            username: user.username,
            password: user.password
        },
        Secret_key,
        {
            expiresIn :"1h"
        }
    )
    res.json({
        success: true,
        token
    });
});

router.post( '/signup', (req,res)=>{

    const {username,password}= req.body;

    const users = JSON.parse(
    fs.readFileSync(usersFilePath, "utf-8"));

     const existing_user = users.find ((u)=> 
       ( u.username ===username 
    )
    )
    if( existing_user) {
        return res.status(400).json({
            success:false,
            message:'user exist already'
        })
    }
    const newUser = {
        username,
        password
    }
    users.push(newUser);

    fs.writeFileSync(usersFilePath,JSON.stringify(users,null,2));

    const token = jwt.sign(
        {
            username:username,
            password:password
        },
        Secret_key,
        {expiresIn:'1h'}

    )

    res.status(200).json({
        success:true,
        token
    })


})

module.exports = router;
