const express = require('express');
const path = require("path");
const cors = require ('cors');
const jwt = require('jsonwebtoken');
const Port = process.env.PORT || 3000;
const fs = require("fs");
const usersFilePath = path.join(

  __dirname,
  "users.json"
);
const Secret_key=process.env.Secret_key

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended :false}));
app.use(cors());



app.post('/login',(req,res)=>{
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

app.post( '/signup', (req,res)=>{

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

    fs.writeFile(usersFilePath,JSON.stringify(users,null,2));

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

const budgetFilePath = path.join(
  __dirname,
  "budget.json"
);

app.patch( '/budget',(req,res)=> {
    const data = JSON.parse( fs.readFileSync(budgetFilePath,'utf-8', 
    ));
    const {name,spent}= req.body;

     const t = data.find( (d)=> d.name === name)

     if(! t ) {
        return res.status(404).json ({
            success:false,
            message:"user not found"
        })
     }
     t.spent = spent;
     t.name= name;

     fs.writeFile( budgetFilePath,JSON.stringify(data,null,2) , (err)=>{
        if(err){
           return res.status(500).json({
                success:false,
                message:"error updataing the database"
            })
        }
        res.status(200).json({
            success:true,
            message:"Category Updated"
        })
     })
})

app.get("/budget", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(budgetFilePath, "utf-8")
  );

  res.json(data);
});

app.post("/budget", (req, res) => {
    const name = req.body.name
  const data = JSON.parse(
    fs.readFileSync(budgetFilePath, "utf-8")
  );
  
  const t = data.find((b)=> name===b.name )

  if( t)  {
      return res.status(400).json({
            success:false,
            message:'budget category  already exist'
        })
  }

  data.push(req.body);

  fs.writeFileSync(
    budgetFilePath,
    JSON.stringify(data, null, 2)
  );

  res.status(201).json({
    success:true,
    message: "Category added",
  });
});

app.get('/', (req,res)=> {
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


app.listen(Port , ()=> {

    console.log( `server listening on port ${Port}`);
});