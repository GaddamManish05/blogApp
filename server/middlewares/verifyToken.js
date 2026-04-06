import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()
export const verifyToken = (...allowedRoles) => {
    return async (req,res,next) => {
    try{
        let token = req.cookies?.token
        // check if the token it present or not
        if(token === undefined){
            return res.status(400).json({message : "Unauthorized"})
        }
        // verify the token
        let decodedToken = jwt.verify(token,process.env.JWT_TOKEN);
        // forwards to next middleware / route
        //check if role is allowed
        if(!allowedRoles.includes(decodedToken.role)){
            return res.status(403).json({message : "Forbidden.You don't have access"});
        }
        console.log("decoded : ",decodedToken)
        req.user = decodedToken
        }
        catch(err){
            if(err.name === "TokenExpiredError"){
                res.status(401).json({message : "Session Expired"})
            }
            if(err.name === "JsonWebTokenError"){
                res.status(401).json({message : "Invalid token , Please check "})
            }
        }
        next();
}
}  