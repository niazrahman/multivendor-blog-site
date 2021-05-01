const dotEnv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const setMiddleware = require('./middleware/middleware')

// import routes
const setRoutes = require('./routes/routes')

dotEnv.config({path:'./config.env'})



const MONGODB_URI = `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.vrfoh.mongodb.net:27017,cluster0-shard-00-01.vrfoh.mongodb.net:27017,cluster0-shard-00-02.vrfoh.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-mlimxa-shard-0&authSource=admin&retryWrites=true&w=majority`

const app = express() 
// setup view engine 
app.set('view engine','ejs')
app.set('views','views')

// using middleware from middleware directory
setMiddleware(app)


// Using routes from route directory
setRoutes(app)

app.use((req,res,next) =>{
    let error = new Error ('404 page not found')
    error.status = 404
    next(error)
})

app.use((error,req,res,next)=>{
    if(error.status===404){
        return res.render('pages/error/404',{flashMessage : {}})
    }
})
const PORT = process.env.PORT || 3030
mongoose.connect(MONGODB_URI,{
    useNewUrlParser : true,
    useUnifiedTopology: true 
})

.then(() =>{
    console.log(chalk.green.inverse('Database Connected'))
    app.listen(PORT,() =>{
        console.log(chalk.green.inverse(`SERVER IS RUNNING ON PORT ${PORT}`))
    })
})
.catch(e =>{
    return console.log(e)
})