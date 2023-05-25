const jwt = require('jsonwebtoken')
const User = require('../models/users')
const Auth = async (req,res,next)=>{
     try{
         const token = req.header('Authorization').replace('Bearer','').trim()
        console.log(token)
        //  next()
         const decoded = jwt.verify(token, 'thisisebcourse')
         console.log(decoded)
         console.log(token)
         const user = await User.findById({_id: decoded._id, 'tokens.tokens': token})
         if(!user){
             throw new Error('Error finding user')
         }
         req.user = user
        next()
     }catch(err){
         res.send('errpr please authencitate').status(400)
     }
     console.log('auth middleware')
}
module.exports = Auth