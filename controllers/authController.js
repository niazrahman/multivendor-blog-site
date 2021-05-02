const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const Flash = require('../utils/Flash')
const { findOne } = require('../models/User')
const User = require('../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')

exports.signupGetController = (req,res,next) =>{
    res.render('pages/auth/signup', {title : "Create A New Account", error : {}, value : {},flashMessage : Flash.getMessage(req)})
}

exports.signupPostController = async (req,res,next) => {
    let {username, email, password} = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        req.flash('fail','Please check your form')
        return res.render('pages/auth/signup', 
        {
            title : "Create A New Account", 
            error : errors.mapped(),
            value : {
                username,email,password
            },
            flashMessage : Flash.getMessage(req)
            
        })
    }
   

    try{
        let hashedPassword = await bcrypt.hash(password,11)
        let user = new User ({
            username,
            email,
            password : hashedPassword
        })
        await user.save()
        req.flash('success','User created successfully')
        res.redirect('/auth/login')
    }catch(e){
        next(e)
    }
}

exports.loginGetController = (req,res,next) => {
    res.render('pages/auth/login',{title:"Login to Your Account", error : {},flashMessage : Flash.getMessage(req)})
}

exports.loginPostController = async (req,res,next) =>{
    let {email, password} = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        req.flash('fail','Please check your form')
        return res.render('pages/auth/login', 
        {
            title : "Login to Your Account", 
            error : errors.mapped(),
            flashMessage : Flash.getMessage(req)
        })
    }
    try{
        let user = await User.findOne({email})
        if(!user){
            req.flash('fail','Please provide valid input')
            return res.render('pages/auth/login', 
        {
            title : "Login to Your Account", 
            error : {},
            flashMessage : Flash.getMessage(req)
        })
        }

        let match = await bcrypt.compare(password,user.password)

        if(!match){
            req.flash('fail','Please provide valid input')
            return res.render('pages/auth/login', 
            {
                title : "Login to Your Account", 
                error : {},
                flashMessage : Flash.getMessage(req)
            })
        }

        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err=>{
            if(err){
                return next(err)
            }
            req.flash('success','Logged in successfully')
            res.redirect('/dashboard')
        })
        
    }
    catch(e){
        next(e)
    }
}

exports.logoutController = (req,res,next) => {
    console.log(req.session)
    req.session.destroy( err =>{
        if(!err){
            
            return res.redirect('/auth/login')
            
        }
        return next(err)
        // 
            
    })
}