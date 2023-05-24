const mongoose = require('mongoose')

try{
    mongoose.connect('mongodb://localhost:27017/mongoose' ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(()=>{
    console.log('database connection success')
    }).catch((error)=>{
    console.log('database connection errror',error)
    })

}catch(error){
    console.log(error)
}
