import exp from 'express'
import {connect} from 'mongoose'
import { config } from 'dotenv'
import  cookieParser from 'cookie-parser'
import {userApp} from './Apis/UserApi.js'
import {adminApp} from './Apis/AdminApi.js'
import {authorApp} from './Apis/AuthorApi.js'
import { commonApp } from './Apis/Common-api.js'
import cors from 'cors'

config()

const app = exp();
app.use(cors({
  origin: "https://blog-app-h8se.vercel.app",
  credentials: true
}));

app.use(exp.json())
app.use(cookieParser())
//connect api's
app.use('/user-api',userApp);
app.use('/author-api',authorApp);
app.use('/admin-api',adminApp);
app.use('/common-api',commonApp)

const connectDB = async() => {
  const PORT = process.env.PORT || 4000
    try{
        await connect(process.env.DB_URL);
        console.log("DB Connection done");
        app.listen(PORT,() => {
            console.log("Server started");
        })
    }catch(err){
        console.log("Connection Failed",err)
    }
}
connectDB()
app.post('/logout',(req,res) => {
    res.clearCookie('token',{
        httpOnly : true,
        secure : true,
        sameSite : "none"
    });
    res.status(200).json({message : "Logout Successful"})
})
app.use((req,res,next) => {
    res.json({message : `${req.url} is Invalid Path`})
})


app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} ${value} already exists`,
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});