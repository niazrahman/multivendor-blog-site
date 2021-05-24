const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
const playgroundRoute = require('../playground/play')
const uploadRoute = require('./uploadRoute')
const postRoute = require('./postRoute')
const searchRoute = require('./searchRoute')
const apiRoutes = require('../api/routes/apiRoutes')
const exploreRoute = require('./exploreRoute')
const authorRoute = require('./authorRoute')

const routes = [
    {
        path : '/auth',
        handler : authRoute
    },
    {
        path : '/dashboard',
        handler : dashboardRoute
    },
    {
        path : '/uploads',
        handler : uploadRoute
    },
    {
        path:'/post',
        handler : postRoute
    },
    {
        path : '/explorer',
        handler : exploreRoute
    },
    {
        path : '/author',
        handler : authorRoute
    },
    {
        path :'/',
        handler : searchRoute
    },
    {
        path : '/api',
        handler : apiRoutes
    },
    {
        path: '/playground',
        handler : playgroundRoute
    },
    {
        path : '/',
        handler : (req,res) => {

            res.json({
                message : 'Welcome'
            })
    }
}
]
module.exports = app =>{
    routes.forEach(r =>{
        if(r.path === '/'){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}