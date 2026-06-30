

const wrapper = (fn) => {

    return ( req,res,next) =>{

        Promise.resolve(fn(req,res,next))
        .catch(next)          // here catch automatically calls next(err)

    }
}

module.exports = wrapper;


//anothe way of writing wrapper function 

// const wrapper = (fn) => {         

//     return async (req,res,next)=> {

//         try {
//             await fn ( req,res,next);
//         }catch(err){
//             next(err)
//         }
//     }
// }


//i can even do 


//const wrapper = (fn) => async (req,res,next)=> {                     works same just outer is implicit and inner is explicit

//    try {
//             await fn ( req,res,next);
//         }catch(err){
//             next(err)
//         }
//     }