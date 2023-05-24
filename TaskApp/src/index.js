const express = require('express')

require('./db/mongoose')
const User = require('./models/users')
const Test = require('./models/tasks')
const Task = require('./models/tasks')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000




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
app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)

    }).catch((err)=>{
        res.status(500).send()
    })
})

app.get('/users/:id',(req,res)=>{
    const _id = req.params
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
    }).catch((err)=>{
        res.status(500).send()
    })
})

app.post('/tasks',(req,res)=>{
    const task = new Task(req.body)

    task.save().then(()=>{
        res.send(req.body)
    }).catch((err)=>{
        res.send.status(400)
        res.send(err)
    })
})

app.listen(PORT, ()=>{
    console.log('server running at port', PORT)
})