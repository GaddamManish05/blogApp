import exp from 'express'
import {authenticate, register} from '../Services/AuthService.js'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewares/verifyToken.js';
import { ArticleModel } from '../models/ArticalModel.js';
import { checkAuthor } from '../middlewares/checkAuthor.js';
import { upload } from '../config/multer.js'
import  cloudinary  from '../config/cloudinary.js'
import { uploadToCloudinary } from '../config/cloudinaryUpload.js'

export const userApp = exp.Router();
// register user
userApp.post(
        "/users",
        upload.single("profileImageUrl"),
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );
// Read All Articles
userApp.get(
  '/articles',
  verifyToken("USER"),
  async(req,res)=>{

    try{

      console.log("Route reached");

      console.log("ArticleModel:", ArticleModel);

      let articleDocs = await ArticleModel.find({
        isArticleActive : true
      }).limit(9);

      console.log("Articles:", articleDocs);

      res.status(200).json({
        message : "Articles",
        payload : articleDocs
      });

    }catch(err){

      console.log("ARTICLE ERROR:", err);

      res.status(500).json({
        message : "Articles Fetch Failed",
        error : err.message
      });
    }
})
// Add Comment to an article
userApp.put(
  '/comments',
  verifyToken("USER"),
  async(req,res)=>{

    try{

      // extract data
      let { articleId, comment } = req.body;

      // validation
      if(!comment?.trim()){

        return res.status(400).json({
          message:"Comment cannot be empty"
        });
      }

      // verify article exists
      let article = await ArticleModel.findOne({
        _id:articleId,
        isArticleActive:true
      });

      if(!article){

        return res.status(404).json({
          message:"Article not found"
        });
      }

      // add comment
      let updatedArticle = await ArticleModel.findOneAndUpdate(

        {
          _id:articleId
        },

        {
          $push:{
            comment:{
              user:req.user.userId,
              comment:comment.trim()
            }
          }
        },

        {
          new:true
        }

      )

      // populate author
      .populate("author")

      // populate comment users
      .populate("comment.user");

      // send response
      res.status(200).json({

        message:"Comment Added",

        payload:updatedArticle

      });

    }catch(err){

      console.log(err);

      res.status(500).json({

        message:"Failed to add comment",

        error:err.message

      });
    }
})
// article by id..
userApp.get(
  '/article/:id',
  verifyToken("USER","AUTHOR"),
  async(req,res)=>{

    try{

      let { id } = req.params;

      // get article
      let article = await ArticleModel.findOne({
        _id:id,
        isArticleActive:true
      })

      // populate author details
      .populate("author")

      // populate comment users
      .populate("comment.user");

      // article not found
      if(!article){

        return res.status(404).json({
          message:"Article not found"
        });
      }

      // send response
      res.status(200).json({
        message:"Article",
        payload:article
      });

    }catch(err){

      console.log(err);

      res.status(500).json({
        message:"Failed to fetch article",
        error:err.message
      });
    }
})

// delete the comment 
userApp.delete(
  '/comments/:articleId/:commentId',
  verifyToken("USER"),
  async(req,res)=>{

    try{

      let { articleId, commentId } = req.params;

      // find article
      let article = await ArticleModel.findById(articleId);

      if(!article){

        return res.status(404).json({
          message:"Article not found"
        });
      }

      // find comment
      let targetComment = article.comment.find(
        (c) => c._id.toString() === commentId
      );

      if(!targetComment){

        return res.status(404).json({
          message:"Comment not found"
        });
      }

      // ownership check
      if(
        targetComment.user.toString() !==
        req.user.userId
      ){

        return res.status(403).json({
          message:"Forbidden"
        });
      }

      // delete comment
      let updatedArticle =
        await ArticleModel.findByIdAndUpdate(

          articleId,

          {
            $pull:{
              comment:{
                _id:commentId
              }
            }
          },

          {
            new:true
          }

        )

        .populate("author")
        .populate("comment.user");

      res.status(200).json({

        message:"Comment Deleted",

        payload:updatedArticle

      });

    }catch(err){

      console.log(err);

      res.status(500).json({

        message:"Failed to delete comment",

        error:err.message

      });
    }
})