const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
// import routes
const authRoutes = require('./routes/authRoute')
const app = express()
// setup view engine 
app.set('view engine','ejs')
app.set('views','views')
// middleware array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret : process.env.SECRET_KEY||'SECRET_KEY',
        save : false,
        saveUninitialized : false
    })
]

app.use(middleware)
app.use('/auth',authRoutes)
app.get('/', (req,res) => {

    res.json({
        message : 'Welcome'
    })
})

const PORT = process.env.PORT || 3030
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00.vrfoh.mongodb.net:27017,cluster0-shard-00-01.vrfoh.mongodb.net:27017,cluster0-shard-00-02.vrfoh.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-mlimxa-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser : true,
})

.then(() =>{
    console.log('Database Connected')
    app.listen(PORT,() =>{
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
    })
})
.catch(e =>{
    return console.log(e)
})