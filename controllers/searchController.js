const Post = require('../models/Post')
const Flash = require('../utils/Flash')

exports.searchResultGetController = async (req,res,next) => {

    let term = req.query.term
    let currentPage = req.query.page || 1
    let itemPerPage = 10

    try{
        let post = await Post.find({
            $text :{
                $search : term
            }
        })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        let totalPost = await Post.find({
            $text :{
                $search : term
            }
        })
        let totalPage = totalPost / itemPerPage

        res.render('/pages/explorer/search',{
            title : `Request For ${term}`,
            flashMessage : Flash.getMessage(req),
            searchTerm : term,
            itemPerPage,
            currentPage,
            totalPage
        })

    }catch(e){
        next(e)
    }

}