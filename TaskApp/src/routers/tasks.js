const express = require('express')
const router = new express.Router()
const Task = require('../models/tasks')
const { findById } = require('../models/users')


router.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.send(req.body)
    }catch(error){
        res.send(error).status(400)
        res.send(err)
    }
})

router.get('/tasks',async (req,res)=>{
    try{
       const tasks =  await Task.find({})
        console.log(tasks)
        res.status(200).send(tasks)
    }catch(error){
        res.status(400).send()
    }
})

router.get('/tasks/:id',async (req,res)=>{
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


router.patch('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    //Object.keys returns an arrary of property name of the object req.body
    const updates = Object.keys(req.body)
    const allowedUpdates = ['descrition','completed']

    //every methods checks the conditon
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))


    if(!isValidOperation){
        return res.status(400).send({
            error: 'invalid updates'
        })
    }
    try{
        const task = await findById(_id)

        updates.forEach((update)=>task[update]= req.body[update])
        await task.save()

        if (!task){
            res.send.status(400)
        }
        res.send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

router.patch('/softdelete/:id',async (req,res)=>{
    try {
        const _id = req.params.id;
    
        const task = await Task.findByIdAndUpdate(_id, { deleted: true }, { new: true });
    
        if (!task) {
          return res.status(404).send();
        }
    
        res.send(task);
      } catch (error) {
        res.status(500).send(error);
      }
})

module.exports= router