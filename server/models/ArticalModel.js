import { Schema,model } from "mongoose";

// create a user schema
const userCommentSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    comment : {
        type : String,
        trim : true,
        maxlength : [500,"Comment too long"]
    }
},{
    timestamps : true
});

//create article schema
const ArticleSchema = new Schema({
    author :{
        type :Schema.Types.ObjectId,
        ref : 'user',
        required : [true,"Author Id is required"]
    },
    title : {
        type : String,
        required : [true,"Title is required"]
    },
    category : {
        type : String,
        required : [true,"Category is required"]
    },
    content : {
        type : String,
        required : [true,"Content is required"]
    },
    comment : [userCommentSchema],
    isArticleActive : {
        type : Boolean,
        default : true
    }
},{
    strict : true,
    timestamps : true,
    versionKey : false
})

export const ArticleModel = model('article',ArticleSchema)