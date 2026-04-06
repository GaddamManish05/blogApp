import exp from 'express'
import {register,authenticate} from '../Services/AuthService.js'
import { UserTypeModel } from '../models/UserModel.js';
import { ArticleModel } from '../models/ArticalModel.js';
import {checkAuthor} from '../middlewares/checkAuthor.js'
import { verifyToken } from '../middlewares/verifyToken.js';
import {upload} from '../config/multer.js'
import cloudinary from '../config/cloudinary.js';
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
export const authorApp = exp.Router();

// register author
authorApp.post(
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
                role: "AUTHOR",
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
// authenticate the author
// create an article
authorApp.post('/articles' ,verifyToken("AUTHOR"),async(req,res) => {
    // get the article
    const article = req.body
    article.author = req.user.userId;
    console.log(article.author)
    // check the author 
    let authorStatus = await UserTypeModel.findById(article.author);
    if(!authorStatus && authorRole !== "AUTHOR"){
        return res.status(401).json({message : "Author not found"});
    }
    // create article document
    let articleDoc = new ArticleModel(article);
    // save the article
    await articleDoc.save()
    // send res
    res.status(200).json({message : "Article created",payload : articleDoc});
})
//
authorApp.get('/articles',verifyToken("AUTHOR"),async(req,res) => {
    let authorId = req.user.userId;
    console.log(authorId);
    console.log(req);
    //check the author
    // get  all articles of author id
    let articleList = await (await ArticleModel.find({author :authorId,isArticleActive : true})).sort({ createdAt : -1}).populate("author","firstName email");
    console.log(articleList);
    res.status(200).json({message : "author Articles",payload : articleList})
})
// get author articles 
authorApp.get("/articles/:authorId", verifyToken("AUTHOR"), async (req, res) => {
  //get author id
    let aid = req.params.authorId;
    console.log(aid);
  //read articles by this author which are acticve
    let articles = await ArticleModel.find({ author: aid }).populate("author", "firstName email");
  //send res
    res.status(200).json({ message: "articles", payload: articles });
});

// edit an article
authorApp.put('/articles',verifyToken("AUTHOR"),async(req,res) =>{
    // get modified articl
    let {author,articleId,title,category,content} = req.body;
    let authorId = req.user.userId;
    console.log(authorId)
    // find the article
    let articleStatus = await ArticleModel.findOne({_id: articleId,author:authorId });
    // check if article is published by the author recieved from the client 
    if(!articleStatus){
        return res.status(401).json({message : "Article Not found"});
    }
    // update the article
    let modifyedDoc = await ArticleModel.findByIdAndUpdate(articleId,{$set :{title,category,content}},{new : true});
    //send (updated article)
    res.status(200).json({message : "modified" , payload : modifyedDoc});
})
// delete an article
authorApp.patch('/articles-delete/:id',verifyToken("AUTHOR"),async(req,res) => {
    let id = req.params.id
    let {authorId,isArticleActive} = req.body;
    let articleDoc = await ArticleModel.findOne({_id : id , author : authorId});
    if(!articleDoc){
        res.status(401).json({message : "Article Not found"});
    }
    if(!req.user.role === "AUTHOR" && articleDoc.author.toString() !== req.user.userId){
        return res.status(403).json({message : "Forbidden"});
    }

    if(articleDoc.isArticleActive === isArticleActive){
        return res.status(400).json({message :`Article is already ${isArticleActive ? "active" : "deleted"}`});
    }

    articleDoc.isArticleActive = isArticleActive;
    await articleDoc.save();

    res.status(200).json({
    message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
    articleDoc,
    })
})



