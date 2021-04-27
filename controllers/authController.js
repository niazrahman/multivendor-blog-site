const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const { findOne } = require('../models/User')
const User = require('../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')

exports.signupGetController = (req,res,next) =>{
    res.render('pages/auth/signup', {title : "Create A New Account", error : {}, value : {}})
}

exports.signupPostController = async (req,res,next) => {
    let {username, email, password} = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        return res.render('pages/auth/signup', 
        {
            title : "Create A New Account", 
            error : errors.mapped(),
            value : {
                username,email,password
            }
        })
    }
   

    try{
        let hashedPassword = await bcrypt.hash(password,11)
        let user = new User ({
            username,
            email,
            password : hashedPassword
        })
        let createdUser = await user.save()
        console.log('User Created successfully!',createdUser)
        res.render('pages/auth/signup', {title : "Create A New Account"})
    }catch(e){
        console.log(e)
        next(e)
    }
}

exports.loginGetController = (req,res,next) => {
    res.render('pages/auth/login',{title:"Login to Your Account"})
}

exports.loginPostController = async (req,res,next) =>{
    let {email, password} = req.body
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.json({
                message : "Invalid Input",
            })
        }

        let match = await bcrypt.compare(password,user.password)

        if(!match){
            return res.json({
                message : "Invalid Input"
            })
        }

        console.log('successfully logged In',user)
        res.render('pages/auth/login',{title:"Login to Your Account"})
    }
    catch(e){
        console.log(e)
        next(e)
    }
}

exports.logoutController = (req,res,next) => {

}