// global error handler is for unexpected error for expected error we extend error class and use apierror

const GEHM = (err,req,res,next) => {

     return res.status(500).json( {
        success:false,
        message: err.message || "Internal Server Error"
     })
}

module.exports =GEHM;