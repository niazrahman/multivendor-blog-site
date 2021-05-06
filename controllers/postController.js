const Flash = require('../utils/Flash');

exports.createPostGetController = (req,res,next) =>{
    res.render('pages/dashboard/post/createPost',{
        title : "Create A New Post",
        error : {},
        flashMessage : Flash.getMessage(req)
    })
}


exports.createPostPostController = (req,res,next) =>{
    res.render('pages/dashboard/posts/createPost',{
        title : "Create A New Post",
        error : {},
        flashMessage : Flash.getMessage(req)
    })
}