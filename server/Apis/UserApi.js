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
userApp.get('/articles',verifyToken("USER"),async(req,res) => {
    // extract all the articles from article collection
    let articleDocs = await ArticleModel.find({isArticleActive : true});
    console.log(articleDocs);
    // send response all aricle
    res.status(200).json({message : "Articles" , payload : articleDocs});
})
// Add Comment to an article
userApp.put('/comments',verifyToken("USER"),async(req,res) => {
    // get article as from req parameter
    let {articleId,user,comment} = req.body;
    // verify wheather article present or not
    let articleStatus = await ArticleModel.findOne({_id : articleId});
    console.log(articleStatus)
    if(user !== req.user.userId){ 
        return res.status(403).json({message : "Forbidden"});
    }
    if(!articleStatus){
        return res.status(400).json({message : "Article not found"});
    }
    // add comments to article if valid and update in db
    let addComment = await ArticleModel.findOneAndUpdate({_id : articleId , isArticleActive : true},{$push : {comment : {user : articleId , comment : comment}}},{new : true});
    // send res
    res.status(200).json({message : "Comment Added to article"});
})