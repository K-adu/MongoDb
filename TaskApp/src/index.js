const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


const Task = require('./models/task')
const User = require('./models/user')

// testing multer


// we need to configure multer
//making a new multer instance


  







const main = async () => {
    // const task = await Task.findById('5c2e505a3253e18a43e612e6')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('5c2e4dcb5eac678a23725b5b')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
}

main()