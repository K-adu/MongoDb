const express = require('express')

require('./db/mongoose')
const User = require('./models/users')
const Test = require('./models/tasks')
const Task = require('./models/tasks')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000




app.post('/users', async (req,res)=>{
    console.log(req.body)
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
    
})
app.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

app.get('/users/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)

    }catch(error){
        res.status(500).send(error)
    }
    
})

app.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.send(req.body)
    }catch(error){
        res.send(error).status(400)
        res.send(err)
    }
})

app.get('/tasks',async (req,res)=>{
    try{
       const tasks =  await Task.find({})
        console.log(tasks)
        res.status(200).send(tasks)
    }catch(error){
        res.status(400).send()
    }
})

app.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id
    const tasks = await Task.findOne({_id: _id})
    try{
        if(!tasks){
           
            res.status(404).send()
        }
        res.status(200).send(tasks)
    }catch(error){
        res.status(500).send(error)
    }
})
app.patch('/users/:id', async (req,res)=>{
    const _id = req.params.id
    try{
        const user = await User.findByIdAndUpdate(_id,req.body,{new: true, runValidators: true})
        if(!user){
            res.send().status(400)
        }
        res.status(200).send(user)
    }catch(error){
         res.status(400).send(error)
    }
})

app.patch('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findByIdAndUpdate(_id,req.body,{new: true, runValidators: true})
        if (!task){
            res.send.status(400)
        }
        res.send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

app.patch('/softdelete/:id',async (req,res)=>{
    try {
        const _id = req.params.id;
    
        const task = await User.findByIdAndUpdate(_id, { deleted: true }, { new: true });
    
        if (!task) {
          return res.status(404).send();
        }
    
        res.send(task);
      } catch (error) {
        res.status(500).send(error);
      }
})
app.listen(PORT, ()=>{
    console.log('server running at port', PORT)
})