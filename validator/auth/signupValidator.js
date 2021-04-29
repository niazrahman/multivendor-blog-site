const {body} = require('express-validator')
const User = require('../../models/User')

module.exports = [
    body('username')
        .isLength({min:2, max:15}).withMessage('username must be contain within 2 to 15 characters')
        .custom(async username =>{
            let user = await User.findOne({username})
            if(user){
                return Promise.reject('Username already in use')
            }
        })
        .trim(),
    body('email')
        .isEmail().withMessage('Please provide a valid Email')
        .custom(async email =>{
            let user = await User.findOne({email})
            if(user){
                return Promise.reject('Email is already in use')
            }
        })
        .normalizeEmail(),
    body('password')
        .isLength({min:5}).withMessage('Password must be contain at least 6 characters'),
    body('confirmPassword')
        .isLength({min:5}).withMessage('Password must be contain at least 6 characters')
        .custom((confirmPassword,{req})=>{
            if(confirmPassword !== req.body.password){
                throw new Error('Password does not match')
            }
            return true
        })
]