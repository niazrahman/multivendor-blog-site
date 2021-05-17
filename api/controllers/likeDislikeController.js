const Post = require('../../models/Post')


exports.likesGetController = async (req,res,next) => {
    let {postId} = req.params
    let userId = req.user._id
    let liked = null

    if(!req.user){
        return res.status(403).json({
            error : 'You are not an Authenticated user'
        })
    }

    try{
        let post = await Post.findById(postId)
        if(post.dislikes.includes(userId)){
            await Post.findOneAndUpdate(
                {_id : postId},
                {$pull : {'dislikes' : userId}}
            )
        }

        if(post.likes.includes(userId)){
            await Post.findOneAndUpdate(
                {_id : postId},
                {$pull : {'likes' : userId}}
            )
        }else{
            await Post.findOneAndUpdate(
                {_id : postId},
                {$push : {'likes' : userId}}
            )
            liked = true
        }

        let updatedPost = await Post.findById(postId)
        res.status(200).json({
            liked,
            totalLikes : updatedPost.likes.length,
            totalDislikes : updatedPost.dislikes.length
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            error : 'Server Error Occured'
        })
    }
}