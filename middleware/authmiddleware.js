const Secret_key = process.env.Secret_key
const jwt = require("jsonwebtoken")

const authmiddleware= (req,res,next)=>{

    const authheader = req.headers.authorization;
    if( !authheader){
        return res.status(401).json({
            success:false,
            message:"token invalid"
        })
    }


    const token = authheader.split(" ")[1];
    try{
     const decode = jwt.verify(token,Secret_key)
     req.user= decode;    // we can attach custom properties to req object like req.sam 
     next()
    }catch{
        return res.status(401).json({
            success:false,
            message: 'invalid jwt'
        })
    }
    
}



module.exports= authmiddleware;