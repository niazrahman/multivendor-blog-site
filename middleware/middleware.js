const express = require('express')
const morgan = require ('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const MongoDBStore = require('connect-mongodb-session')(session)
const dotEnv = require('dotenv')
dotEnv.config({path:'./config.env'})
const MONGODB_URI = `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.vrfoh.mongodb.net:27017,cluster0-shard-00-01.vrfoh.mongodb.net:27017,cluster0-shard-00-02.vrfoh.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-mlimxa-shard-0&authSource=admin&retryWrites=true&w=majority`
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
});

const {bindUserWithRequest} = require('./authMiddleware')
const setLocals = require('./setLocals')
// middleware array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret : process.env.SECRET_KEY||'SECRET_KEY',
        resave : false,
        saveUninitialized : false,
        store : store
    }),
    bindUserWithRequest(),
    setLocals(),
    flash()
]

module.exports = app =>{
    middleware.forEach(m =>{
        app.use(m)
    })
}
