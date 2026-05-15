import exp from 'express';
import {UserTypeModel} from '../models/UserModel.js'
import { verifyToken } from '../middlewares/verifyToken.js';

export const adminApp = exp.Router();

// read all the articles (optional)
// Block 
adminApp.patch(
  '/toggle-user-status/:id',

  verifyToken("ADMIN"),

  async(req,res)=>{

    try{

      let { id } = req.params;

      let { isActive } = req.body;

      let modifiedUser =
        await UserTypeModel.findByIdAndUpdate(

          id,

          {
            $set:{
              isActive:isActive
            }
          },

          {
            new:true
          }

        ).select("-password");

      if(!modifiedUser){

        return res.status(404).json({

          message:"User Not Found"
        });
      }

      res.status(200).json({

        message:isActive
          ? "User Unblocked"
          : "User Blocked",

        payload:modifiedUser

      });

    }catch(err){

      console.log(err);

      res.status(500).json({

        message:"Operation Failed",

        error:err.message

      });
    }
})
adminApp.get(
  '/users',

  verifyToken("ADMIN"),

  async(req,res)=>{

    try{

      let users = await UserTypeModel.find()
        .select("-password");

      res.status(200).json({

        message:"Users",

        payload:users

      });

    }catch(err){

      console.log(err);

      res.status(500).json({

        message:"Failed to fetch users",

        error:err.message

      });
    }
})