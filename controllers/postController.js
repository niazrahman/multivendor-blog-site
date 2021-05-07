const Flash = require('../utils/Flash');
const {validationResult} = require('express-validator')
const errorFormatter = require('../utils/validationErrorFormatter')
const readingTime = require('reading-time')
const Post = require('../models/Post')

exports.createPostGetController = (req,res,next) =>{
    res.render('pages/dashboard/post/createPost',{
        title : "Create A New Post",
        error : {},
        flashMessage : Flash.getMessage(req), 
        value : {}
    })
}


exports.createPostPostController = async (req,res,next) =>{
    let {title,body,tags} = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        res.render('pages/dashboard/post/createPost',{
            title : "Create A New Post",
            error : errors.mapped(),
            flashMessage : Flash.getMessage(req),
            value : {
                title,
                body,
                tags
            }

        })
    }

    if(tags){
        tags = tags.split(',')
    }
    let readTime = readingTime(body).text

    let post = new Post({
        title,
        body,
        author : req.user._id,
        tags,
        thumbnail : '',
        readTime,
        likes : [],
        dislikes : [],
        comments : []
    })

    if(req.file){
        post.thumbnail = `uploads${req.file.filename}`
    }

    try{
        let createdPost = await post.save()
        await Post.findOneAndUpdate(
            {user : req.user._id},
            {$push : {'post' : createdPost._id}}
        )
        req.flash('success','Post created successfully')
        return res.redirect(`post/edit/${createdPost._id}`)
    }catch(e){
        next(e)
    }
}