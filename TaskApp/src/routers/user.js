const express = require('express')
const router = new express.Router()

const User = require('../models/users')



router.get('/test',(req,res)=>{
    res.send("dummy router")
})




router.post('/users', async (req,res)=>{
    console.log(req.body)
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
    
})
router.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

router.get('/users/:id',async (req,res)=>{
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

router.post('/users/login', async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    }catch(err){
        res.send(400).send()
    }
})

router.patch('/users/:id', async (req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({
            error: 'invalid updates'
        })
    }
    try{
        const user = await User.findById(_id)

        updates.forEach((update)=>user[update]= req.body[update])
        await user.save()
        //const user = await User.findByIdAndUpdate(_id,req.body,{new: true, runValidators: true})
        if(!user){
            res.send().status(400)
        }
        res.status(200).send(user)
    }catch(error){
         res.status(400).send(error)
    }
})

module.exports = router