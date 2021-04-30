const router = require('express').Router();
const {check,validationResult} = require('express-validator')

router.get('/validator',(req,res,next) =>{

    console.log(req.flash('fail'))
    console.log(req.flash('success'))
    res.render('playground/signup',{title : "Validator Playground"})
})

router.post('/validator',
[
    check('username')
        .not()
        .isEmpty()
        .withMessage(`Username can not be empty`)
        .isLength({max:15})
        .withMessage(`Username must contain within 15 character`)
        .trim(),
    check('email')
        .isEmail()
        .withMessage(`Please provide a valid Email`)
        .normalizeEmail(),
    check('password').custom(value =>{
        if(value.length < 5){
            throw new Error(`Password must contain 6 or more than 6 charecters`)
        }
        return true
    }),
    check('confirmPassword').custom((value,{req}) =>{
        if(value !== req.body.password){
            throw new Error(`Password does not match`)
        }
        return true
    })

],

(req,res,next) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash('fail','There is some error')
    }else{
        req.flash('success','There is no error')
    }
    res.redirect('/playground/validator')
})

module.exports = router