const express = require('express')
require('./db/mongoose')


const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')
const app = express()

app.use(express.json())


// app.use((req, res, next) => {
//     res.send('The server is under maintainece').status(500)
// // Call next to pass control to the next middleware/route handler
// });



app.use(userRouter)
app.use(taskRouter)


const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
    console.log('server running at port', PORT)
})
