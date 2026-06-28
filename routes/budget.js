const express = require('express');
const router  = express.Router();

const fs = require('fs');
const path = require('path');
const authmiddleware = require('../middleware/authmiddleware');

const budgetFilePath = path.join(__dirname,"..", "budget.json");

router.patch( '/',authmiddleware,(req,res)=> {
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

router.get("/",authmiddleware, (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(budgetFilePath, "utf-8")
  );

  res.json(data);
});

router.post("/",authmiddleware, (req, res) => {
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

module.exports = router ;