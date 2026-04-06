import express from 'express'
import {authenticate} from '../Services/AuthService.js'
import {hash,compare} from 'bcryptjs'
import { UserTypeModel } from '../models/UserModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';


export const commonApp = express.Router();

// login
commonApp.post('/login',async(req,res) => {
    let userCred = req.body;
    let {token,safe} = await authenticate(userCred);
    res.cookie("token",token,
    {
        httpOnly:true,
        sameSite : "lax",
        secure : false
    })
    res.status(200).json({message : "login success",payload : safe})
})


// logout
commonApp.get('/logout',async(req,res) => {
    console.log('hi')
    res.clearCookie('token',{
        httpOnly : true,
        secure : false,
        sameSite : "lax"
    });
    res.status(200).json({message : "Logout Successful"})
})

// Updating password

commonApp.put('/password-update',verifyToken,async(req,res) => {
    // extract the user email and there updated password
    let user = req.body
    let userDoc = await UserTypeModel.findOne({email : user.email},);
    // check the current password
    let checkPass = await compare(user.currentPassword,userDoc.password);
    if(!checkPass){
        return res.status(400).json({message : "Current Password Not Matched"})
    }
    // replace the current password with new password
    let currentPass = await hash(user.newPassword,12);
    let modifiedPassword = await UserTypeModel.findOneAndUpdate({email : user.email},{$set : {password : currentPass}},{new : true});
    // send res
    res.status(200).json({message : "Password Updated"})
});
// page reload sol
commonApp.get('/check-auth',verifyToken("USER","AUTHOR","ADMIN"),(req,res) =>{
    console.log(req.user.profileImageUrl);
    res.status(200).json({message : "Authenticated" , payload : req.user})
})
