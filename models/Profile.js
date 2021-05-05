// user, title, bio, profilePics, links : {fb, tw, linkind},posts, bookmarks

const {Schema,model} = require('mongoose')


const profileSchema = new Schema ({ 
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    name : {
        type : String,
        required : true,
        trim : true,
        maxlength : 50
    },
    title : {
        type : String,
        trim : true,
        required : true,
        maxlength : 100
    },

    bio : {
        type : String,
        trim : true,
        maxlength : 500
    },
    profilePic : {
        type : String
    },
    links : {
        website : String,
        facebook : String,
        twitter : String,
        github : String
    },
    posts : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Post'
        }
    ],
    bookmarks : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Post'
        }
    ]
},{
    timestamps : true
})

const Profile = model ('Profile',profileSchema)

module.exports = Profile