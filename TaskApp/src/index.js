const express = require('express')

require('./db/mongoose')
const User = require('./models/users')
const app = express()

const PORT = process.env.PORT || 3000


app.use(express.json())

app.post('/users', (req,res)=>{
    console.log(req.body)
    const user = new User(req.body)

    user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        res.status(400)
        res.send(err)
    })

})


app.listen(PORT, ()=>{
    console.log('server running at port', PORT)
})